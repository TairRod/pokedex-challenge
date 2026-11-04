export interface HttpClient {
  get(endpoint: string): Promise<unknown>;
}
