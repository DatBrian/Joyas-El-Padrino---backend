import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSaldoDto, UpdateSaldoDto } from 'src/dto/saldo.dto';
import { Saldo } from 'src/schemas/saldo.schema';

@Injectable()
export class SaldosService {
  constructor(
    @InjectModel(Saldo.name)
    private SaldoModel: Model<Saldo>,
  ) {}

  async getAll() {
    try {
      const saldos = this.SaldoModel.find();
      return await saldos;
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id: string) {
    try {
      const saldo = this.SaldoModel.findById(id);
      return await saldo;
    } catch (error) {
      console.log(error);
    }
  }

  async create(body: CreateSaldoDto) {
    try {
      const saldo = new this.SaldoModel(body);
      return await saldo.save();
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, body: UpdateSaldoDto) {
    try {
      const saldo = this.SaldoModel.findByIdAndUpdate(id, body);
      return await saldo;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: string) {
    try {
      const deleted = this.SaldoModel.findByIdAndDelete(id);
      return await deleted;
    } catch (error) {
      console.log(error);
    }
  }
}
