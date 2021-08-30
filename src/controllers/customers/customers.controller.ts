import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get()
  getCustomers() {
    return {
      message: `customers`,
    };
  }

  @Post()
  createCustomer(@Body() payload: any) {
    return {
      message: 'crear customer',
      payload,
    };
  }

  @Put(':id')
  updateCustomer(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  deleteCustomer(@Param('id') id: number) {
    return {
      message: `eliminado ${id}`,
    };
  }
}
