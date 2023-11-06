import { IsNotEmpty, IsString, IsOptional,  IsNumber } from "class-validator"


export class CoordZonaDto {
   
    @IsNotEmpty()
    @IsString() 
    nombre: string;

    @IsNotEmpty()
    @IsString() 
    apellido: string;

      
    @IsOptional()
    @IsString() 
    apodo: string;


    @IsNotEmpty()
    @IsString()
    cedula: string;

    @IsOptional()
    @IsString()
    telefono: string;

    @IsNotEmpty()
    @IsString() 
    foto: string;


    @IsOptional()
    @IsNumber()
    idcircunscripcion: number;

    @IsNotEmpty()
    @IsNumber()
    idrecinto: number;

    @IsNotEmpty()
    @IsNumber()
    idcolegio: number;

    @IsNotEmpty()
    @IsNumber()
    idzona: number;

    @IsNotEmpty()
    @IsNumber()
    idmunicipio: number;

    @IsNotEmpty()
    @IsNumber()
    idprovincia: number;

    @IsNotEmpty()
    @IsNumber()
    idcoordmunicipal: number;


    @IsOptional()
    @IsNumber() 
    idlocalidad: number;

}



export class CoordZonaUpdateDto{
  
    @IsOptional()
    @IsString() 
    apodo: string;

    @IsOptional()
    @IsString()
    telefono: string;

    @IsOptional()
    @IsNumber()
    idzona: number;

    @IsOptional()
    @IsNumber()
    idcoordmunicipal: number;

    @IsOptional()
    @IsNumber() 
    idlocalidad: number;



}