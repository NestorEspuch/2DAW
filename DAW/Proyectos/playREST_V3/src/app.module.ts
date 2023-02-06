import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express/multer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JuegoModule } from './juego/juego.module';
import { JuegoSchema } from './juego/schemas/juego.schema';
import { UsuarioSchema } from './usuario/schemas/usuario.schema';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Juego', schema: JuegoSchema }]),
    MongooseModule.forFeature([{ name: 'Auth', schema: UsuarioSchema }]),
    JuegoModule,
    UsuarioModule,
    MongooseModule.forRoot('mongodb://localhost:27017/playRest_v3'),
    MulterModule.register({
      dest: './public/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
