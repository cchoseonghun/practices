import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

@Entity()
export class Users extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  @IsString()
  @IsNotEmpty()
  name: string;
}