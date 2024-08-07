import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument, Usuario } from 'src/schemas/usuarios.schema';
import { Document } from 'mongoose';
import { JWTokens, PayloadToken, SignJwtParams } from './interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly UsuariosService: UsuariosService,
    private jwtSvc: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async validateUser(username: string | number, password: string) {
    try {
      const userByEmail = await this.UsuariosService.findBy({
        key: 'correo',
        value: username,
      });
      let userByCedula = null;

      if (!userByEmail) {
        userByCedula = await this.UsuariosService.findBy({
          key: 'cedula',
          value: username,
        });

        const match = await bcrypt.compare(password, userByCedula.contraseña);
        if (match) return userByCedula;
      } else {
        const match = await bcrypt.compare(password, userByEmail.contraseña);
        if (match) return userByEmail;
      }
    } catch (error) {
      throw error;
    }
  }

  public async signJWT({
    payload,
    secret,
    refreshSecret,
    expires,
    refreshExpire,
  }: SignJwtParams): Promise<JWTokens> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtSvc.signAsync(payload, {
          secret: secret,
          expiresIn: expires,
        }),
        this.jwtSvc.signAsync(payload, {
          secret: refreshSecret,
          expiresIn: refreshExpire,
        }),
      ]);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.error('Error signing JWTs:', error);
      throw new Error('Error signing JWTs');
    }
  }

  public async generateJWT(user: any): Promise<any> {
    try {
      const getUser: UserDocument = await this.UsuariosService.getOne(user.id);

      const payload: PayloadToken = {
        sub: getUser.id,
        name: getUser.nombre,
        role: getUser.rol,
      };

      const params: SignJwtParams = {
        payload,
        secret: process.env.JWT_PRIVATE_KEY,
        refreshSecret: process.env.JWT_PRIVATE_KEY_REFRESH,
        expires: '1d',
        refreshExpire: '7d',
      };

      const { accessToken, refreshToken } = await this.signJWT(params);

      return {
        message: 'Token created!!',
        token: accessToken,
        refresh_token: refreshToken,
        usuario: {
          name: getUser.nombre,
          role: getUser.rol,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const user = this.jwtSvc.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_PRIVATE_KEY_REFRESH'),
      });
      const payload = { sub: user._id, name: user.nombre, role: user.rol };
      const { access_token, refresh_token } = await this.generateJWT(payload);
      return {
        access_token,
        refresh_token,
        status: 200,
        message: 'Refresh Token sucess',
      };
    } catch (error) {
      throw new HttpException('Token no válido', HttpStatus.UNAUTHORIZED);
    }
  }
}
