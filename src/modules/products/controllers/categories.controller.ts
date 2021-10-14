import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/@common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/@common/guards/jwt-auth.guard';
import {
  CreateCategoryDto,
  FilterCategoryDto,
  UpdateCategoryDto,
} from '../dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';
@UseGuards(JwtAuthGuard)
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List of categories' })
  getCategories(@Query() params: FilterCategoryDto) {
    return this.categoryService.findAll(params);
  }

  @Public()
  @Get(':categoryId')
  getCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoryService.findOne(categoryId);
  }

  @Post()
  createCategory(@Body() payload: CreateCategoryDto) {
    return this.categoryService.create(payload);
  }

  @Put(':id')
  updateCategory(@Param('id') id: number, @Body() payload: UpdateCategoryDto) {
    return this.categoryService.update(id, payload);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
