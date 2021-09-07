import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './../../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customers.dto';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Product 1',
      lastName: 'asd',
      age: 122,
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((item) => item.id == id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const index = this.customers.findIndex((item) => item.id == id);
    if (!this.customers[index]) return { message: 'Id no existe' };
    this.customers[index] = {
      ...this.customers[index],
      ...payload,
    };
    return this.customers[index];
  }

  delete(id: number) {
    const index = this.customers.findIndex((item) => item.id == id);
    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customers.splice(index, 1);
    return true;
  }
}
