import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  CreateOrderProductDto,
  FilterOrderProductDto,
} from '../dtos/orderProduct.dto';
import { OrderProductService } from '../services/order-product.service';

@Controller('order-product')
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) {}

  @Get()
  @ApiOperation({ summary: 'List of orders' })
  getCustomers(@Query() params: FilterOrderProductDto) {
    return this.orderProductService.findAll(params);
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
