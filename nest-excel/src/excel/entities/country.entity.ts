import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Country {
  @Column('char', { primary: true, length: 2 })
  iso2: string;

  @Column('char', { unique: true, length: 3 })
  iso3: string;

  @Column('varchar', { nullable: true })
  callingCode: string;

  @Column('varchar')
  name: string;
}
