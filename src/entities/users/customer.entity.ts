import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer', { schema: 'users' })
export class Customer {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying', { length: 200 })
  name: string;

  @Column('character varying', { length: 250 })
  lastName: string;

  @Column('character varying', { length: 250 })
  phone: string;
}
