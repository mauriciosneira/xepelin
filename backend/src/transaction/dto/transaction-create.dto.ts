import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsEnum } from 'class-validator';

export enum Type {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
}

export class TransactionCreateDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsEnum(Type)
  @Expose()
  @IsNotEmpty()
  type: Type

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  accountId: number;
}

