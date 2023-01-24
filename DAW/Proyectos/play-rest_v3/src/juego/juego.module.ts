import { Module } from '@nestjs/common';
import { JuegoController } from './juego.controller';
import { JuegoService } from './juego.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JuegoSchema } from './schemas/juego.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Juego', schema: JuegoSchema }]),
  ],
  controllers: [JuegoController],
  providers: [JuegoService],
})
export class JuegoModule {}
