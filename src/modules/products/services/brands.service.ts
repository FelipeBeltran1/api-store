import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../../../entities/products/brand.entity';
import {
  CreateBrandDto,
  FilterBrandDto,
  UpdateBrandDto,
} from '../dtos/brands.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand, 'products')
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async findAll(params?: FilterBrandDto): Promise<Brand[]> {
    if (params) {
      const { limit, offset } = params;
      return await this.brandRepository.find({
        where: {},
        take: limit,
        skip: offset,
      });
    }
    return await this.brandRepository.find();
  }

  async findOne(id: number): Promise<Brand> {
    const brand = await this.brandRepository.findOne(id, {
      relations: ['products'],
    });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  async create(payload: CreateBrandDto): Promise<Brand> {
    const newBrand = await this.brandRepository.create(payload);
    return await this.brandRepository.save(newBrand);
  }

  async update(id: number, payload: UpdateBrandDto): Promise<Brand> {
    const brand = await this.findOne(id);
    this.brandRepository.merge(brand, payload);
    return await this.brandRepository.save(brand);
  }

  async delete(id: number): Promise<Brand> {
    const brand = await this.findOne(id);
    return await this.brandRepository.remove(brand);
  }
}
