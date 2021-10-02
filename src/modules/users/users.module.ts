import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Customer } from 'src/entities/users/customer.entity';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { User } from 'src/entities/users/user.entity';
import { Order } from 'src/entities/users/order.entity';
import { ProductsModule } from 'src/modules/products/products.module';
import { OrderProduct } from 'src/entities/users/orderProduct.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Customer, Order, OrderProduct], 'users'),
    ProductsModule,
  ],
  controllers: [CustomersController, UsersController, OrdersController],
  providers: [CustomersService, UsersService, OrdersService],
})
export class UsersModule {}
