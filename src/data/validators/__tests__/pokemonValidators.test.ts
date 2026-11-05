import { isPokemonListDTO } from '../pokemonValidators';

describe('isPokemonListDTO', () => {
  it('should accept a valid Pokemon list response', () => {
    const response: unknown = {
      count: 1302,
      next: null,
      previous: null,
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
      ],
    };

    expect(isPokemonListDTO(response)).toBe(true);
  });

  it('should reject a response without results', () => {
    const response: unknown = {
      count: 1302,
      next: null,
      previous: null,
    };

    expect(isPokemonListDTO(response)).toBe(false);
  });

  it('should reject an invalid list item', () => {
    const response: unknown = {
      count: 1302,
      next: null,
      previous: null,
      results: [{ name: 'bulbasaur' }],
    };

    expect(isPokemonListDTO(response)).toBe(false);
  });

  it('should reject null', () => {
    expect(isPokemonListDTO(null)).toBe(false);
  });

  it('should accept an empty results array', () => {
    const response: unknown = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

    expect(isPokemonListDTO(response)).toBe(true);
  });
});
