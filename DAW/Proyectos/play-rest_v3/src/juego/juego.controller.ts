import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  Session,
} from '@nestjs/common';
import { JuegoDto } from './dto/juego-dto/juego-dto';
import { JuegoService } from './juego.service';

@Controller('juegos')
export class JuegoController {
  constructor(private readonly juegoService: JuegoService) {}

  // GET /juego
  @Get()
  async listar(@Res() res, @Session() session) {
    if (!session.usuario)
      return res.render('login', { error: 'El usuario debe estar registrado' });

    const resultado = await this.juegoService.listar();
    return res.render('admin_juegos', { juegos: resultado });
  }

  // GET /juegos/nuevo
  @Get('nuevo')
  async nuevoJuego(@Res() res) {
    return res.render('admin_juegos_form');
  }

  // GET /juegos/editar/:id
  @Get('editar/:id')
  async buscarPorId(@Res() res, @Param('id') id: string) {
    try {
      const resultado = await this.juegoService.buscarPorId(id);
      if (resultado) res.render('admin_juegos_form', { resultado: resultado });
      throw new Error();
    } catch (error) {
      return res.render('admin_error', { error: 'juego no encontrado' });
    }
  }
  // POST /juegos
  @Post()
  async insertarJuego(@Res() res, @Body() body) {
    try {
      const resultado = await this.juegoService.insertar(body);
      return res.render('juego_ficha', { juego: resultado });
    } catch (error) {
      res.render('admin_error', { error: 'Error al insertar el juego' });
    }
  }

  // PUT /juegosd/:id
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() actualizarJuegoDto: JuegoDto) {
    return this.juegoService.actualizar(id, actualizarJuegoDto);
  }
  // DELETE /juegos/:id
  @Delete(':id')
  borrar(@Param('id') id: string) {
    return this.juegoService.borrar(id);
  }
}
