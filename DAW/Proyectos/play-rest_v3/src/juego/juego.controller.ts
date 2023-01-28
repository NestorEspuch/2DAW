import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { JuegoDto } from './dto/juego-dto/juego-dto';
import { JuegoService } from './juego.service';

@Controller('juego')
export class JuegoController {
  constructor(private readonly juegoService: JuegoService) {}

  //GET /juego
  @Get()
  async listar(@Res() res) {
    const juego = await this.juegoService.listar();
    if (juego) return res.render('listado_juegos', { juego: juego });
  }
  // GET /juego/:id
  @Get('/:id')
  async buscarPorId(@Res() res, @Param('id') id: string) {
    try {
      const juego = await this.juegoService.listarId(id);
      if (juego) return res.render('juego_ficha', { juego: juego });
      else {
        throw new Error();
      }
    } catch (error) {
      return res.render('error', { error: error });
    }
  }
  // GET /juego/nuevo
  @Get('/nuevo')
  async llevarForm(@Res() res) {
    return res.render('nuevo_juego');
  }

  //GET /juegos/editar/:id
  @Get('/editar/:id')
  async editarJuego(@Res() res, @Param() id: string) {
    try {
      const juego = await this.juegoService.listarId(id);
      if (juego) return res.render('editar_juego', { juego: juego });
      else {
        throw new Error();
      }
    } catch (error) {
      return res.render('error', { error: error });
    }
  }

  // POST /juego
  @Post()
  async crear(@Body() crearJuegoDTO: JuegoDto) {
    return this.juegoService.insertar(crearJuegoDTO);
  }

  // PUT /juego/:id
  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarJuego: JuegoDto,
    @Res() res,
  ) {
    try {
      const juego = await this.juegoService.listarId(id);
      const juegoEditar = await this.juegoService.actualizar(
        id,
        actualizarJuego,
      );
      juegoEditar.imagen = juegoEditar.imagen
        ? juegoEditar.imagen
        : juego.imagen;
      if (juego) return res.render('listado_juego', { juego: juego });
      else {
        throw new Error();
      }
    } catch (error) {
      return res.render('error', { error: error });
    }
  }

  // DELETE /juego/:id
  @Delete(':id')
  async borrar(@Param('id') id: string, @Res() res) {
    try {
      const borrado = await this.juegoService.borrar(id);
      if (borrado) return res.render('listado_juego');
      else {
        throw new Error();
      }
    } catch (error) {
      return res.render('error', { error: error });
    }
  }
}
