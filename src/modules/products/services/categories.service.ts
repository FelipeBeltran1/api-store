import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/entities/products/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
      description: 'asd',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((item) => item.id == id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const index = this.categories.findIndex((item) => item.id == id);
    if (!this.categories[index]) return { message: 'Id no existe' };
    this.categories[index] = {
      ...this.categories[index],
      ...payload,
    };
    return this.categories[index];
  }

  delete(id: number) {
    const index = this.categories.findIndex((item) => item.id == id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categories.splice(index, 1);
    return true;
  }
}
