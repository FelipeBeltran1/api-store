import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly customerId: number;
}
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}