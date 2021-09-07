import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly age: number;
}
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
