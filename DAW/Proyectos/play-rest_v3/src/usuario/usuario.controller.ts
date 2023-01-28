import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from 'src/app.service';

const usuarios = [
  { login: 'nestor', password: 'nestor' },
  { login: 'andres', password: 'andres' },
];

@Controller('auth')
export class AppController {
  constructor(private readonly appServices: AppService) {}

  @Post('login')
  async login(@Res() res, @Req() req, @Body() body) {
    const usu = body.usuario;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pass = body.password;
    const existe = usuarios.filter(
      (usuario) => usuario.login == usu && usuario,
    );

    if (existe.length > 0) {
      req.session.usuario = existe[0].login;
      res.listar();
    } else {
      res.render('iniciarSesion', {
        error: 'Error usuario o contraseña incorrecta',
      });
    }
  }

  @Get('logout')
  async cerrarSession(@Res() res, @Req() req) {
    req.session.destroy();
  }
}
