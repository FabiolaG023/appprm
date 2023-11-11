import { IsNotEmpty, IsString, MinLength,  IsOptional, IsIn, IsDate, IsArray, IsNumber } from "class-validator"
import Role from "src/auth/enum/roles.enum";

export class MilitanteDto {
   
    @IsNotEmpty()
    @IsString() 
    nombre: string;
      
    @IsNotEmpty()
    @IsString() 
    apellido: string;

    @IsNotEmpty()
    @IsString() 
    foto: string;

    @IsOptional()
    @IsString() 
    telefono: string;

    @IsOptional()
    @IsString() 
    apodo: string;

    @IsOptional()
    @IsNumber() 
    idzona: number;


    @IsOptional()
    @IsString()
    iddistrito:string;

    @IsOptional()
    @IsNumber() 
    idcoordcomite: number;

    @IsOptional()
    @IsString()
    idcircunscripcion: string;

    @IsOptional()
    @IsString()
    idrecinto: string;

    @IsOptional()
    @IsString()
    idcolegio:string;




}



export class MilitanteUpdateDto{

    @IsOptional()
    @IsString() 
    telefono: string;

    @IsOptional()
    @IsString() 
    apodo: string;

    @IsOptional()
    @IsNumber() 
    idzona: number;

    @IsOptional()
    @IsNumber() 
    idcoordcomite: number;


}