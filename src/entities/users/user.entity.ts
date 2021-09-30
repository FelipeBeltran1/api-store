import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('user', { schema: 'users' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying', { length: 200 })
  email: string;

  @Column('character varying', { length: 250 })
  password: string;

  @Column('character varying', { length: 250 })
  role: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
