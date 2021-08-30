import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  getCustomers() {
    return {
      message: `customers`,
    };
  }

  @Post()
  createBrand(@Body() payload: any) {
    return {
      message: 'crear brand',
      payload,
    };
  }
}
