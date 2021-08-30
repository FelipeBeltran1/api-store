import { Injectable } from '@nestjs/common';
import { throwError } from 'rxjs';
import { Product } from './../../entities/product.entity';
@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'asd',
      price: 122,
      stock: 10,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((item) => item.id === id);
  }

  create(payload: any) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any) {
    const index = this.products.findIndex((item) => item.id == id);
    if (!this.products[index]) return { message: 'Id no existe' };
    this.products[index] = {
      ...this.products[index],
      ...payload,
    };
    return this.products[index];
  }

  delete(id: number) {
    const found = this.products.findIndex((item) => item.id === id);
    if (found) {
      this.products.splice(found, 1);
    } else throwError('Product not found');
    return {
      message: `Product delete${id}`,
    };
  }
}
