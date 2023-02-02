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

@Controller('Juego')
export class JuegoController {
  constructor(private readonly juegoService: JuegoService) {}

  //GET /juego
  @Get()
  async listar(@Res() res) {
    await this.juegoService
      .listar()
      .then((juego) => {
        return res.render('public/listado_juegos', {
          juego: juego,
        });
      })
      .catch((e) =>
        res.render('public/error', { error: 'Error en la aplicación: ' + e }),
      );
  }

  // GET /juego/nuevo
  @Get('/nuevo')
  async llevarForm(@Res() res, @Session() session) {
    if (session.usuario && session) {
      return res.render('admin/nuevo_juego');
    } else {
      return res.render('public/error', { error: 'No eres administrador' });
    }
  }

  //GET /juegos/editar/:id
  @Get('/editar/:id')
  async editarJuego(@Res() res, @Param() id, @Session() session) {
    try {
      if (session.usuario && session) {
        const juego = await this.juegoService.listarId(id.id);
        if (juego) return res.render('admin/editar_juego', { juego: juego });
        else {
          throw new Error();
        }
      } else {
        return res.render('public/error', { error: 'No eres administrador' });
      }
    } catch (e) {
      return res.render('public/error', {
        error: 'Error en la aplicación: ' + e,
      });
    }
  }

  // GET /juego/:id
  @Get('/:id')
  async buscarPorId(@Res() res, @Param('id') id: string) {
    try {
      const juego = await this.juegoService.listarId(id);
      if (juego) return res.render('public/juego_ficha', { juego: juego });
      else {
        throw new Error();
      }
    } catch (e) {
      return res.render('public/error', {
        error: 'Error en la aplicación: ' + e,
      });
    }
  }

  // POST /juego
  @Post()
  async crear(@Body() crearJuegoDTO: JuegoDto, @Res() res) {
    try {
      return this.juegoService.insertar(crearJuegoDTO).then((juego) => {
        res.render('public/juego_ficha', { juego: juego });
      });
    } catch (e) {
      return res.render('public/error', {
        error: 'Error en la aplicación: ' + e,
      });
    }
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
      if (juego) return res.render('public/listado_juego', { juego: juego });
      else {
        throw new Error();
      }
    } catch (e) {
      return res.render('public/error', {
        error: 'Error en la aplicación: ' + e,
      });
    }
  }

  // DELETE /juego/:id
  @Delete(':id')
  async borrar(@Param('id') id: string, @Res() res) {
    try {
      const borrado = await this.juegoService.borrar(id);
      if (borrado) return res.render('public/listado_juego');
      else {
        throw new Error();
      }
    } catch (e) {
      return res.render('public/error', {
        error: 'Error en la aplicación: ' + e,
      });
    }
  }
}
