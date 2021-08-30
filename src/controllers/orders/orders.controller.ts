import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

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

  @Put(':id')
  updateOrder(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: number) {
    return {
      message: `eliminado ${id}`,
    };
  }
}
