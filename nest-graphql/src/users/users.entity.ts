import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@InputType()
@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  //TypeORM Special Columns
  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @Column()
  @Field(type => String)
  email: string;

  @Column()
  @Field(type => String)
  password: string;

}