import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private readonly productsRepository: Repository<Products>, 
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService  
  ) {}

  async findAll() {
    const products = await this.findProducts();
    const users = await this.findUsers();
    return { products, users };
  }

  async findProducts() {
    return await this.productsRepository.find();
  }

  async findUsers() {
    return this.usersService.findUsers();
  }
}
