import { IsNotEmpty, IsString,   IsOptional,  IsNumber } from "class-validator"


export class CoordmunicipalDto {
   
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
    apodo: string;


    @IsOptional()
    @IsString() 
    telefono: string;


    @IsNotEmpty()
    @IsNumber()
    idprovincia: number;

    @IsNotEmpty()
    @IsNumber()
    idmunicipio: number;

    @IsNotEmpty()
    idcircunscripcion: number;

    @IsNotEmpty()
    @IsNumber()
    idrecinto: number;

    @IsNotEmpty()
    @IsNumber()
    idcolegio: number

}


export class CoordmunicipalUpdateDto{


    @IsOptional()
    @IsString() 
    apodo: string;


    @IsOptional()
    @IsString() 
    telefono: string;


    @IsOptional()
    @IsNumber()
    idprovincia: number;

    @IsOptional()
    @IsNumber()
    idmunicipio: number;


}