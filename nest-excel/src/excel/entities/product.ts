import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Seller } from './seller.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_idx: number;

  @Column('int')
  seller_idx: number;

  @Column({ type: 'char', length: 1 })
  category_code_main: string;

  @Column({ type: 'char', length: 3 })
  category_code_sub: string;

  @Column('varchar')
  brand: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  image_origin: string;

  @Column('varchar')
  image_saved: string;

  @Column('text')
  description: string;

  @Column('int')
  mpq: number;

  @Column('varchar')
  shielf_life: string;

  @Column('varchar')
  certification: string;

  @Column('varchar')
  awards: string;

  @Column('varchar')
  raw_meterial: string;

  @Column('varchar')
  nutrition_facts: string;

  @Column('varchar')
  packing_meterial: string;

  @Column('int')
  packing_weight: string;

  @Column('int')
  packing_width: string;

  @Column('int')
  packing_length: string;

  @Column('int')
  packing_height: string;

  @Column('varchar')
  box_meterial: string;

  @Column('int')
  box_weight: string;

  @Column('int')
  box_quantity: string;

  @Column('int')
  box_width: string;

  @Column('int')
  box_length: string;

  @Column('int')
  box_height: string;

  @Column('int')
  retail_price: string;

  @Column('int')
  list_price: string;

  @Column('int')
  factory_delivery_pice: string;

  @ManyToOne(() => Seller, (seller) => seller.seller_idx)
  @JoinColumn({ name: 'seller_idx' })
  seller: Seller;
}