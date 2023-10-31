import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  seller_idx: number;

  @Column('varchar')
  business_type_codes: string;

  @Column('varchar')
  industry_codes: string;

  @Column('varchar')
  export_regions: string;

  @Column('varchar')
  export_countries: string;


  

  // @Column('varchar')
  // company_name: string;

  // @Column('varchar')
  // ceo_name: string;

  // @Column('varchar')
  // postal_code: string;

  // @Column('text')
  // company_address: string;

  // @Column('varchar')
  // website_url: string;

  

  

  // @Column('varchar')
  // export_import_status_codes: string;

  

  // @Column({ type: 'int' })
  // established_year: number;

  // @Column('varchar')
  // intro_origin: string;

  // @Column('varchar')
  // intro_saved: string;

  // @Column('text')
  // description: string;

  // @Column('varchar')
  // logo_origin: string;

  // @Column('varchar')
  // logo_saved: string;

  // @Column('varchar')
  // promotional_video_link: string;
}