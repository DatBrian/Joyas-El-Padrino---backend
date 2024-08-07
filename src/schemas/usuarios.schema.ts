import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ROLES } from "src/common/constants";

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
        trim: true,
        select: false
    })
    contraseña: string;

    @Prop({
        required: true,
        enum: ROLES,
        default: ROLES.BASIC
    })
    rol: ROLES;

}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);