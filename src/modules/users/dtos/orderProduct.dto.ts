import { IsNotEmpty, IsOptional, IsPositive, Min } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrderProductDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly orderId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;
}

export class UpdateOrderProductDto extends PartialType(CreateOrderProductDto) {}

export class FilterOrderProductDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
