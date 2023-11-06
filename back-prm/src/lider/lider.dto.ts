import { IsNotEmpty, IsString, MinLength,  IsOptional, IsIn, IsDate, IsArray, IsNumber } from "class-validator"
import Role from "src/auth/enum/roles.enum";

export class LiderDto {
   
    @IsNotEmpty()
    @IsString() 
    nombre: string;

    @IsOptional()
    @IsString()
    foto: string;

    @IsNotEmpty()
    @IsNumber()
    idcandidatura: number;

    @IsNotEmpty()
    @IsNumber()
    idmunicipio: number;


    @IsNotEmpty()
    @IsNumber()
    idprovincia: number;

}



export class LiderUpdateDto{

    @IsOptional()
    @IsString() 
    nombre: string;

    @IsOptional()
    @IsString()
    foto: string;

    @IsOptional()
    @IsNumber()
    idcandidatura: number;

}