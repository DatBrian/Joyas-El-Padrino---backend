import { ROLES } from '../constants';

export interface IUserActive {
  sub: string;
  name: string;
  role: ROLES;
}
