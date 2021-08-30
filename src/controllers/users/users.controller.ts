import { Body, Controller, Get, Post } from '@nestjs/common';

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
}
