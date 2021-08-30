import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get(':id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return {
      message: `categorie ${id} and product ${productId}`,
    };
  }

  @Post()
  createCategory(@Body() payload: any) {
    return {
      message: 'crear category',
      payload,
    };
  }

  @Put(':id')
  updateCategory(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: number) {
    return {
      message: `eliminado ${id}`,
    };
  }
}
