import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { SaldosModule } from './saldos/saldos.module';
import { PagosModule } from './pagos/pagos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/databaseConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const user = configService.get('database.user');
        const password = configService.get('database.password');
        const dbName = configService.get('database.dbName');
        const uri = `mongodb+srv://${user}:${password}@elpadrino.y0gktxf.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=ElPadrino`;
        return { uri };
      },
      inject: [ConfigService],
    }),
    ClientesModule,
    SaldosModule,
    PagosModule,
    UsuariosModule,
    AuthModule,
  ],
})
export class AppModule {}
