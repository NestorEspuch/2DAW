import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async index(@Res() res) {
    return await this.appService
      .listar()
      .then((juegos) => {
        return res.render('public/listado_juegos', { juegos: juegos });
      })
      .catch((e) => {
        return res.render('public/error', { error: e });
      });
  }

  @Post('/buscar')
  async listar(@Res() res, @Body() buscar) {
    return await this.appService
      .listarBuscado(buscar.textoBusqueda)
      .then((juegos) => {
        return res.render('public/listado_juegos', { juegos: juegos });
      })
      .catch((e) => {
        return res.render('public/error', { error: e });
      });
  }
}
