import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OpenGraph } from './entities/opengraph.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OpengraphService {
  constructor(
    @InjectRepository(OpenGraph) private readonly openGraphRepository: Repository<OpenGraph>
  ) {}

  async findOne(id: number) {
    return await this.openGraphRepository.find({ where: { id } });
  }
}
