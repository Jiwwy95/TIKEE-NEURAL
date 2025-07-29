import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/application/services/app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Mensaje de bienvenida de la API' })
  getHello(): string {
    return this.appService.getHello();
  }
}