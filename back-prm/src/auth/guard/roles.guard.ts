import { CanActivate, ExecutionContext, HttpException, HttpStatus, mixin, Type } from '@nestjs/common';
import Role from '../enum/roles.enum';
import { JwtAuthGuard } from './jwt-auth.guard';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
 
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      if (!user.role) {
        throw new HttpException(`EL USUARIO: ${user.usuario},NO CUENTA CON EL ROL DE ADMINISTRADOR: ${user.role}`, HttpStatus.FORBIDDEN);
      }else{ 
        // devuelve el rol
        return  user?.role;
      } 
    }
  }
  return mixin(RoleGuardMixin);
}
export default RoleGuard;


