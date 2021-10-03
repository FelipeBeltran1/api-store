import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive, Min } from 'class-validator';

export class CreateOrderDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly customerId: number;
}
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class FilterOrderDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
