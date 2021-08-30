import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';

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

  @Put(':id')
  updateBrand(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  deleteBrand(@Param('id') id: number) {
    return {
      message: `eliminado ${id}`,
    };
  }
}
