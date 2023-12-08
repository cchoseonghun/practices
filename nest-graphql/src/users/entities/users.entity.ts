import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Metadata } from 'src/metadata/entities/metadata.entity';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  @Field()
  Created: string;

  @JoinColumn()
  @Field((type) => Metadata, { nullable: true })
  @OneToMany(
    () => Metadata, 
    (metaData) => metaData.user, 
    { eager: true, cascade: true }
  )
  metaData: Metadata;
}