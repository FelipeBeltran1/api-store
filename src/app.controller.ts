import { Controller, Get, UseGuards } from '@nestjs/common';
import { Public } from './@common/decorators/public.decorator';
import { ApiKeyGuard } from './@common/guards/api-key.guard';
import { AppService } from './app.service';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
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
