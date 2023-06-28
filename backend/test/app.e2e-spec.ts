import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { PrismaService } from './../src/database/prisma.service'

import request from 'supertest';
import { ConfigModule } from '@nestjs/config';

describe('App (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService

  const getAccessToken = async (): Promise<string> => {
    const cognitoidentityserviceprovider = new CognitoIdentityServiceProvider({
      apiVersion: '2016-04-18',
      region: 'us-east-1',
    });

    const signInParams = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
      AuthParameters: {
        USERNAME: process.env.TESTING_EMAIL!,
        PASSWORD: process.env.TESTING_PASSWORD!,
      },
    };

    const response = await cognitoidentityserviceprovider
      .initiateAuth(signInParams)
      .promise();

    return response.AuthenticationResult!.IdToken!;
  };

  beforeAll(async () => {
    process.env.DATABASE_URL = process.env.DATABASE_URL_TEST
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          envFilePath: '.env.test',
          isGlobal: true,
        }),
      ],
      providers: [PrismaService],
    }).compile()

    app = moduleFixture.createNestApplication()
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init()
  })

  afterAll(async () => {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE Account;`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE EventStore;`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE Transaction;`);
    await prisma.$disconnect();
    await app.close();
  });

  describe('Account Management', () => {
    it('Create an account', async () => {
      const token = await getAccessToken();
      await request(app.getHttpServer())
        .post('/accounts')
        .set('Authorization', 'Bearer ' + token)
        .send({
          name: 'John Doe',
          number: 12345678,
        })
        .expect(HttpStatus.CREATED);
    });

    it('Get accounts', async () => {
      const token = await getAccessToken();
      await request(app.getHttpServer())
        .get('/accounts')
        .set('Authorization', 'Bearer ' + token)
        .expect(HttpStatus.OK);
    });

    it('Get account balance', async () => {
      const token = await getAccessToken();
      await request(app.getHttpServer())
        .get('/accounts/1/balance')
        .set('Authorization', 'Bearer ' + token)
        .expect(HttpStatus.OK);
    });

    it('Create a transaction', async () => {
      const token = await getAccessToken();
      await request(app.getHttpServer())
        .post('/transactions')
        .set('Authorization', 'Bearer ' + token)
        .send({
          amount: 1000,
          type: "DEPOSIT",
          accountId: 1
        })
        .expect(HttpStatus.CREATED);
    });
  });
});
