import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Juego } from './juego/interfaces/juego.interface';
import { Usuario } from './usuario/interfaces/usuario.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Juego')
    private readonly juegoModel: Model<Juego>,
    @InjectModel('Auth')
    private readonly authModel: Model<Usuario>,
  ) {}

  async listar(): Promise<Juego[]> {
    return await this.juegoModel.find().exec();
  }

  async listarBuscado(buscar: string) {
    const arrayJuegos = this.juegoModel.find().exec();
    return (await arrayJuegos).filter((juego) => {
      return juego.nombre.includes(buscar);
    });
  }
}
