import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  seller_idx: number;

  @Column({ nullable: true })
  business_type: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  export_regions: string;

  @Column({ nullable: true })
  export_countries: string;
}