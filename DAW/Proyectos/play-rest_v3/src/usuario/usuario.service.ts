import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './interfaces/usuario.interface';
import { UsuarioDto } from './dto/usuario-dto/usuario-dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel('Usuario')
    private readonly usuarioModel: Model<Usuario>,
  ) {}

  async borrar(id: string): Promise<Usuario> {
    return await this.usuarioModel.findByIdAndRemove(id);
  }

  async actualizar(
    id: string,
    actualizarUsuarioDto: UsuarioDto,
  ): Promise<Usuario> {
    return await this.usuarioModel.findByIdAndUpdate(id, actualizarUsuarioDto);
  }

  async insertar(crearUsuarioDto: UsuarioDto): Promise<Usuario> {
    const nuevoJuego = new this.usuarioModel(crearUsuarioDto);
    return await nuevoJuego.save();
  }

  async buscarPorId(id: string): Promise<Usuario[]> {
    return await this.usuarioModel.findById(id);
  }

  async listar(): Promise<Usuario[]> {
    return await this.usuarioModel.find();
  }
}
