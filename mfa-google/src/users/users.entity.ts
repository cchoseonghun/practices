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
  currentRefreshToken: string;

  @Column({ type: 'datetime', nullable: true })
  currentRefreshTokenExp: Date;

  @Column({ nullable: true })
  mfaSecret: string;

  // 2fa 사용여부 확인 
  @Column({ default: false })
  isTwoFactorAuthenticationEnabled: boolean;
}