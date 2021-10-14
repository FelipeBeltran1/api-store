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
import { JwtAuthGuard } from 'src/@common/guards/jwt-auth.guard';
import {
  CreateCustomerDto,
  FilterCustomerDto,
  UpdateCustomerDto,
} from 'src/modules/users/dtos/customers.dto';
import { CustomersService } from '../services/customers.service';
@UseGuards(JwtAuthGuard)
@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}
  @Get()
  @ApiOperation({ summary: 'List of customers' })
  getCustomers(@Query() params: FilterCustomerDto) {
    return this.customerService.findAll(params);
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
