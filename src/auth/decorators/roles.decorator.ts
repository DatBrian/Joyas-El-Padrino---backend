import { SetMetadata } from '@nestjs/common';
import { ROLES, ROLES_KEY } from 'src/common/constants';

export const Roles = (role: ROLES) => SetMetadata(ROLES_KEY, role);
