import { IsNotEmpty, IsString } from 'class-validator';
import { IsEmailOrNumber } from 'src/common/validations';

export class LoginDto {
  @IsNotEmpty()
  @IsEmailOrNumber({
    message:
      'El campo username debe ser un correo electrónico válido o un número de identificación',
  })
  username: string | number;

  @IsNotEmpty()
  @IsString()
  contraseña: string;
}
