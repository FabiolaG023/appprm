import { Body, Controller, Get, NotFoundException, Post,Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IUser } from './login.dto';
import RoleGuard from './guard/roles.guard';
import Role from './enum/roles.enum';




@Controller('auth')
export class AuthController {

  constructor(private service: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: IUser): Promise<{access_token: string}>{
    const {usuario, password} = loginDto;
    const valid = await this.service.validateUser(loginDto);
    if (!valid) {
      throw new NotFoundException();  
    }
    return await this.service.generateAccessToken(usuario);
  }


  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth() 
  @UseGuards(RoleGuard(Role.Admin || Role.User))
  @Get('profile')
  getProfile(@Request() req){
   return req.user;
   
  }


}
