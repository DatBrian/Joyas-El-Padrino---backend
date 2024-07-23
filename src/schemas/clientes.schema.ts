import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({
    timestamps: true
})
export class Clientes extends Document{
    @Prop({
        type: Types.ObjectId,
        ref:"Usuario",
        required: true,
        trim: true,
    })
    cliente_id: string;

    @Prop({
        type: [{
            id:{type:Types.ObjectId, required:true},
            nombre: { type: String, required: true },
            email: { type: String, required: true },
            telefono: { type: String, required: true },
            direccion: { type: String, required: true },
            saldo: { type: Number, required: true }
        }],
        required: true,
        default: []
    })
    clientes: Array<any>;

    @Prop({
        default:0
    })
    saldo_total:number;

}
const ClientesSchema = SchemaFactory.createForClass(Clientes);

ClientesSchema.pre('save', function (next) {
  const clientList = this as any;
  clientList.saldoTotal = clientList.clientes.reduce((total, cliente) => total + cliente.saldo, 0);
  next();
});

export {ClientesSchema};