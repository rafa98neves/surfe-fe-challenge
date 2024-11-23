import Service from ".";
import { INote } from "../types/notes";

export default class NotesService {
  service;

  constructor(session: string) {
    this.service = new Service(session);
  }

  async getNote(id: number) {
    return await this.service.get<INote>(`notes/${id}`);
  }

  async getNotes() {
    return await this.service.get<INote[]>("notes");
  }

  async setNote(data: INote) {
    const payload = {
      ...data,
      body: data.body.text
    }
    return await this.service.post<INote>("notes", payload);
  }

  async updateNote(id: number, data: INote) {
    return await this.service.put<INote>(`notes/${id}`, data);
  }
}
