import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JuegoModule } from './juego/juego.module';
import { JuegoSchema } from './juego/schemas/juego.schema';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Juego', schema: JuegoSchema }]),
    JuegoModule,
    // UsuarioModule,
    MongooseModule.forRoot('mongodb://localhost:27017/playRest_v3'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
