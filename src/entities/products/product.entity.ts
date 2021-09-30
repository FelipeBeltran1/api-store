import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product', { schema: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying', { length: 200 })
  name: string;

  @Column('character varying', { length: 250 })
  description: string;

  @Column('int')
  price: number;

  @Column('int')
  stock: number;

  @Column('varchar')
  image: string;
}
