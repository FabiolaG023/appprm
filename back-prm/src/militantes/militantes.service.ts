
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MilitantesEntity } from './militantes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MilitantesService{


    constructor(
        @InjectRepository(MilitantesEntity)
        private readonly respo: Repository<MilitantesEntity>,
        ) {}
   
   
        // agregar tipos de error http 

       all(){
    return this.respo.find
    ({relations:{
        idcoordcomite: true,

    }})
        }


    async create(data: any){
    const found = await this.respo.findOne({where: {cedula: data.cedula }})
    try {
        if (found || found == data.cedula) {
            throw new HttpException(`no es posible REGISTRAR este Miltitante ${data.cedula}, porque ya existe`, HttpStatus.FOUND)
        }else{
            if (!found == null ) {
                const newCoord = this.respo.create(data)
                return await this.respo.save(newCoord)   
            }
        }
    } catch (error) {
        throw error
    }
        }


    async read(id: any){
    const found = await this.respo.findOne({
        where: {id},
        relations:{
            idcoordcomite: true,
        }
    })   
    try {
        if(!found){
        throw new HttpException(`Militante: ${id} no encontrado`, HttpStatus.NOT_FOUND)
        }else{ return found}
    } catch (error) {
        throw error
    }
         }



    async delete(id: string){
        const found = await this.respo.findOne({where:{id}})
            try {
                if (found) {
                return this.respo.delete(id)
                } else {
                    throw new HttpException(`Militante: ${id} no encontrado`, HttpStatus.NOT_FOUND)
                }               
            } catch (error) {
                throw error          
            }
        
        }
            

    async update(id: string, data: any){
        const found = await this.respo.findOne({where:{id}})
            try {
            if (!found) {
                throw new HttpException(`Militante: ${id} no encontrado`, HttpStatus.NOT_FOUND)
                }else{
                const newUpdate = Object.assign(found, data);
                return this.respo.save(newUpdate);
                }
        } catch (error) {
            throw error
        } 
       }








}








