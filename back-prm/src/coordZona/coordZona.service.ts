
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CoordZonaEntity } from './coordZona.entity';

@Injectable()
export class CoordZonaService {


    constructor(
        @InjectRepository(CoordZonaEntity)
        private readonly respo: Repository<CoordZonaEntity>) {}

        async all(){
            try {
              return await this.respo.find({
                relations: {idzona: true,
                     idcoordmunicipal: true, 
                     idmunicipio: true,
                    idprovincia: true}})  
            } catch (error) {
              return error  
            }
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
        const coordZonaFound = await this.respo.findOne({where:{id}, relations: {
            idmunicipio: true, 
            idcircunscripcion: true, 
            idcolegio: true,
            idcoordmunicipal: true,
            idprovincia: true,
            idrecinto: true,
            idzona: true
        }})
    
            try {
                if(!coordZonaFound){
                return new HttpException('coordZona no encontrado', HttpStatus.NOT_FOUND)
                }else{ return coordZonaFound}
                
    
            } catch (error) {
            
                throw new UnauthorizedException(`coordZona:${coordZonaFound.nombre}, no encontrado`)
            }
    
            
            } 
    
    
        async delete(id: string){
            const coordZonaFound = await this.respo.findOne({where:{id}})
                try {
                    if (coordZonaFound) {
                    return this.respo.delete(id)
                    } else {
                        return new HttpException('coordZona no encontrado', HttpStatus.NOT_FOUND)
                    }
                    
                } catch (error) {
                    throw new UnauthorizedException()
                }
            
            }
                
    
        async update(id: string, data: any){
            
            const coordZonaFound = await this.respo.findOne({where:{id}})
                try {
                if (!coordZonaFound) {
                    return new HttpException('coordZona no encontrado', HttpStatus.NOT_FOUND)
                    }else{
                    const dataUpdate = Object.assign(coordZonaFound, data);
                    return this.respo.save(dataUpdate);
                    }
                
            } catch (error) {
                
            
                throw new UnauthorizedException(`coordZona:${coordZonaFound.cedula}, no encontrado`)
            
            } 
            
                    
              
                 }
         
         
    






}
