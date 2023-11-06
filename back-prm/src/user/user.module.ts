import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { MunicipiosEntity, ProvinciasEntity } from 'src/predefinido/predefinido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, MunicipiosEntity, ProvinciasEntity])],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule { }
