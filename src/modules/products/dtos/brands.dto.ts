import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;
}
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

export class FilterBrandDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
