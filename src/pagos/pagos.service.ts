import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pago } from 'src/schemas/pago.schema';

@Injectable()
export class PagosService {

        constructor(
        @InjectModel(Pago.name)
        private ClienteModel:Model<Pago>
    ) { }
}
