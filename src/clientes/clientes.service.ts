import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clientes } from 'src/schemas/clientes.schema';

@Injectable()
export class ClientesService {
    constructor(
        @InjectModel(Clientes.name)
        private ClienteModel:Model<Clientes>
    ) {}
    
    getAllClientes() {
        this.ClienteModel.find()
    }
}
