const headers = { "Content-Type": "application/json" };

export default class Service {
  baseUrl: string;
  session?: string;

  constructor(session?: string) {
    const baseUrl = process.env.REACT_APP_API_URL;

    if (!baseUrl) {
      throw new Error("API URL not found, have you set up your env file?");
    }

    this.baseUrl = baseUrl;
    this.session = session;
  }

  _buildUrl(endpoint: string) {
    if (!this.session) {
      return `${this.baseUrl}/${endpoint}`
    }

    return `${this.baseUrl}/${this.session}/${endpoint}`;
  }

  async get<T>(endpoint: string) {
    const res = await fetch(this._buildUrl(endpoint), {
      method: "GET",
      headers,
    });
    return (await res.json()) as T;
  }

  async post<T>(endpoint: string, data: any) {
    const res = await fetch(this._buildUrl(endpoint), {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    });
    return (await res.json()) as T;
  }

  async put<T>(endpoint: string, data: any) {
    const res = await fetch(this._buildUrl(endpoint), {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    return (await res.json()) as T;
  }

  async delete<T>(endpoint: string) {
    const res = await fetch(this._buildUrl(endpoint), {
      method: "DELETE",
    });
    return (await res.json()) as T;
  }
}
