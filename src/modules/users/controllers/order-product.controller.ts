import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateOrderProductDto } from '../dtos/orderProduct.dto';
import { OrderProductService } from '../services/order-product.service';

@Controller('order-product')
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) {}

  @Get()
  @ApiOperation({ summary: 'List of orders' })
  getCustomers() {
    return this.orderProductService.findAll();
  }

  @Get(':orderProductId')
  getProduct(@Param('orderProductId', ParseIntPipe) orderProductId: number) {
    return this.orderProductService.findOne(orderProductId);
  }

  @Post()
  create(@Body() payload: CreateOrderProductDto) {
    return this.orderProductService.create(payload);
  }
}
