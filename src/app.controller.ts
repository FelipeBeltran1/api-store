import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from './@common/guards/api-key.guard';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(ApiKeyGuard)
  @Get('nuevo')
  newEndpoint() {
    return 'soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con //';
  }

  // @Get('tasks')
  // tasks() {
  //   return this.appService.getTasks();
  // }
}
