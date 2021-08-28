import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola';
  }
  @Get('nuevo')
  newEndpoint() {
    return 'soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con //';
  }
}
