import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: ,
    username: '',
    password: '',
    database: '',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true
  }),
  ConfigModule.forRoot({
    envFilePath: ['.local.env'],
    isGlobal: true,
  }),
  AuthModule,
  UserModule,
  BlogModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
