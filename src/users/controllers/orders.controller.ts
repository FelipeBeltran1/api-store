import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './../dtos/orders.dto';
import { OrdersService } from './../services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @Get()
  getOrders() {
    return this.orderService.findAll();
  }

  @Get(':orderId')
  getProduct(@Param('orderId', ParseIntPipe) orderId: number) {
    // response.status(200).send({
    //   message: `product ${productId}`,
    // });
    return {
      msg: `Orden ${orderId}`,
      body: this.orderService.findOne(orderId),
    };
  }

  @Post()
  createOrder(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Put(':id')
  updateOrder(@Param('id') id: number, @Body() payload: UpdateOrderDto) {
    return this.orderService.update(id, payload);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: number) {
    return this.orderService.delete(id);
  }
}
