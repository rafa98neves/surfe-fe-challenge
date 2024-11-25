import { IUser } from "./users";

export interface INote {
  id: number;
  body: string;
}

export interface ISegment {
  text: string;

  userMention?: IUser;
}