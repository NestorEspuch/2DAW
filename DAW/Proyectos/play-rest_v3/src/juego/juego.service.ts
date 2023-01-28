import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JuegoDto } from './dto/juego-dto/juego-dto';
import { Juego } from './interfaces/juego.interface';

@Injectable()
export class JuegoService {
  constructor(
    @InjectModel('Juego')
    private readonly juegoModel: Model<Juego>,
  ) {}

  async listar(): Promise<Juego[]> {
    return await this.juegoModel.find().exec();
  }
  async listarId(id: string) {
    return await this.juegoModel.findById(id).exec();
  }

  async insertar(crearContactoDto: JuegoDto): Promise<Juego> {
    const nuevoContacto = new this.juegoModel(crearContactoDto);
    return await nuevoContacto.save();
  }

  async actualizar(id: string, actualizarTareaDto: JuegoDto): Promise<Juego> {
    return await this.juegoModel
      .findByIdAndUpdate(
        id,

        {
          $set: {
            nombre: actualizarTareaDto.nombre,
            descripcion: actualizarTareaDto.descripcion,
            edad: actualizarTareaDto.edad,
            jugadoresPermitido: actualizarTareaDto.jugadoresPermitido,
            tipo: actualizarTareaDto.tipo,
            precio: actualizarTareaDto.precio,
            imagen: actualizarTareaDto.imagen,
            ediciones: actualizarTareaDto.ediciones,
          },
        },
        { new: true, runValidators: true },
      )
      .exec();
  }

  async borrar(id: string): Promise<Juego> {
    return await this.juegoModel.findByIdAndDelete(id).exec();
  }
}
