import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola';
  }
  @Get('nuevo')
  newEndpoint() {
    return 'soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con //';
  }

  @Get('products')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `products: limit=> ${limit} offset=>${offset} brand=>${brand}`;
  }

  @Get('products/filter')
  getProductFilter() {
    return `filter`;
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    return `product ${id}`;
  }

  @Get('categories/:id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return `categorie ${id} and product ${productId}`;
  }
}
