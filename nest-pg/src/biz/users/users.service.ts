import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>, 
    @Inject(forwardRef(() => ProductsService)) private readonly productsService: ProductsService
  ) {}

  async findAll() {
    const products = await this.findProducts();
    const users = await this.findUsers();
    return { products, users };
  }

  async findUsers() {
    return await this.usersRepository.find();
  }

  async findProducts() {
    return await this.productsService.findProducts();
  }
}
