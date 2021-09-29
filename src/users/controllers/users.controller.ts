import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './../dtos/user.dto';
import { UsersService } from './../services/users.service';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  @ApiOperation({ summary: 'List of users' })
  getUsers() {
    return this.userService.findAll();
  }

  @Get('tasks')
  getTasks() {
    return this.userService.getTasks();
  }

  @Get(':userId')
  getProduct(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOne(userId);
  }

  @Get(':userId/orders')
  getOrders(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getOrdersByUser(userId);
  }

  @Post()
  createUser(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.userService.update(id, payload);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
