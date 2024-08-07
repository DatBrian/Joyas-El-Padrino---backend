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
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLES } from 'src/common/constants';

@Controller('usuarios')
export class UsuariosController {
  constructor(private service: UsuariosService) {}

  @Roles(ROLES.ADMIN)
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

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    const user = await this.service.delete(id);
    if (!user) throw new NotFoundException('usuario no encontrado');
    return user;
  }
}
