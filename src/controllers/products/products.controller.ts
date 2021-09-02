import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';

import { ProductsService } from './../../services/products/products.service';
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    // return {
    //   message: `products: limit=> ${limit} offset=>${offset} brand=>${brand}`,
    // };
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
    // response.status(200).send({
    //   message: `product ${productId}`,
    // });
    return {
      msg: `Producto${productId}`,
      body: this.productService.findOne(productId),
    };
  }

  @Post()
  createProduct(@Body() payload: any) {
    // return {
    //   message: 'crear',
    //   payload,
    // };
    return this.productService.create(payload);
  }

  @Put(':id')
  updateProduct(@Param('id') id: number, @Body() payload: any) {
    // return {
    //   id,
    //   payload,
    // };
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
