import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoordZonaController } from './coordZona.controller';
import { CoordZonaEntity } from './coordZona.entity';
import { CoordZonaService } from './coordZona.service';

import { CoordMunicipalEntity } from 'src/coordMunicipal/coordMunicipal.entity';
import { 
  CircunscripcionesEntity, 
  ColegiosEntity, 
   MunicipiosEntity, 
  ProvinciasEntity, 
  RecintosEntity, 
  ZonasEntity, 
  LocalidadEntity 
} from 'src/predefinido/predefinido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    CoordZonaEntity,
     ZonasEntity,
     CoordMunicipalEntity,
     ProvinciasEntity,
     MunicipiosEntity,
     CircunscripcionesEntity,
     RecintosEntity,
     ColegiosEntity,
     LocalidadEntity
  ])],
  providers: [CoordZonaService],
  controllers: [CoordZonaController]
})
export class CoordZonaModule { }
