import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity({ schema: 'nest-excel', name: 'company_product' })
export class CompanyProduct {
  @PrimaryGeneratedColumn()
  company_product_idx: number;

  @Column()
  company_idx: number;

  @Column()
  category: string;

  @Column()
  category_detail: string;

  @Column()
  name_kor: string;

  @Column()
  name_eng: string;

  @ManyToOne(() => Company, (company) => company.company_idx)
  @JoinColumn({ name: 'company_idx' })
  company: Company;
}