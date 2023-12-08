import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { IsArray, IsObject, IsString, } from 'class-validator';

@ArgsType()
export class CreateMetadataDto {

  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => [String])
  @IsArray()
  keywords: string[];

  @Field(() => String)
  @IsString()
  viewport: string;

  @Field(() => ObjectType)
  @IsObject()
  openGraph: {
    type: string;
    title: string;
    description: string;
    openGraphImage: string;
  };
}