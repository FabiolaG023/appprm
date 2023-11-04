import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LiderController } from './lider.controller';
import { LiderEntity } from './lider.entity';
import { LiderService } from './lider.service';
import { MunicipiosEntity, ProvinciasEntity } from 'src/predefinido/predefinido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LiderEntity, MunicipiosEntity, ProvinciasEntity])],
  providers: [LiderService],
  exports:[LiderService],
  controllers: [LiderController]
})
export class LiderModule { }
