import { Injectable } from '@nestjs/common';

import { CreateUserDto, FilterUserDto, UpdateUserDto } from '../dtos/user.dto';
//import { Order } from 'src/entities/users/order.entity';
import { User } from 'src/entities/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from './customers.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'users')
    private readonly userRepository: Repository<User>,
    private customerService: CustomersService,
  ) {}

  async findAll(params?: FilterUserDto): Promise<User[]> {
    if (params) {
      const { limit, offset } = params;
      return await this.userRepository.find({
        relations: ['customer'],
        take: limit,
        skip: offset,
      });
    }
    return await this.userRepository.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(payload: CreateUserDto) {
    const newUser = await this.userRepository.create(payload);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    if (payload.customerId) {
      const customer = await this.customerService.findOne(payload.customerId);
      newUser.customer = customer;
    }
    return this.userRepository.save(newUser);
  }

  async update(id: number, payload: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    this.userRepository.merge(user, payload);
    return await this.userRepository.save(user);
  }

  async delete(id: number): Promise<User> {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  // getOrdersByUser(id: number): Order {
  //   const user = this.findOne(id);
  //   return {
  //     date: new Date(),
  //     user,
  //     products: this.productService.findAll(),
  //   };
  // }

  // getTasks() {
  //   return new Promise((resolve, reject) => {
  //     this.clientPg.query('SELECT * FROM tasks', (err, res) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(res.rows);
  //     });
  //   });
  // }
}
