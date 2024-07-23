import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Saldo } from 'src/schemas/saldo.schema';

@Injectable()
export class SaldosService {

        constructor(
        @InjectModel(Saldo.name)
        private ClienteModel:Model<Saldo>
    ) {}
}
