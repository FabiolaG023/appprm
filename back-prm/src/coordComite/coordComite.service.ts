
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CoordComiteEntity } from './coordComite.entity';
import { CoordComiteUpdateDto } from './coordComite.dto';
import { ZonasEntity } from 'src/predefinido/predefinido.entity';
import { CoordZonaEntity } from 'src/coordZona/coordZona.entity';

@Injectable()
export class CoordComiteService {

    constructor(
        @InjectRepository(CoordComiteEntity)
        private readonly respo: Repository<CoordComiteEntity>,
        @InjectRepository(CoordZonaEntity)
        private readonly coordzona: Repository<CoordZonaEntity>,
        @InjectRepository(ZonasEntity)
        private readonly zonas: Repository<ZonasEntity>,
        ) {}


        
        async all(){
            try {
              return await this.respo.find({relations:{idcoordzona: true}})  
            } catch (error) {
              return error  
            }
        }
    
            // BUSCA TODAS LAS ZONAS X COORDINADORES DE ZONAS
        async getCoordZonalXZonas(id: any){
            // BUSCA EN COORDCOMITE EL COORDZONAL Y SU ZONA CORRESPONDIENTE
      

           const result = await this.coordzona
           .createQueryBuilder('coordzonales')
            .leftJoinAndSelect('zonas', 'zona', 'zona.id = coordzonales.idzona')
            .select(['coordzonales.nombre', 'coordzonales.apellido', 'zona.id', 'zona.zona'])
            .where('coordzonales.id = :id', { id: id })
            .getRawMany();
           return result
        
  
        }

        async create(data:any){
            this.respo.findOne({where:{cedula: data.cedula}})
            try {
               const newUser = this.respo.create(data)
               return this.respo.save(newUser)
            } catch (error) {
               throw new UnauthorizedException()  
            }
         }
    
    
        async read(id: string){
        const coordComiteFound = await this.respo.findOne({where:{id}, relations:{idcoordzona: true}})
    
            try {
                if(!coordComiteFound){
                return new HttpException('coordComite no encontrado', HttpStatus.NOT_FOUND)
                }else{ return coordComiteFound}
                
    
            } catch (error) {
            
                throw new UnauthorizedException(`coordComite:${coordComiteFound.nombre}, no encontrado`)
            }
    
            
            } 
    
    
        async delete(id: string){
            const coordComiteFound = await this.respo.findOne({where:{id}})
                try {
                    if (coordComiteFound) {
                    return this.respo.delete(id)
                    } else {
                        return new HttpException('coordComite no encontrado', HttpStatus.NOT_FOUND)
                    }
                    
                } catch (error) {
                    throw new UnauthorizedException()
                }
            
            }
                
    
        async update(id: string, data: CoordComiteUpdateDto){
            const coordComiteFound = await this.respo.findOne({where:{id}})
                try {
                if (!coordComiteFound) {
                    return new HttpException('coordComite no encontrado', HttpStatus.NOT_FOUND)
                    }else{
                    const dataUpdate = Object.assign(coordComiteFound, data);
                    return this.respo.save(dataUpdate);
                    }
                
            } catch (error) {
                
            
                throw new UnauthorizedException(`coordComite:${coordComiteFound.nombre}, no encontrado`)
            
            } 
            
                    
              
                 }
         
         
    





}
