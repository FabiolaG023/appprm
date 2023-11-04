import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService) {
        super({
          usuarioField: 'usuario',
          passwordField: 'password',
          passReqToCallback: true
        });
      }
    
      async validate(req: any,data): Promise<any> {
        console.log(`[LocalStrategy] validate: usuario=${data.usuario}`)
        const user = await this.authService.validateUser(data);
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      }}