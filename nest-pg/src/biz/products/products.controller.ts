import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  find() {
    return this.productsService.findProducts();
  }

  @Get('all')
  findAll() {
    return this.productsService.findAll();
  }
}
