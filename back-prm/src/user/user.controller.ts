import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import RoleGuard from 'src/auth/guard/roles.guard';
import Role from 'src/auth/enum/roles.enum';
import { UserDto, UserUpdateDto } from './user.dto';


@Controller('user')
export class UserController {

  constructor(private service: UserService) { }


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
async createUser(@Body() data: UserDto){
  try {
   return await this.service.create(data);
  } catch (error) {
    return  error 
  }


}





@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin ||Role.User)) 
@Get('read/:id')
readUser(@Param('id', ParseIntPipe) id: string){
  try {
    return this.service.read(id)
   } catch (error) {
     return  error 
   }

}

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin ||Role.User))
@Get('info/:id')
info(@Param('id', ParseIntPipe) id:string){
  try {
    return this.service.read(id)
   } catch (error) {
     return  error 
   }
 

}




@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Delete('/desactive/:id')
async desactivarUser(@Param('id', ParseIntPipe) id: string){
  try {
   return await this.service.desactive(id);
  } catch (error) {
    return error
  }
}




@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Patch('/update/:id')
async updateUsers(@Param('id', ParseIntPipe) id: string, @Body() data: UserUpdateDto ){
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
