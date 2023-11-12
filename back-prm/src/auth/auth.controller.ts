import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Post,Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IUser } from './login.dto';
import RoleGuard from './guard/roles.guard';
import Role from './enum/roles.enum';
import { UserDto } from 'src/user/user.dto';




@Controller('auth')
export class AuthController {

  constructor(private service: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: IUser): Promise<{access_token: string}>{
    const {usuario, password} = loginDto;
    const valid = await this.service.validateUser(loginDto);
    if (!valid) {
     // throw new NotFoundException();  
     throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Credenciales Invalidas',
      origin: '/login'
     }, HttpStatus.FORBIDDEN);
    }
    return await this.service.generateAccessToken(usuario);
  }



@Post('singup')
async singup(@Body() data: any){
  try {
   return await this.service.singup(data);
   
  } catch (error) {
    return  error 
  }
}

@Post('config/add')
  async config(@Body() data: any){
    try {
      return await this.service.singup(data);
      
     } catch (error) {
       return  error 
     } 
  }






  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth() 
  @UseGuards(RoleGuard(Role.Admin || Role.User))
  @Get('profile')
  getProfile(@Request() req){
   return req.user;
   
  }


}
