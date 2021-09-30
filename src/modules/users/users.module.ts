import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';

import { ProductsModule } from 'src/modules/products/products.module';
import { Customer } from 'src/entities/users/customer.entity';
import { Order } from 'src/entities/users/order.entity';
import { User } from 'src/entities/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Customer, Order], 'users'),
    ProductsModule,
  ],
  controllers: [CustomersController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
