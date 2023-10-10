import { Entity, Column, PrimaryColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyProduct } from './companyProduct.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  companyIdx: number;

  @Column()
  nameKor: string;

  @Column()
  nameEng: string;

  // @OneToMany((type) => CompanyProduct, (companyProduct) => companyProduct.company)
  // companyProducts: CompanyProduct[];
  // 굳이 안해줘도 되는 부분
}