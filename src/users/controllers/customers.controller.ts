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
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customers.dto';
import { CustomersService } from './../services/customers.service';
@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}
  @Get()
  @ApiOperation({ summary: 'List of customers' })
  getCustomers() {
    return this.customerService.findAll();
  }

  @Get(':customerId')
  getProduct(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customerService.findOne(customerId);
  }

  @Post()
  createCustomer(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }

  @Put(':id')
  updateCustomer(@Param('id') id: number, @Body() payload: UpdateCustomerDto) {
    return this.customerService.update(id, payload);
  }

  @Delete(':id')
  deleteCustomer(@Param('id') id: number) {
    return this.customerService.delete(id);
  }
}
