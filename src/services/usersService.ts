import Service from ".";

export default class UsersService {
  service;

  constructor(session: string) {
    this.service = new Service(session);
  }

  async getUsers() {
    return await this.service.get(`users`);
  }
}
