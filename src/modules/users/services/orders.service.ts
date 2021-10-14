import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/users/customer.entity';
import { Order } from 'src/entities/users/order.entity';
import { Repository } from 'typeorm';
import {
  CreateOrderDto,
  FilterOrderDto,
  UpdateOrderDto,
} from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order, 'users')
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Customer, 'users')
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(params?: FilterOrderDto): Promise<Order[]> {
    if (params) {
      const { limit, offset } = params;
      return await this.orderRepository.find({
        where: {},
        take: limit,
        skip: offset,
      });
    }
    return await this.orderRepository.find();
  }

  async ordersByCustomer(customerId: number) {
    return await this.orderRepository.find({
      where: {
        customer: customerId,
      },
    });
  }

  async findOne(id: number): Promise<Order> {
    try {
      const order = await this.orderRepository.findOneOrFail(id, {
        relations: ['items', 'items.product'],
      });
      return order;
    } catch (error) {
      throw error;
    }
  }

  async create(payload: CreateOrderDto): Promise<Order> {
    const order = new Order();
    if (payload.customerId) {
      const customer = await this.customerRepository.findOne(
        payload.customerId,
      );
      order.customer = customer;
    }
    return this.orderRepository.save(order);
  }

  async update(id: number, payload: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOne(id);
    if (payload.customerId) {
      const customer = await this.customerRepository.findOne(
        payload.customerId,
      );
      order.customer = customer;
    }
    return this.orderRepository.save(order);
  }

  async delete(id: number): Promise<Order> {
    const order = await this.findOne(id);
    return this.orderRepository.remove(order);
  }
}
