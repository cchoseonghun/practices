import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'nest-excel', name: 'company' })
export class Company {
  @PrimaryGeneratedColumn()
  company_idx: number;

  @Column()
  name_kor: string;

  @Column()
  name_eng: string;

  // @OneToMany((type) => CompanyProduct, (companyProduct) => companyProduct.company)
  // companyProducts: CompanyProduct[];
  // 굳이 안해줘도 되는 부분
}