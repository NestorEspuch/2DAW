import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

const usuarios = [
  { login: 'nacho', password: '12345' },
  { login: 'pepe', password: 'pepe111' },
];

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
      this.listar(res);
    } else {
      res.render('iniciarSesion', {
        error: 'Error usuario o contraseña incorrecta',
      });
    }
  }

  @Get('logout')
  async cerrarSession(@Res() res, @Req() req) {
    req.session.destroy();
    this.listar(res);
  }

  listar(res: any) {
    throw new Error('Method not implemented.');
  }
}
