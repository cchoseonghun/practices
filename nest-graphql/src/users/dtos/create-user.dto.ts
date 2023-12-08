import { ArgsType, Field, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Column } from 'typeorm';

// data transfet object(DTO)
@ArgsType()
export class CreateUserDto {
  @Field(() => String)
  @IsString()
  Created: string;

  // @Field(() => [String])
  // @IsArray()
  // keywords: string[];
}