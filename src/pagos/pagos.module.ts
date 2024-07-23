import { Module } from '@nestjs/common';
import { PagosController } from './pagos.controller';
import { PagosService } from './pagos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pago, PagoSchema } from 'src/schemas/pago.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pago.name, schema: PagoSchema }]),
  ],
  controllers: [PagosController],
  providers: [PagosService],
})
export class PagosModule {}
