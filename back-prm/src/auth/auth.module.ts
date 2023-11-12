import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { appConstants } from '../constans';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigSystemEntity, MunicipiosEntity, ProvinciasEntity } from 'src/predefinido/predefinido.entity';

@Module({
  imports: [
    ConfigModule,
    UserModule, 
    TypeOrmModule.forFeature([UserEntity, MunicipiosEntity, ProvinciasEntity, ConfigSystemEntity]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: appConstants.jwtSecret,
      signOptions: {expiresIn: '1h'}
    })],
  providers: [AuthService,LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
