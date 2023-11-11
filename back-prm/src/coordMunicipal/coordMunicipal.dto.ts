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