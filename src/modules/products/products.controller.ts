import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from './services/products.service';
import { ParseIntPipe } from '../../@common/parse-int.pipe';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from './dtos/products.dto';
import { JwtAuthGuard } from 'src/@common/guards/jwt-auth.guard';
import { Public } from 'src/@common/decorators/public.decorator';
import { Roles } from 'src/@common/decorators/roles.decorator';
import { Role } from '../auth/models/roles.model';
import { RolesGuard } from 'src/@common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(@Query() params: FilterProductDto) {
    return this.productService.findAll(params);
  }

  @Get('filter')
  getProductFilter() {
    return {
      message: `filter`,
    };
  }

  @Public()
  @Get(':productId')
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.findOne(productId);
  }

  @Roles(Role.ADMIN)
  @Post()
  createProduct(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  updateProduct(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productService.update(id, payload);
  }

  @Put(':id/category/:categoryId')
  addCategoryToProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productService.addCategoryToProduct(id, categoryId);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.delete(id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productService.removeCategoryByProduct(id, categoryId);
  }
}
