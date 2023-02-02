import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

const usuarios = [
  { login: 'nestor', password: 'nestor' },
  { login: 'andres', password: 'andres' },
];

@Controller('Auth')
export class AuthController {
  constructor(private readonly usuarioServices: UsuarioService) {}

  @Get()
  async mostrar(@Res() res) {
    return res.render('public/iniciarSesion');
  }

  @Post('login')
  async login(@Res() res, @Req() req, @Body() body) {
    const usu = body.usuario;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pass = body.password;
    const existe = usuarios.filter(
      (usuario) =>
        usuario.login == usu && usuario && usuario.password == pass && usuario,
    );

    if (existe.length > 0) {
      req.session.usuario = existe[0].login;
      res.redirect('/');
    } else {
      res.render('public/iniciarSesion', {
        error: 'Error usuario o contraseña incorrecta',
      });
    }
  }

  @Get('logout')
  async cerrarSession(@Res() res, @Req() req) {
    try {
      req.session.destroy();
      res.redirect('/auth');
    } catch (e) {
      res.render('public/error', { error: 'Error en la aplicación: ' + e });
    }
  }
}
