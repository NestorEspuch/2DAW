import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth/jwt-auth.guard';
import { UsuarioDto } from './dto/usuario-dto/usuario-dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // GET /auth/login
  @Get('usuario')
  async listar(@Res() res) {
    const resultado = await this.usuarioService.listar();
    return res.render('auth_login', { usuarios: resultado });
  }

  // GET /usuario/buscar/:id
  @Get('buscar/:id')
  async buscarPorId(@Param('id') id: string) {
    try {
      const resultado = await this.usuarioService.buscarPorId(id);
      if (resultado) return { resultado: resultado };
      throw new Error();
    } catch (Error) {
      return { error: 'Error buscando al usuario' };
    }
  }
  // POST /usuario
  @Post()
  @UseGuards(JwtAuthGuard)
  async crear(@Body() crearUsuarioDto: UsuarioDto) {
    return this.usuarioService.insertar(crearUsuarioDto);
  }

  // PUT /contacto/:id
  @Put(':id')
  actualizar(
    @Param('id') id: string,
    @Body() actualizarUsuarioDto: UsuarioDto,
  ) {
    return this.usuarioService.actualizar(id, actualizarUsuarioDto);
  }
  // DELETE /contacto/:id
  @Delete(':id')
  borrar(@Param('id') id: string) {
    return this.usuarioService.borrar(id);
  }
}
