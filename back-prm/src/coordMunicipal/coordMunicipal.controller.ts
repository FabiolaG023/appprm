import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CoordMunicipalService } from './coordMunicipal.service';
import { CoordMunicipalEntity } from './coordMunicipal.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import RoleGuard from 'src/auth/guard/roles.guard';
import Role from 'src/auth/enum/roles.enum';
import { CoordmunicipalDto, CoordmunicipalUpdateDto } from './coordMunicipal.dto';




@Controller('coordMunicipal')
export class CoordMunicipalController {

  constructor(private service: CoordMunicipalService) { }


  

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
async create(@Body() data: any){
   return await this.service.create(data);

}


@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Get(':id')
getInfo(@Param('id', ParseIntPipe) id: string){
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
async updates(@Param('id', ParseIntPipe) id: string, @Body() data: any ){
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
  delete(@Param('id', ParseIntPipe) id: string){
    try {
      return this.service.delete(id);
    } catch (error) {
      return error
    }
  }









}
