import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoordComiteController } from './coordComite.controller';
import { CoordComiteEntity } from './coordComite.entity';
import { CoordComiteService } from './coordComite.service';

import { CoordZonaEntity } from 'src/coordZona/coordZona.entity';
import { ConfigSystemEntity, ZonasEntity } from 'src/predefinido/predefinido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoordComiteEntity, ZonasEntity, CoordZonaEntity, ConfigSystemEntity])],
  providers: [CoordComiteService],
  controllers: [CoordComiteController]
})
export class CoordComiteModule { }
