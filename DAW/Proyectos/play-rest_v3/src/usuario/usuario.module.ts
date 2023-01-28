import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from './schemas/usuario.schema';
import { AppController } from './usuario.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Usuario', schema: UsuarioSchema }]),
  ],
  controllers: [AppController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
