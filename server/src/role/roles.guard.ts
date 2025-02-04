import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'src/decorators/roles.decorators';
import { Role } from 'src/role/enums/role.enum';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [context.getHandler(), context.getClass()]);

    console.log('requiredRoles ', requiredRoles);
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization;
    const user = await this.userService.getUserByToken(token);

    console.log('user ', user);
    return requiredRoles.some((role) => user.role === role);
  }
}
