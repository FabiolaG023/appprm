import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

userData: any[]=[]

    constructor(private userService: UserService, private jwtService: JwtService){}
  
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



}
