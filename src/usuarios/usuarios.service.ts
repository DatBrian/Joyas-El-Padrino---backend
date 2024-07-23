import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDocument, Usuario } from 'src/schemas/usuarios.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UserDocument>,
    private jwtSvc: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getAll() {
    try {
      const users = this.usuarioModel.find();
      return await users;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOne(id: string) {
    try {
      const user = this.usuarioModel.findById(id);
      return await user;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginUser(correo: string, password: string) {
    try {
      const user: CreateUserDto & Document = await this.usuarioModel.findOne({
        correo,
      });
      const passwordValid = await bcrypt.compare(password, user.contraseña);

      if (!passwordValid)
        throw new HttpException(
          'Verifique sus datos de inicio de sesión',
          HttpStatus.UNAUTHORIZED,
        );

      if (user && passwordValid) {
        const payload = { sub: user._id, name: user.nombre, role: user.rol };
        const { access_token, refresh_token } =
          await this.generateToken(payload);

        return {
          access_token,
          refresh_token,
          message: 'Login Success',
        };
      }
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Verifique sus datos de inicio de sesión',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async create(body: CreateUserDto): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(body.contraseña, 10);
      const newUser = new this.usuarioModel({
        ...body,
        contraseña: hashedPassword,
      });
      const user = await newUser.save();
      const { access_token, refresh_token } = await this.generateToken(user);
      return {
        access_token,
        refresh_token,
        status: HttpStatus.CREATED,
        message: 'Register Success',
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
    try {
      const deleted = this.usuarioModel.findByIdAndDelete(id);
      return await deleted;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async generateToken(user: any): Promise<any> {
    const jwtPayload = { sub: user._id, name: user.nombre, role: user.rol };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtSvc.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_PRIVATE_KEY'),
        expiresIn: '1d',
      }),
      this.jwtSvc.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_PRIVATE_KEY_REFRESH'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const user = this.jwtSvc.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_PRIVATE_KEY_REFRESH'),
      });
      const payload = { sub: user._id, name: user.nombre, role: user.rol };
      const { access_token, refresh_token } = await this.generateToken(payload);
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
