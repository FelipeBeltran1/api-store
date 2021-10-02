import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './products.controller';
import { ProductsService } from './services/products.service';
import { Product } from 'src/entities/products/product.entity';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from 'src/entities/products/category.entity';
import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { Brand } from 'src/entities/products/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Brand], 'products')],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
