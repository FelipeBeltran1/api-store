import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/@common/guards/jwt-auth.guard';
import {
  CreateOrderProductDto,
  FilterOrderProductDto,
  UpdateOrderProductDto,
} from '../dtos/orderProduct.dto';
import { OrderProductService } from '../services/order-product.service';
@UseGuards(JwtAuthGuard)
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

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderProductDto,
  ) {
    return this.orderProductService.update(id, payload);
  }

  @Delete(':id')
  deleteOrderProduct(@Param('id', ParseIntPipe) id: number) {
    return this.orderProductService.delete(id);
  }
}
