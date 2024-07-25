import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePagoDto } from 'src/dto/pago.dto';
import { Pago } from 'src/schemas/pago.schema';

@Injectable()
export class PagosService {
  constructor(
    @InjectModel(Pago.name)
    private PagoModel: Model<Pago>,
  ) {}

  async getAll() {
    try {
      const saldos = this.PagoModel.find();
      return await saldos;
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id: string) {
    try {
      const saldo = this.PagoModel.findById(id);
      return await saldo;
    } catch (error) {
      console.log(error);
    }
  }

  async create(body: CreatePagoDto) {
    try {
      const saldo = new this.PagoModel(body);
      return await saldo.save();
    } catch (error) {
      console.log(error);
    }
  }

//   async update(id: string, body: UpdatePa) {
//     try {
//       const saldo = this.PagoModel.findByIdAndUpdate(id, body);
//       return await saldo;
//     } catch (error) {
//       console.log(error);
//     }
//   }

  async delete(id: string) {
    try {
      const deleted = this.PagoModel.findByIdAndDelete(id);
      return await deleted;
    } catch (error) {
      console.log(error);
    }
  }
}
