import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

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

  @Put(':id')
  updateProduct(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return {
      message: `eliminado ${id}`,
    };
  }
}
