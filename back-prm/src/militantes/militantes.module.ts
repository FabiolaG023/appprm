import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MilitantesController } from './militantes.controller';
import { MilitantesEntity } from './militantes.entity';
import { MilitantesService } from './militantes.service';
import { CoordComiteEntity } from 'src/coordComite/coordComite.entity';
import { CircunscripcionesEntity, ColegiosEntity, DistritosEntity, LocalidadEntity, RecintosEntity, ZonasEntity } from 'src/predefinido/predefinido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    MilitantesEntity,
    CoordComiteEntity,
    ZonasEntity,
    RecintosEntity,
    CircunscripcionesEntity,
    ColegiosEntity,
    LocalidadEntity,
    DistritosEntity
  ])],
  providers: [MilitantesService],
  controllers: [MilitantesController]
})
export class MilitantesModule { }
