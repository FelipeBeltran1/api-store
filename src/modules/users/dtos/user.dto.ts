import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly role: string;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly customerId: number;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class FilterUserDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
