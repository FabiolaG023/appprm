import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CoordZonaService } from './coordZona.service';
import { CoordZonaEntity } from './coordZona.entity';
import { CoordZonaDto, CoordZonaUpdateDto } from './coordZona.dto';
import RoleGuard from 'src/auth/guard/roles.guard';
import Role from 'src/auth/enum/roles.enum';



@Controller('coordZona')
export class CoordZonaController {

  constructor(private service: CoordZonaService) { }


  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Get('all')
async getUsers(){
  return await this.service.all()
}


@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Post('/add')
async createUser(@Body() data: any){
  try {
   return await this.service.create(data);
  } catch (error) {
    console.log(error)
    return  error 
  }


}


@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Get(':id')
getUserInfo(@Param('id', ParseIntPipe) id: string){
  try {
    return this.service.read(id)
   } catch (error) {
     return  error 
   }

}




@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Patch('/update/:id')
async updateUsers(@Param('id', ParseIntPipe) id: string, @Body() data: any ){
  try {
  return  await this.service.update(id, data);
  } catch (error) {
    return error
  }
}

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
  @Delete('/delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: string){
    try {
      return this.service.delete(id);
    } catch (error) {
      return error
    }
  }


}
