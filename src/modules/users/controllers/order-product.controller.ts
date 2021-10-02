import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderProductDto } from '../dtos/orderProduct.dto';
import { OrderProductService } from '../services/order-product.service';

@Controller('order-product')
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) {}

  @Post()
  create(@Body() payload: CreateOrderProductDto) {
    return this.orderProductService.create(payload);
  }
}
