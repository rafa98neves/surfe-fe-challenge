import { INote } from "../types/notes";
import { IUser } from "../types/users";

export interface IState {
  notes: INote[];
  users: IUser[];

  session: string | null,

  loading: boolean
}

export interface IAction {
  type: ACTION_TYPE;
  payload: any;
}

export enum ACTION_TYPE {
  ADD_NOTE,
  UPDATE_NOTE,
  SET_NOTES,

  SET_USERS,
  SET_SESSION,

  SET_LOADING,
}