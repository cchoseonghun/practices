import { Entity, Column, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class CompanyProduct {
  @PrimaryGeneratedColumn()
  companyProductIdx: number;

  @Column()
  companyIdx: number;

  @Column()
  category: string;

  @Column()
  categoryDetail: string;

  @Column()
  nameKor: string;

  @Column()
  nameEng: string;

  @ManyToOne(() => Company, (company) => company.companyIdx)
  @JoinColumn({ name: 'companyIdx' })
  company: Company;
}