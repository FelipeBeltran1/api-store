import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      message: `products: limit=> ${limit} offset=>${offset} brand=>${brand}`,
    };
  }

  @Get('filter')
  getProductFilter() {
    return {
      message: `filter`,
    };
  }

  @Get(':productId')
  getProduct(@Param('productId') productId: string) {
    return {
      message: `product ${productId}`,
    };
  }

  @Post()
  createProduct(@Body() payload: any) {
    return {
      message: 'crear',
      payload,
    };
  }
}
