import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Metadata } from 'src/metadata/entities/metadata.entity';

@ObjectType()
@Entity()
export class OpenGraph {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  @Field()
  type: string;

  @Column({ type: 'varchar', nullable: true })
  @Field()
  title: string;

  @Column({ type: 'varchar', nullable: true })
  @Field()
  description: string;

  @Column({ type: 'varchar', nullable: true })
  @Field()
  openGraphImage: string;

  @JoinColumn()
  @Field((type) => Metadata, { nullable: true })
  @ManyToOne(
    () => Metadata, 
    (metaData) => metaData.openGraph, 
  )
  metaData: Metadata;
}