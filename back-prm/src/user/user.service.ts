import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt'
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';





export type User ={
    id: any;
    usuario: string;
    password: string;
    }


@Injectable()
export class UserService {

    
    data: any = this.respo
    private readonly users: User[] = this.data


    constructor(@InjectRepository(UserEntity)
    private readonly respo: Repository<UserEntity>,
   ) {}

    

   async all(){
    return await this.respo.find() 
 }


 async create(data:any){
    this.respo.findOne({where:{nombre: data.nombre}})
    try {
       const newUser = this.respo.create(data)
       return this.respo.save(newUser)
    } catch (error) {
       throw new UnauthorizedException()  
    }
 }

 async singup(data:any){
   const {usuario, password}= data

   const userFound = this.respo.findOne({where:{usuario: data.usuario}})

   try {
      if (userFound) {
         console.log(`${data.usuario} Existe, intente de nuevo!`)
      }else{
          const newUser = this.respo.create(data)
          this.respo.save(newUser)
         

      }

   } catch (error) {
      throw error || new UnauthorizedException()  
     
   }
}


 async read(id: string){
    const userFound = await this.respo.findOne({where:{id}})

        try {
         if(!userFound){
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
         }else{ return userFound}
          

        } catch (error) {
        
           throw new UnauthorizedException(`Usuario:${userFound.usuario}, no encontrado`)
        }

        
        }


async getUser(id: string): Promise<User>{
  try {
      return this.users.find(user => user.id === id)
  } catch (error) {
      throw new UnauthorizedException()
  }
}





//DESACTIVA EL USUARIO
async desactive(id: string) {
  // const userFound = await this.userrespo.findOne({where:{id, isActive: true}})
  const user = await this.respo.preload({id})

   try {
      if(!user){
         return new HttpException('User no encontrado', HttpStatus.NOT_FOUND)
      }else{  return await this.respo.save(user);}
   } catch (error) {
     
      throw new UnauthorizedException(`Usuario, no encontrado`)

   }
 
    }

// BORRA EL USUARIO
async delete(id: string){
const userFound = await this.respo.findOne({where:{id}})
   try {
      if (userFound) {
        return this.respo.delete(id)
      } else {
         return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
      }
      
   } catch (error) {
      throw new UnauthorizedException()
   }

}

// CAPTURA LA INFORMACION DEL USUARIO




// ACTUALIZA LA INFORMACION DEL USUARIO        
async update(id: string, user: any){
       const userFound = await this.respo.findOne({where:{id}})
        try {
         // si el password viene en el json, encriptarlo y agregarlo
          if (user.password) {
            // const newPass = this.hashPassword(user.password)
             const salt = await bcrypt.genSalt();
             const hashedPassword =  user.password = await bcrypt.hash(user.password, salt);
             const res = { password: hashedPassword };
             const result =  Object.assign(user, res);
             const userUpdate = await Object.assign(userFound, result );
     
            return this.respo.save(userUpdate);

           }else{
             //si no no agregar
            const userUpdate = Object.assign(userFound, user);
           return this.respo.save(userUpdate);
           }
          
       } catch (error) {
          
          if (!userFound) {
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
          }
          throw new UnauthorizedException(`Usuario:${userFound.usuario}, no encontrado`)
      
       } 
    
           
     
        }



// VALIDA EL USUARIO, PARA EL LOGIN
async validateUser(login: any){
 const found = await this.respo.findOne({where:{usuario: login.usuario}})
  try {
    if (found) {
       const pass = await bcrypt.compareSync(login.password, found.password)
       return pass && login.usuario === found.usuario
    }
  } catch (error) {
    
  }
}



// MUESTRA EL USUARIO POR NOMBRE
async getUserByName(usuario: string): Promise<UserEntity>{
const user = await this.respo.findOne({where:{usuario}});
   try {
      return user
   } catch (error) {
      throw new UnauthorizedException()
   }
}













}
