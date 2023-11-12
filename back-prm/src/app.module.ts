import { Module } from '@nestjs/common';

import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule} from '@nestjs/config';
import { UserEntity } from './user/user.entity';
import { LiderModule } from './lider/lider.module';
import { LiderEntity } from './lider/lider.entity';


import { PredefinidoModule } from './predefinido/predefinido.module';
import { AbcsEntity, CandidaturaEntity, ColegiosEntity, DistritosEntity, LocalidadEntity, MunicipiosEntity, ProvinciasEntity, RecintosEntity, ZonasEntity, CircunscripcionesEntity, ConfigSystemEntity } from './predefinido/predefinido.entity';
import { CoordMunicipalModule } from './coordMunicipal/coordMunicipal.module';
import { CoordMunicipalEntity } from './coordMunicipal/coordMunicipal.entity';
import { CoordZonaModule } from './coordZona/coordZona.module';


import { CoordZonaEntity } from './coordZona/coordZona.entity';
import { CoordComiteModule } from './coordComite/coordComite.module';
import { MilitantesModule } from './militantes/militantes.module';
import { CoordComiteEntity } from './coordComite/coordComite.entity';
import { MilitantesEntity } from './militantes/militantes.entity';
import { ComiteModule } from './comite/comite.module';






@Module({
  imports: [

    ComiteModule,
MilitantesModule,
CoordComiteModule,

CoordZonaModule,
CoordMunicipalModule,

    PredefinidoModule,
    LiderModule,
    UserModule,
    ConfigModule,

    TypeOrmModule.forRoot({

      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: 'sgcp',
      username: 'root',
      password: 'pass354368',
      autoLoadEntities: true,
      synchronize: true,
      entities: [

        UserEntity, 
        LiderEntity, 
        ColegiosEntity,
        CoordMunicipalEntity,
        CoordZonaEntity,
        CoordComiteEntity,
        MilitantesEntity,
        CandidaturaEntity,
       // ProvinciasEntity, 
       // MunicipiosEntity,
        DistritosEntity,
        AbcsEntity,
        ZonasEntity,
        RecintosEntity,
        ColegiosEntity,
        LocalidadEntity,
        CircunscripcionesEntity,
        ConfigSystemEntity
      ],
    }), 
    AuthModule,

  
  ],
  controllers: [],
  providers: [],

})
export class AppModule {}
