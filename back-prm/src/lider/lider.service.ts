import { HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LiderEntity } from './lider.entity';
import { Repository } from 'typeorm';
import { Blob } from "buffer";
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class LiderService {

    datoFoto: any
    blobFoto:any


    constructor(
    @InjectRepository(LiderEntity)
    private readonly respo: Repository<LiderEntity>,
    ) {}


    async all(){
        try {
          return await this.respo.find({where: {}, relations: {idcandidatura: true}})  
        } catch (error) {
          return error  
        }
    }

 

    async create(data:any){
    const found =  await  this.respo.findOne({where:{nombre: data.nombre}})
        console.log(data)
        try {

            if (found || found == data.nombre) {
                return new HttpException('ESTE LIDER EXISTE', HttpStatus.FOUND)
            }else{
                if (!found ||found == null) {
                    const newLider = this.respo.create(data)
                    return await this.respo.save(newLider)
                }
            }


        } catch (error) {
           throw new UnauthorizedException()  
        }
     }
   
   async readFoto(id: string){
        const found = await this.respo.findOne({where:{id} })  
    //    console.log(found.foto)
    
        const result = this.respo.createQueryBuilder('lider').
        where('id')
       .getMany();
       


        return result

     }

    async read(id: string){
        const data = await this.respo.findOne({where:{id}, relations: {idcandidatura: true}})
      //  console.log(data)
       const status =  HttpStatus.FOUND

       const  res = {data,  status}

        try {

    
          if(!data || data == null){
            return new HttpException('Lider no encontrado', HttpStatus.NOT_FOUND)
            }else{
                return  res
            }

            
        } catch (error) {
       

        
            throw new UnauthorizedException(`Lider:${data.nombre}, no encontrado`)
        }

        
        } 


    async delete(id: string){
        const liderFound = await this.respo.findOne({where:{id}})
            try {
                if (liderFound) {
                return this.respo.delete(id)
                } else {
                    return new HttpException('Lider no encontrado', HttpStatus.NOT_FOUND)
                }
                
            } catch (error) {
                throw new UnauthorizedException()
            }
        
        }
            

    async update(id: string, user: any){
        const liderFound = await this.respo.findOne({where:{id}})
            try {
            if (!liderFound) {
                return new HttpException('Lider no encontrado', HttpStatus.NOT_FOUND)
                }else{
                const userUpdate = Object.assign(liderFound, user);
                return this.respo.save(userUpdate);
                }
            
        } catch (error) {
            
        
            throw new UnauthorizedException(`lider:${liderFound.nombre}, no encontrado`)
        
        } 
        
                
          
             }
     
     



















}
