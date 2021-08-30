import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getOrders() {
    return {
      message: `customers`,
    };
  }

  @Post()
  createOrder(@Body() payload: any) {
    return {
      message: 'crear order',
      payload,
    };
  }
}
