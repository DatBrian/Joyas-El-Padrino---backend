import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({
  timestamps: true,
})
export class Pago {
  @Prop({
    type: Types.ObjectId,
    ref: 'Usuario',
    required: true,
    trim: true,
  })
  cliente_id: string;
    
  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  fecha: string;

  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  cantidad: string;
}

export const PagoSchema = SchemaFactory.createForClass(Pago)