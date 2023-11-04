import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {

  usuario: string;

 
  password: string;
}


export type IUser ={
  id: any;

  usuario: string;

  password: string;
  }
