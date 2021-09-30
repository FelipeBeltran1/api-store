import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category', { schema: 'products' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying', { length: 200 })
  name: string;

  @Column('character varying')
  description: string;
}
