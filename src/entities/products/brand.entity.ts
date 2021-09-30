import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('brand', { schema: 'products' })
export class Brand {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying', { length: 200 })
  name: string;

  @Column('character varying', { length: 250 })
  image: string;
}
