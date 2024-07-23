import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = Usuario & Document;

@Schema({
    timestamps: true
})
export class Usuario{
    @Prop({
        unique: true,
        required: true,
        trim: true,
    })
    nombre: string;

    @Prop({
        unique: true,
        required: true,
        trim:true
    })
    cedula: number;

    @Prop({
        unique: true,
        required: false,
        trim: true,
    })
    direccion: string;

    @Prop({
        unique: true,
        required: true,
        trim: true
    })
    telefono: number;

    @Prop({
        unique: true,
        required: true,
        trim: true,
    })
    correo: string;

    @Prop({
        required: true,
        trim:true
    })
    contraseña: string;

}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);