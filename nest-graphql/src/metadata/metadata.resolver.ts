import { Args, Mutation, Query, Resolver, Root } from '@nestjs/graphql';
import { Metadata } from './entities/metadata.entity';
import { MetadataService } from './metadata.service';
import { OpenGraph } from 'src/opengraph/entities/opengraph.entity';
import { OpengraphService } from 'src/opengraph/opengraph.service';

@Resolver(() => Metadata)
export class MetadataResolver {
  constructor(
    private readonly metadataService: MetadataService, 
    // private readonly openGraphService: OpengraphService
  ) {}

  // @Query(() => [Metadata])
  // async metaData(): Promise<Metadata[]> {
  //   return await this.metadataService.find();
  // }

  @Query(() => [Metadata])
  async metaData(): Promise<Metadata[]> {
    return await this.metadataService.find();
  }

  // @Query(() => [OpenGraph])
  // async openGraph(@Root() root): Promise<OpenGraph[]> {
  //   return await this.openGraphService.findOne(root.id);
  // }

  @Mutation(() => Boolean)
  // async createMetadata(@Args() createMetadataDto: CreateMetadataDto): Promise<boolean> {
  async createMetadata(): Promise<boolean> {
    // console.log(createMetadataDto);
    // await this.usersService.create(createUserDto);
    return true;
  }
}
