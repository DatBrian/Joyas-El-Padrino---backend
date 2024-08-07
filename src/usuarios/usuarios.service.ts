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
      const users = this.usuarioModel.find().lean();

      return await users;
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: string) {
    try {
      const user = this.usuarioModel.findById(id);
      return await user;
    } catch (error) {
      throw error;
    }
  }

  async findBy({
    key,
    value,
  }: {
    key: keyof Usuario;
    value: any;
  }): Promise<Usuario | null> {
    try {
      const user = await this.usuarioModel.findOne({ [key]: value }).select("+contraseña").exec();
      return user;
    } catch (error) {
      throw new Error(`Error finding user by ${key}: ${error.message}`);
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
      return {
        status: HttpStatus.CREATED,
        message: 'Register Success',
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const deleted = this.usuarioModel.findByIdAndDelete(id);
      return await deleted;
    } catch (error) {
      throw error;
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


}
