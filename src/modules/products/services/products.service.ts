import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/entities/products/brand.entity';
import { Category } from 'src/entities/products/category.entity';
import { Product } from 'src/entities/products/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product, 'products')
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Brand, 'products')
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Category, 'products')
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto): Promise<Product> {
    const newProduct = await this.productRepository.create(payload);
    if (payload.brandId) {
      const brand = await this.brandRepository.findOne(payload.brandId);
      newProduct.brand = brand;
    }
    if (payload.categoriesIds) {
      const categories = await this.categoryRepository.findByIds(
        payload.categoriesIds,
      );
      newProduct.categories = categories;
    }
    return this.productRepository.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    if (payload.brandId) {
      const brand = await this.brandRepository.findOne(payload.brandId);
      product.brand = brand;
    }
    this.productRepository.merge(product, payload);
    return await this.productRepository.save(product);
  }

  async delete(id: number): Promise<Product> {
    const product = await this.findOne(id);
    return this.productRepository.remove(product);
  }
}
