import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from './services/products.service';
import { ParseIntPipe } from '../../@common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from './dtos/products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts() {
    return this.productService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return {
      message: `filter`,
    };
  }

  @Get(':productId')
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return {
      msg: `Producto${productId}`,
      body: this.productService.findOne(productId),
    };
  }

  @Post()
  createProduct(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  updateProduct(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
