import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './usuario/interfaces/usuario.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Juego')
    private readonly usuarioModel: Model<Usuario>,
  ) {}

  async listar(id?: string): Promise<Usuario[]> {
    if (!id) {
      return await this.usuarioModel.find();
    } else {
      return await this.usuarioModel.findById(id);
    }
  }
}
