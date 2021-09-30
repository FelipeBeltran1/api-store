import { User } from './user.entity';
import { Product } from './../products/product.entity';

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order', { schema: 'users' })
export class Order {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
