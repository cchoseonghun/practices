import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Metadata } from './entities/metadata.entity';
import { Repository } from 'typeorm';
import { OpenGraph } from 'src/opengraph/entities/opengraph.entity';

@Injectable()
export class MetadataService {
  constructor(@InjectRepository(Metadata) private readonly metadataRepository: Repository<Metadata>) {}

  async find() {
    const data = await this.metadataRepository.find({ relations: ['openGraph'] });
    return data.map(item => ({
      ...item,
      openGraph: item.openGraph ? item.openGraph[0] : null,
    }));
  }
}
