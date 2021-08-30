import { Body, Controller, Get, Post } from '@nestjs/common';

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
}
