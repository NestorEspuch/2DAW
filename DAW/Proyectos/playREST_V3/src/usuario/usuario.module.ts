import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from './schemas/usuario.schema';
import { AuthController } from './usuario.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Auth', schema: UsuarioSchema }]),
  ],
  controllers: [AuthController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
