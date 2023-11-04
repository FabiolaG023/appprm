import { IsNotEmpty, IsString, MinLength,  IsOptional, IsIn, IsDate, IsArray, IsNumber } from "class-validator"
import Role from "src/auth/enum/roles.enum";

export class LiderDto {
   
    @IsNotEmpty()
    @IsString() 
    nombre: string;

    @IsOptional()
    @IsString()
    foto: string;

    @IsOptional()
    @IsString()
    logo: string;

    @IsOptional()
    @IsNumber()
    idcandidatura: number;




}



export class LiderUpdateDto{

    @IsOptional()
    @IsString() 
    nombre: string;

    @IsOptional()
    @IsString()
    foto: string;

    @IsOptional()
    @IsString()
    logo: string;

    @IsOptional()
    @IsNumber()
    idcandidatura: number;

}