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
    @IsNumber() 
    idrecinto: number;

    @IsOptional()
    @IsNumber() 
    iddistrito:number;

    @IsOptional()
    @IsNumber() 
    idcoordcomite: number;

    @IsOptional()
    @IsNumber() 
    idcolegio: number;

    @IsOptional()
    @IsNumber() 
    idlocalidad: number;





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