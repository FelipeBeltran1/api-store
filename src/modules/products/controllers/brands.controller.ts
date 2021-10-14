import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/@common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/@common/guards/jwt-auth.guard';
import {
  CreateBrandDto,
  FilterBrandDto,
  UpdateBrandDto,
} from '../dtos/brands.dto';
import { BrandsService } from '../services/brands.service';
@UseGuards(JwtAuthGuard)
@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List of brands' })
  getBrands(@Query() params: FilterBrandDto) {
    return this.brandService.findAll(params);
  }

  @Public()
  @Get(':brandId')
  getBrand(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandService.findOne(brandId);
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
