import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Buyer {
  @PrimaryGeneratedColumn()
  buyer_idx: number;

  @Column({ nullable: true })
  business_type: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  category_code_main: string;

  @Column({ nullable: true })
  category_code_sub: string;

  @Column({ nullable: true })
  interested_industry: string;

  @Column({ nullable: true })
  interested_region: string;

  @Column({ nullable: true })
  interested_country: string;
}