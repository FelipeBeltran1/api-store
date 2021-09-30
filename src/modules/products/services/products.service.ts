import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/products/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product, 'products')
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto): Promise<Product> {
    const newProduct = await this.productRepository.create(payload);
    return this.productRepository.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    this.productRepository.merge(product, payload);
    return await this.productRepository.save(product);
  }

  async delete(id: number): Promise<Product> {
    const product = await this.findOne(id);
    return this.productRepository.remove(product);
  }
}
