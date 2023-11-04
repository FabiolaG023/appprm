import { IsNotEmpty, IsString, MinLength,  IsOptional, IsIn, IsDate, IsArray, IsNumber } from "class-validator"
import Role from "src/auth/enum/roles.enum";

export class CoordComiteDto {
   
    @IsNotEmpty()
    @IsString() 
    nombre: string;

    @IsNotEmpty()
    @IsString() 
    apellido: string;


    @IsNotEmpty()
    @IsString()
    cedula: string;

    @IsOptional()
    @IsString()
    telefono: string;

    @IsOptional()
    @IsString()
    apodo: string;

    @IsOptional()
    @IsString()
    foto: string;


    @IsNotEmpty()
    @IsNumber()
    idzona: number;


    @IsNotEmpty()
    @IsNumber()
    idcoordzona: number;

}


export class CoordComiteUpdateDto{


    @IsOptional()
    @IsString() 
    telefono: string;

    @IsOptional()
    @IsString() 
    apodo: string;

    @IsOptional()
    idzona: number;


    @IsOptional()
    idcoordzona: number;


}