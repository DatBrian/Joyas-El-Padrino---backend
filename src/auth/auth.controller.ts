import { Body, Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators';
import { ROLES } from 'src/common/constants';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly userService: UsuariosService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto) {
    const userValidate = await this.service.validateUser(
      body.username,
      body.contraseña,
    );

    if (!userValidate) {
      throw new UnauthorizedException('Invalid Data');
    }

    const jwt = await this.service.generateJWT(userValidate);

    return jwt;
  }

  @Roles(ROLES.ADMIN)
  @Post('register')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Post('refresh')
  refreshToken(@Req() request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ') || [];
    return this.service.refreshToken(token);
  }
}
