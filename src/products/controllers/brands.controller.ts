import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { BrandsService } from '../services/brands.service';
@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Get()
  getBrands() {
    return this.brandService.findAll();
  }

  @Get(':brandId')
  getBrand(@Param('brandId', ParseIntPipe) brandId: number) {
    return {
      msg: `Marca ${brandId}`,
      body: this.brandService.findOne(brandId),
    };
  }

  @Post()
  createBrand(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  }

  @Put(':id')
  updateBrand(@Param('id') id: number, @Body() payload: UpdateBrandDto) {
    return this.brandService.update(id, payload);
  }

  @Delete(':id')
  deleteBrand(@Param('id') id: number) {
    return this.brandService.delete(id);
  }
}
