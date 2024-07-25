import { IsCurrency, IsDateString, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreatePagoDto{
    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    cliente_id: string;

    @IsDateString()
    @IsNotEmpty()
    fecha: string;

    @IsCurrency()
    @IsNotEmpty()
    cantidad: string;
}