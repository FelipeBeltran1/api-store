// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateOrderDto, UpdateOrderDto } from './../dtos/orders.dto';
// import { Order } from './../enitites/order.entity';

// @Injectable()
// export class OrdersService {
//   private counterId = 1;
//   private orders: Order[] = [
//     {
//       id: 1,
//       name: 'Order 1',
//       description: 'asd',
//       date: '2021-09-07',
//     },
//   ];

//   findAll() {
//     return this.orders;
//   }

//   findOne(id: number) {
//     const order = this.orders.find((item) => item.id == id);
//     if (!order) {
//       throw new NotFoundException(`Order #${id} not found`);
//     }
//     return order;
//   }

//   create(payload: CreateOrderDto) {
//     console.log(payload);
//     this.counterId = this.counterId + 1;
//     const newOrder = {
//       id: this.counterId,
//       ...payload,
//     };
//     this.orders.push(newOrder);
//     return newOrder;
//   }

//   update(id: number, payload: UpdateOrderDto) {
//     const index = this.orders.findIndex((item) => item.id == id);
//     if (!this.orders[index]) return { message: 'Id no existe' };
//     this.orders[index] = {
//       ...this.orders[index],
//       ...payload,
//     };
//     return this.orders[index];
//   }

//   delete(id: number) {
//     const index = this.orders.findIndex((item) => item.id == id);
//     if (index === -1) {
//       throw new NotFoundException(`Order #${id} not found`);
//     }
//     this.orders.splice(index, 1);
//     return true;
//   }
// }
