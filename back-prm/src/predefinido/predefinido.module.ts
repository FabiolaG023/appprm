import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredefinidoController } from './predefinido.controller';
import { 
  ProvinciasEntity, 
  MunicipiosEntity, 
  CandidaturaEntity, 
  DistritosEntity, 
  AbcsEntity, 
  RecintosEntity, 
  ColegiosEntity, 
  LocalidadEntity,  
  ZonasEntity, 
  CircunscripcionesEntity, 
  ConfigSystemEntity} from './predefinido.entity';
import { PredefinidoService } from './predefinido.service';



@Module({
  imports: [TypeOrmModule.forFeature([

    MunicipiosEntity, 
    ProvinciasEntity, 
    CandidaturaEntity, 
    DistritosEntity, 
    AbcsEntity,
    RecintosEntity,
    ColegiosEntity,
    LocalidadEntity,
    CircunscripcionesEntity,
    ZonasEntity,
    ConfigSystemEntity
  
  ])],
  providers: [ PredefinidoService],
  controllers: [PredefinidoController],
  exports:[PredefinidoService],
})
export class PredefinidoModule { }
