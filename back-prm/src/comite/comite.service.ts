
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ComiteEntity } from './comite.entity';

@Injectable()
export class ComiteService {

    constructor(
        @InjectRepository(ComiteEntity)
        private readonly respo: Repository<ComiteEntity>) {}


        
        async all(){
            try {
              return await this.respo.find()  
            } catch (error) {
              return error  
            }
        }
 /*   

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
        const coordComiteFound = await this.respo.findOne({where:{id}})
    
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
                
    
        async update(id: string, user: any){
            const coordComiteFound = await this.respo.findOne({where:{id}})
                try {
                if (!coordComiteFound) {
                    return new HttpException('coordComite no encontrado', HttpStatus.NOT_FOUND)
                    }else{
                    const userUpdate = Object.assign(coordComiteFound, user);
                    return this.respo.save(userUpdate);
                    }
                
            } catch (error) {
                
            
                throw new UnauthorizedException(`coordComite:${coordComiteFound.nombre}, no encontrado`)
            
            } 
            
                    
              
                 }
         
         
    


   */

}
