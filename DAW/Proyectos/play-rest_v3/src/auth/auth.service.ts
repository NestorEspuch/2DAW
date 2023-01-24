import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioDto } from 'src/usuario/dto/usuario-dto/usuario-dto';

const usuarios = [
  { login: 'rosa', password: 'rosa', rol: 'admin' },
  { login: 'pepe', password: 'pepe111', rol: 'normal' },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async login(user: UsuarioDto) {
    const usuario = usuarios.find((u) => u.login === user.login && u.password);
    if (usuario) {
      const payload = { sub: usuario.login };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Usuario o password incorrecto',
      });
    }
  }
}
