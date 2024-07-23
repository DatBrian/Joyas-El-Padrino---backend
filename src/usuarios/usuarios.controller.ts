import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginDto } from 'src/dto/login.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private service: UsuariosService) {}

  @Get()
  async getAllUsers() {
    const users = await this.service.getAll();
    if (!users) throw new NotFoundException('Usuarios no encontrado');
    return users;
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string) {
    const user = await this.service.getOne(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  @Post('register')
  createUser(@Body() body: CreateUserDto) {
    return this.service.create(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.service.loginUser(body.correo, body.contraseña);
  }

  @Post('refresh')
  refreshToken(@Req() request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ') || [];
    return this.service.refreshToken(token);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    const user = await this.service.delete(id);
    if (!user) throw new NotFoundException('usuario no encontrado');
    return user;
  }
}
