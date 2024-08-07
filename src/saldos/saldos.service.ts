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

  async getAll(): Promise<Saldo[]> {
    try {
      const saldos = this.SaldoModel.find();
      return await saldos;
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: string): Promise<Saldo> {
    try {
      const saldo = this.SaldoModel.findById(id);
      return await saldo;
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateSaldoDto) {
    try {
      const saldo = new this.SaldoModel(body);
      return await saldo.save();
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, body: UpdateSaldoDto) {
    try {
      const saldo = this.SaldoModel.findByIdAndUpdate(id, body);
      return await saldo;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const deleted = this.SaldoModel.findByIdAndDelete(id);
      return await deleted;
    } catch (error) {
      throw error;
    }
  }
}
