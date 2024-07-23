import { Module } from '@nestjs/common';
import { SaldosController } from './saldos.controller';
import { SaldosService } from './saldos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Saldo, SaldoSchema } from 'src/schemas/saldo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Saldo.name, schema: SaldoSchema }]),
  ],
  controllers: [SaldosController],
  providers: [SaldosService],
})
export class SaldosModule {}
