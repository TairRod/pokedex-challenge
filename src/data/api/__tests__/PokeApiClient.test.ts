import { HttpError, PokeApiClient } from '../PokeApiClient';

describe('PokeApiClient', () => {
  const client = new PokeApiClient();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return JSON when the response is successful', async () => {
    const pokemon = { name: 'pikachu' };

    const fetchMock = jest.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => pokemon,
    } as Response);

    const result = await client.get('/pokemon/25');

    expect(result).toEqual(pokemon);
    expect(fetchMock).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/25');
  });

  it('should throw HttpError for unsuccessful responses', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    await expect(client.get('/pokemon/999999')).rejects.toBeInstanceOf(HttpError);
  });

  it('should propagate network errors', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockRejectedValue(new TypeError('Network request failed'));

    await expect(client.get('/pokemon/25')).rejects.toThrow('Network request failed');
  });
});
