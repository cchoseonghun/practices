import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column({ nullable: true })
  mfaSecret: string;

  // @Column({ default: true })
  // isMfaEnabled: boolean;
}