import { Exclude, Expose } from 'class-transformer';

export class responseUserDto {
  @Expose()
  _id: string;

  @Expose()
  nombre: string;

  @Expose()
  cedula: number;

  @Expose()
  direccion: string;

  @Expose()
  telefono: number;

  @Expose()
  correo: string;

  @Exclude()
  contraseña: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
