import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../../../entities/users/customer.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/modules/users/dtos/customers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer, 'users')
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async create(payload: CreateCustomerDto): Promise<Customer> {
    const newCustomer = await this.customerRepository.create(payload);
    return await this.customerRepository.save(newCustomer);
  }

  async update(id: number, payload: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);
    this.customerRepository.merge(customer, payload);
    return await this.customerRepository.save(customer);
  }

  async delete(id: number): Promise<Customer> {
    const customer = await this.findOne(id);
    return await this.customerRepository.remove(customer);
  }
}
