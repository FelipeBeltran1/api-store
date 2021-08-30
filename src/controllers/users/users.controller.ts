import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return {
      message: `customers`,
    };
  }

  @Post()
  createUser(@Body() payload: any) {
    return {
      message: 'crear user',
      payload,
    };
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return {
      message: `eliminado ${id}`,
    };
  }
}
