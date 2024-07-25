import { IsDateString, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSaldoDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  cliente_id: string;

  @IsDateString()
  @IsNotEmpty()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateSaldoDto {
  @IsString()
  @IsMongoId()
  @IsOptional()
  cliente_id: string;

  @IsDateString()
  @IsOptional()
  fecha: string;

  @IsString()
  @IsOptional()
  description: string;
}
