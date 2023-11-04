import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { appConstants } from "../../constans";
import { AuthService } from "../auth.service";
import { JWTPayload } from "../strategies/jwt.payload";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: appConstants.jwtSecret
    })
  }


   async validate(payload: any){
    return {
      userId: payload.id, 
      usuario: payload.usuario, 
      role: payload.role, 
      idprovincia: payload.idprovincia, 
      nombre: payload.nombre, 
      apellido: payload.apellido}
  }
 



}