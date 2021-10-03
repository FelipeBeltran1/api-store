import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/products/product.entity';
import { Order } from 'src/entities/users/order.entity';
import { OrderProduct } from 'src/entities/users/orderProduct.entity';
import { Repository } from 'typeorm';
import {
  CreateOrderProductDto,
  FilterOrderProductDto,
  UpdateOrderProductDto,
} from '../dtos/orderProduct.dto';

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

  async findAll(params?: FilterOrderProductDto) {
    if (params) {
      const { limit, offset } = params;
      return await this.itemRepository.find({
        take: limit,
        skip: offset,
      });
    }
    return await this.itemRepository.find();
  }

  async findOne(id: number): Promise<OrderProduct> {
    const orderProduct = await this.itemRepository.findOneOrFail(id, {
      relations: ['order', 'product'],
    });
    if (!orderProduct) {
      throw new NotFoundException(`OrderProduct #${id} not found`);
    }
    return orderProduct;
  }

  async create(payload: CreateOrderProductDto) {
    const order = await this.orderRepository.findOne(payload.orderId);
    const product = await this.productRepository.findOne(payload.productId);
    const item = new OrderProduct();
    item.order = order;
    item.product = product;
    item.quantity = payload.quantity;
    return this.itemRepository.save(item);
  }

  async update(id: number, payload: UpdateOrderProductDto) {
    const item = await this.itemRepository.findOne(id);
    if (payload.orderId) {
      const order = await this.orderRepository.findOne(payload.orderId);
      item.order = order;
    }
    if (payload.productId) {
      const product = await this.productRepository.findOne(payload.productId);
      item.product = product;
    }
    this.itemRepository.merge(item, payload);
    return this.itemRepository.save(item);
  }

  async delete(id: number): Promise<OrderProduct> {
    const order = await this.findOne(id);
    return this.itemRepository.remove(order);
  }
}
