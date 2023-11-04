import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

userData: any[]=[]

    constructor(
        private userService: UserService, 
        private jwtService: JwtService,
        
        @InjectRepository(UserEntity)
    private readonly respo: Repository<UserEntity>){}
  
// funcion asincrona que valida el usuario y la contraseña
    async validateUser(data): Promise<any>{
    const valid =  await this.userService.validateUser(data)
        try {
            return valid
        } catch (error) {
            return error
        }
    }

async validateUserById(id: any){
    const userFound = await this.userService.getUser(id)    
    try {
        return userFound
    } catch (error) {
        return error
    }

}

// genera token con la informacion del usuario en seccion
async generateAccessToken(usuario: string){
    const user = await this.userService.getUserByName(usuario);
    const payload = {
          id: user.id,
          usuario: user.usuario,
          idprovincia: user.idprovincia,
          role: user.role,
          nombre: user.nombre,
          apellido: user.apellido }
    return {access_token: this.jwtService.sign(payload)}

}


async login(user: any){
    const payload = 
    {id: user.id,
         usuario: user.usuario, 
         nombre: user.nombre, 
         apellido: user.apellido,
         role: user.role
        }
     return {access_token: this.jwtService.sign(payload),
        id: user.id,
        usuario: user.usuario,
        apellido: user.apellido,
        role: user.role,
        nombre: user.nombre};
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
       throw error
      
    }
 }
 

}
