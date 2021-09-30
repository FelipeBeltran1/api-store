import { Injectable } from '@nestjs/common';
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
  // private counterId = 1;
  // private products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Product 1',
  //     description: 'asd',
  //     price: 122,
  //     stock: 10,
  //     image: '',
  //   },
  // ];

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOneOrFail(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async create(payload: CreateProductDto): Promise<Product> {
    const newProduct = await this.productRepository.create(payload);
    return this.productRepository.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.findOne(id);
    this.productRepository.merge(product, payload);
    return await this.productRepository.save(product);
  }

  async delete(id: number): Promise<Product> {
    const product = await this.findOne(id);
    return this.productRepository.remove(product);
  }
}
