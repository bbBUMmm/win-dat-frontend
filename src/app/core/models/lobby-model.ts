import {UserModel} from './user-model';

export interface LobbyModel {
  id: number;
  name: string;
  amount: number;
  created: Date;
  updated: Date;
  closed: Date;
  userList?: UserModel[];
}
