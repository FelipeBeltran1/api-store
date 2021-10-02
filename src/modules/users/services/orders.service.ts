import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/users/customer.entity';
import { Order } from 'src/entities/users/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order, 'users')
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Customer, 'users')
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
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
