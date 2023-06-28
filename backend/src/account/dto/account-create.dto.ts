import { IsNotEmpty, IsString, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class AccountCreateDto {

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  number: number
}
