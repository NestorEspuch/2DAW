import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

//Primeros usuarios guardados en local para hacer las pruebas
// const usuarios = [
//   { login: 'nestor', password: 'nestor' },
//   { login: 'andres', password: 'andres' },
// ];

@Controller('Auth')
export class AuthController {
  constructor(private readonly usuarioServices: UsuarioService) {}

  @Get('login')
  async mostrar(@Res() res) {
    return res.render('public/iniciarSesion');
  }

  @Get('logout')
  async cerrarSession(@Res() res, @Req() req) {
    try {
      req.session.destroy();
      res.redirect('/');
    } catch (e) {
      res.render('public/error', { error: 'Error en la aplicación: ' + e });
    }
  }

  @Post('login')
  async login(@Res() res, @Req() req, @Body() body) {
    const usuarios = await this.usuarioServices.listar();
    const usu = body.usuario;
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

  //Subida de usuarios a la BBDD

  // @Get('subirUsuarios')
  // async insertar() {
  //   this.usuarioServices.insertar({
  //     login: 'Paquito',
  //     password: 'Paquito1',
  //   });
  // }
}
