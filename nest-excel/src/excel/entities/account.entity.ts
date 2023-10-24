import { Column, Entity, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Seller } from './seller.entity';
import { Buyer } from './buyer.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  account_idx: number;

  @Column('varchar')
  type: string;

  @Column({ type: 'int', nullable: true })
  @Index({ unique: true })
  seller_idx: number;

  @Column({ type: 'int', nullable: true })
  @Index({ unique: true })
  buyer_idx: number;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column({ type: 'char', length: 2 })
  authority_code: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  position: string;

  @Column('varchar')
  department: string;

  @Column('varchar')
  mobile_phone: string;

  @Column('varchar')
  landline_phone: string;

  @ManyToOne(() => Seller, (seller) => seller.seller_idx)
  @JoinColumn({ name: 'seller_idx' })
  seller: Seller;

  @ManyToOne(() => Buyer, (buyer) => buyer.buyer_idx)
  @JoinColumn({ name: 'buyer_idx' })
  buyer: Buyer;
}