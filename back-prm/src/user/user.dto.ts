import { IsNotEmpty, IsString, MinLength,  IsOptional, IsIn, IsDate, IsArray, IsNumber } from "class-validator"
import Role from "src/auth/enum/roles.enum";

export class UserDto {
   
    @IsNotEmpty()
    @IsString() 
    nombre: string;

    @IsNotEmpty()
    @IsString() 
    apellido: string;


    @IsNotEmpty()
    @IsString()
    usuario: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsNumber()
    idmunicipio: number;

    @IsNotEmpty()
    @IsNumber()
    idprovincia: number;

    @IsNotEmpty()
    @IsIn([Role.Admin, Role.User])
    role: Role[]; 



}



export class UserUpdateDto{
    @IsOptional()
    @IsString() 
    nombre: string;

    @IsOptional()
    @IsString() 
    apellido: string;

    @IsOptional()
    @IsString() 
    apodo: string;

    @IsOptional()
    @IsString()
    usuario: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsNumber()
    idmunicipio: number;

    @IsOptional()
    @IsNumber()
    idprovincia: number;

}