import { Injectable } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
//import { Order } from 'src/entities/users/order.entity';
import { User } from 'src/entities/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'users')
    private readonly userRepository: Repository<User>,
  ) {}
  // private counterId = 1;
  // private users: User[] = [
  //   {
  //     id: 1,
  //     email: 'User 1',
  //     password: '123',
  //     role: 'admin',
  //   },
  // ];

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(payload: CreateUserDto) {
    const newUser = await this.userRepository.create(payload);
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
