import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';

import { MilitantesService } from './militantes.service';
import { MilitantesEntity } from './militantes.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import RoleGuard from 'src/auth/guard/roles.guard';
import Role from 'src/auth/enum/roles.enum';



@Controller('militantes')
export class MilitantesController {

  constructor(private service: MilitantesService) { }


  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseGuards(RoleGuard(Role.Admin || Role.User)) 
  @Get('all')
  all(){
    return this.service.all()
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseGuards(RoleGuard(Role.Admin || Role.User)) 
  @Post('/add')
 create(@Body() data: any){
    return  this.service.create(data);
 
  }


  
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Get('read/:id')
async read(@Param('id', ParseIntPipe) id: string){
 
    return await this.service.read(id)
  

}

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Patch('/update/:id')
async update(@Param('id', ParseIntPipe) id: string, @Body() data: any ){

  return  await this.service.update(id, data);
  
}

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
  @Delete('/delete/:id')
  delete(@Param('id', ParseIntPipe) id: string){

      return this.service.delete(id);
   
  }

}
