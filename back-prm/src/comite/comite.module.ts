import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComiteController } from './comite.controller';
import { ComiteEntity } from './comite.entity';
import { ComiteService } from './comite.service';

import { ConfigSystemEntity, LocalidadEntity, MunicipiosEntity, ProvinciasEntity, ZonasEntity } from 'src/predefinido/predefinido.entity';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [ComiteEntity, ZonasEntity, UserEntity, LocalidadEntity, ConfigSystemEntity]
    )],
  providers: [ComiteService],
  controllers: [ComiteController]
})
export class ComiteModule { }
