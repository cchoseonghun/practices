import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryColumn()
  alpha: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  sub_region: string;
}