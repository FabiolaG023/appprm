
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CoordMunicipalEntity } from './coordMunicipal.entity';

@Injectable()
export class CoordMunicipalService {

    constructor(
        @InjectRepository(CoordMunicipalEntity)
        private readonly respo: Repository<CoordMunicipalEntity>) {}


  
        async all(){
            try {
              return await this.respo.find({relations: {idprovincia: true, idmunicipio: true}})  
            } catch (error) {
              return error  
            }
        }
    

        async create(data:any){
        const found = await this.respo.findOne({where:{cedula: data.cedula}})
        console.log(data)
            try {
                if (found || found == data.cedula) {
                    console.log(`no es posible REGISTRAR esta Zona:${data.cedula}, porque existe`)
                }else{
                    if (found == null ) {
                        const coordMuni = this.respo.create(data)
                        return await this.respo.save(coordMuni)   
                    }
                }
                   
                
               
               
            } catch (error) {
                console.log(error)
               return error 
            }
         }
    
    
        async read(id: string){
      const coordMunicipalFound = await this.respo.findOne({
        where:{id}, 
        relations:{
            idprovincia: true,
            idmunicipio:true,
            idcircunscripcion: true,
            idrecinto: true,
            idcolegio: true
        }})
            try {
                if(!coordMunicipalFound){
                return new HttpException('coordMunicipal no encontrado', HttpStatus.NOT_FOUND)
                }else{ return coordMunicipalFound}
            } catch (error) {
            
                throw new UnauthorizedException(`coordMunicipal:${coordMunicipalFound.nombre}, no encontrado`)
            }
            } 
    
    
        async delete(id: string){
            const coordMunicipalFound = await this.respo.findOne({where:{id}})
                try {
                    if (coordMunicipalFound) {
                    return this.respo.delete(id)
                    } else {
                        return new HttpException('coordMunicipal no encontrado', HttpStatus.NOT_FOUND)
                    }
                    
                } catch (error) {
                    throw new UnauthorizedException()
                }
            
            }
                
    
        async update(id: string, user: any){
            const coordMunicipalFound = await this.respo.findOne({where:{id}})
                try {
                if (!coordMunicipalFound) {
                    return new HttpException('coordMunicipal no encontrado', HttpStatus.NOT_FOUND)
                    }else{
                    const userUpdate = Object.assign(coordMunicipalFound, user);
                    return this.respo.save(userUpdate);
                    }
                
            } catch (error) {
                
            
                throw new UnauthorizedException(`coordMunicipal:${coordMunicipalFound.nombre}, no encontrado`)
            
            } 
            
                    
              
                 }
         
         
    
    
    
    
    
    

}
