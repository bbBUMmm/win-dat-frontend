import {UserRoleEnum} from './user-role-enum';

export interface UserModel {
  id: number;
  keycloakId: string;
  loginName: string;
  userRoleEnum: UserRoleEnum;
  lobbyId?: number;
  credits: number;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  cs2Username: string;
}
