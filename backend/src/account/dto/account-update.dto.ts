import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export enum Type {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
}

export class AccountUpdateDto {
  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  id: number

  @ApiProperty()
  @IsEnum(Type)
  @Expose()
  @IsNotEmpty()
  type: Type

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  amount: number
}
