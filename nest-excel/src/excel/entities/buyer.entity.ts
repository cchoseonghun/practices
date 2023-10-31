import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Buyer {
  @PrimaryGeneratedColumn()
  buyer_idx: number;

  @Column('varchar')
  business_type_codes: string;

  @Column('varchar')
  industry_codes: string;

  @Column('varchar')
  interested_category_codes_main: string;

  @Column('varchar')
  interested_category_codes_sub: string;

  @Column('varchar')
  interested_import_regions: string;

  @Column('varchar')
  interested_import_countries: string;
}