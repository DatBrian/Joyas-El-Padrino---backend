import { applyDecorators, UseGuards } from '@nestjs/common';
import { ROLES } from 'src/common/constants';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export const Auth = (role: ROLES) => {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
};
