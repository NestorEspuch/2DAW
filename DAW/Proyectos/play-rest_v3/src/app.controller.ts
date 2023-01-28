import { Body, Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async index(@Res() res) {
    return res.render('base');
  }
  @Get('/buscar')
  async listar(@Res() res, @Body() buscar: string) {
    const resultado = await this.appService.listar(buscar);
    if (resultado) return res.render('listado_juegos', { juegos: resultado });
  }
}
