import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Buyer {
  @PrimaryGeneratedColumn()
  buyer_idx: number;

  @Column('varchar')
  company_name: string;

  @Column('varchar')
  ceo_name: string;

  @Column('varchar')
  postal_code: string;

  @Column('text')
  company_address: string;

  @Column('varchar')
  website_url: string;

  @Column('varchar')
  business_type_codes: string;

  @Column('varchar')
  industry_codes: string;

  @Column('varchar')
  intro_origin: string;

  @Column('varchar')
  intro_saved: string;

  @Column('varchar')
  evidence_origin: string;

  @Column('varchar')
  evidence_saved: string;

  @Column('varchar')
  interested_category_codes_main: string;

  @Column('varchar')
  interested_category_codes_sub: string;

  @Column('varchar')
  interested_industry_codes: string;

  @Column('varchar')
  interested_regions: string;

  @Column('varchar')
  interested_countries: string;
}