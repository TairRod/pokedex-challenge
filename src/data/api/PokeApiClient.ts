import type { HttpClient } from './HttpClient';

const BASE_URL = 'https://pokeapi.co/api/v2';

export class HttpError extends Error {
  constructor(public readonly status: number, public readonly endpoint: string) {
    super(`Http error ${status}: ${endpoint}`);
    this.name = 'HttpError';
  }
}

export class PokeApiClient implements HttpClient {
  async get(endpoint: string): Promise<unknown> {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new HttpError(response.status, endpoint);
    }
    const data: unknown = await response.json();
    return data;
  }
}
