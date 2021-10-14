import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Roles } from 'src/@common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/@common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/@common/guards/roles.guard';
import { Role } from 'src/modules/auth/models/roles.model';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { OrdersService } from '../services/orders.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private orderService: OrdersService) {}

  @Roles(Role.CUSTOMER)
  @Get('my-orders')
  getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.orderService.ordersByCustomer(user.sub);
  }
}
