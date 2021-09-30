import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Product } from 'src/entities/products/product.entity';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly date: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  readonly questions: Product[];
}
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
