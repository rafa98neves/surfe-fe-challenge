import Service from ".";
import { IRawUser } from "../types/users";

export default class UsersService {
  service;

  constructor() {
    this.service = new Service();
  }

  async getUsers() {
    return await this.service.get<IRawUser[]>(`users`);
  }
}
