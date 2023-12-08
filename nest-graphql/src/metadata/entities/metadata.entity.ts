import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { OpenGraph } from 'src/opengraph/entities/opengraph.entity';
import { User } from 'src/users/entities/users.entity';

@ObjectType()
@Entity()
export class Metadata {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  @Field()
  title: string;

  @Column({ type: 'varchar', nullable: true })
  @Field()
  description: string;

  @Column({ type: 'json' })
  @Field(() => [String])
  keywords: string[];

  @Column({ type: 'varchar', nullable: true })
  @Field()
  viewport: string;

  @JoinColumn()
  @Field((type) => OpenGraph, { nullable: true })
  @OneToMany(
    () => OpenGraph, 
    (openGraph) => openGraph.metaData, 
    { eager: true, cascade: true }
  )
  openGraph: OpenGraph;

  @JoinColumn()
  @Field((type) => User, { nullable: true })
  @ManyToOne(
    () => User, 
    (user) => user.metaData, 
  )
  user: User;
}