import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { TYPE_OF_CURRENCY } from "src/common/constants";

@Entity()
export class Products extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column('int')
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Column('enum', {
    enum: TYPE_OF_CURRENCY,
  })
  @IsEnum(TYPE_OF_CURRENCY)
  @IsNotEmpty()
  currency: TYPE_OF_CURRENCY;

  @Column('int', { nullable: true })
  @IsNumber()
  @IsOptional()
  stock: number;

  @Column('text', { nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  @Column('datetime', { nullable: true })
  @IsDate()
  @IsOptional()
  validityAt: Date;

  // @OneToMany(() => Order, (order) => order.product)
  // orders: Order[];
}