import Service from ".";
import { IUser } from "../types/users";

export default class UsersService {
  service;

  constructor() {
    this.service = new Service();
  }

  async getUsers() {
    return await this.service.get<IUser[]>(`users`);
  }
}
