import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.usersRepository.insert(createUserDto);
  }

  // async findOne(id: number) {
  //   return await this.usersRepository.findOne({ where: { id } })
  // }

  async find() {
    const data = await this.usersRepository.find({ relations: ['metaData'] });
    // console.log(data[0]);
    console.log(data[0].metaData[0]);

    data[0].metaData = data[0].metaData[0];
    data[0].metaData.openGraph = data[0].metaData.openGraph[0];

    return data;
    // return data.map(item => ({
    //   ...item,
    //   metaData: item.metaData ? item.metaData[0].map(item2 => ({
    //     ...item2,
    //     openGraph: item2.openGraph ? item2.openGraph[0] : null,
    //   })) : null,
    // }));
    
  }
}
