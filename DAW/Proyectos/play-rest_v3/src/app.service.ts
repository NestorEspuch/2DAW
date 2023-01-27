import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './usuario/interfaces/usuario.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('auth')
    private readonly usuarioModel: Model<Usuario>,
  ) {}

  async listar(): Promise<Usuario[]> {
    return await this.usuarioModel.find();
  }
}
