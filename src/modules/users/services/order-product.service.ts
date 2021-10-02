import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/products/product.entity';
import { Order } from 'src/entities/users/order.entity';
import { OrderProduct } from 'src/entities/users/orderProduct.entity';
import { Repository } from 'typeorm';
import { CreateOrderProductDto } from '../dtos/orderProduct.dto';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(Order, 'users')
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct, 'users')
    private itemRepository: Repository<OrderProduct>,
    @InjectRepository(Product, 'products')
    private productRepository: Repository<Product>,
  ) {}

  async create(payload: CreateOrderProductDto) {
    const order = await this.orderRepository.findOne(payload.orderId);
    const product = await this.productRepository.findOne(payload.productId);
    const item = new OrderProduct();
    item.order = order;
    item.product = product;
    item.quantity = payload.quantity;
    return this.itemRepository.save(item);
  }
}
