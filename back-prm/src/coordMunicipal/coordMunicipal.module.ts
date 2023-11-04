import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoordMunicipalController } from './coordMunicipal.controller';
import { CoordMunicipalEntity } from './coordMunicipal.entity';
import { CoordMunicipalService } from './coordMunicipal.service';

@Module({
  imports: [TypeOrmModule.forFeature([CoordMunicipalEntity])],
  providers: [CoordMunicipalService],
  controllers: [CoordMunicipalController],
  exports: [CoordMunicipalService]
})
export class CoordMunicipalModule { }
