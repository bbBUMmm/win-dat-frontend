import {UserRoleEnum} from './user-role-enum';

export interface UserModel {
  id: number;
  loginName: string;
  gamesWon: number;
  rola: UserRoleEnum;
}
