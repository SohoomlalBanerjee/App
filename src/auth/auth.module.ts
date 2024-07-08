import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
// import { JwtStrategy } from './strategies/jwt.strategy';
// import { HashPasswordMiddleware } from './middleware/hashing.middleware';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from 'src/user/entities/user.entity';
// import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync(
      {
        imports:  [ConfigModule],
        inject:  [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>("JWT_EXPIRE")
          }
      }
    )})
    ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy]
})
 export class AuthModule {}
