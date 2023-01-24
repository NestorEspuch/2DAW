import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Juego } from './interfaces/juego.interface';
import { JuegoDto } from './dto/juego-dto/juego-dto';

@Injectable()
export class JuegoService {
  constructor(
    @InjectModel('Juego')
    private readonly juegoModel: Model<Juego>,
  ) {}

  async borrar(id: string): Promise<Juego> {
    return await this.juegoModel.findByIdAndRemove(id);
  }

  async actualizar(id: string, actualizarJuegoDto: JuegoDto): Promise<Juego> {
    return await this.juegoModel.findByIdAndUpdate(id, actualizarJuegoDto);
  }

  async insertar(crearJuegoDto: JuegoDto): Promise<Juego> {
    const nuevoJuego = new this.juegoModel(crearJuegoDto);
    return await nuevoJuego.save();
  }

  async buscarPorId(id: string): Promise<Juego[]> {
    return await this.juegoModel.findById(id);
  }

  async listar(): Promise<Juego[]> {
    return await this.juegoModel.find();
  }
}
