import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CoordComiteService } from './coordComite.service';
import { CoordComiteDto, CoordComiteUpdateDto } from './coordComite.dto';
import RoleGuard from 'src/auth/guard/roles.guard';
import Role from 'src/auth/enum/roles.enum';



@Controller('coordComite')
export class CoordComiteController {

  constructor(private service: CoordComiteService) { }


  
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



@Get('coordZonalXZonas/:id')
getCoordZonalXZonas(@Param('id', ParseIntPipe) id: string){
  try {
    return this.service.getCoordZonalXZonas(id)
   } catch (error) {
     return  error 
   }

}





@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Patch('/update/:id')
async updateUsers(@Param('id', ParseIntPipe) id: string, @Body() data: CoordComiteUpdateDto){
  try {
  return  await this.service.update(id, data);
  } catch (error) {
    return error
  }
}


@UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseGuards(RoleGuard(Role.Admin)) 
  @Delete('/delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: string){
    try {
      return this.service.delete(id);
    } catch (error) {
      return error
    }
  }





}
