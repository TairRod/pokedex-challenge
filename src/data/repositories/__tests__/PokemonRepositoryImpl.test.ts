import { PokemonRepositoryImpl } from '../PokemonRepositoryImpl';
import type { HttpClient } from '../../api/HttpClient';
import type { PokemonListDTO } from '../../dto/PokemonListDTO';

describe('PokemonRepositoryImpl', () => {
  let client: jest.Mocked<HttpClient>;
  let repository: PokemonRepositoryImpl;

  beforeEach(() => {
    client = {
      get: jest.fn(),
    };

    repository = new PokemonRepositoryImpl(client);
  });

  describe('getPokemonList', () => {
    it('should return mapped Pokemon summaries', async () => {
      // Arrange
      const response: PokemonListDTO = {
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
          },
        ],
      };

      client.get.mockResolvedValue(response);

      // Act
      const result = await repository.getPokemonList(20, 0);

      // Assert
      expect(client.get).toHaveBeenCalledWith('/pokemon?limit=20&offset=0');

      expect(result).toEqual([
        {
          id: 1,
          name: 'bulbasaur',
          imageUrl:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        },
      ]);
    });

    it('should reject an invalid response', async () => {
      // Arrange
      client.get.mockResolvedValue({
        invalid: true,
      });

      // Act & Assert
      await expect(repository.getPokemonList(20, 0)).rejects.toThrow(
        'Invalid Pokemon list response',
      );
    });
  });
  describe('getPokemonDetail', () => {
    it('should return a mapped Pokemon', async () => {
      // Arrange
      const response = {
        id: 25,
        name: 'pikachu',
        base_experience: 112,
        height: 4,
        weight: 60,
        types: [
          {
            slot: 1,
            type: {
              name: 'electric',
              url: '/type/13/',
            },
          },
        ],
        abilities: [
          {
            is_hidden: false,
            slot: 1,
            ability: {
              name: 'static',
              url: '/ability/9/',
            },
          },
        ],
        stats: [
          {
            base_stat: 90,
            effort: 2,
            stat: {
              name: 'speed',
              url: '/stat/6/',
            },
          },
        ],
      };

      client.get.mockResolvedValue(response);

      // Act
      const result = await repository.getPokemonDetail(25);

      // Assert
      expect(client.get).toHaveBeenCalledWith('/pokemon/25');

      expect(result).toEqual({
        id: 25,
        name: 'pikachu',
        imageUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        types: ['electric'],
        abilities: ['static'],
        stats: [{ name: 'speed', value: 90 }],
        height: 4,
        weight: 60,
        baseExperience: 112,
      });
    });

    it('should reject an invalid detail response', async () => {
      // Arrange
      client.get.mockResolvedValue({
        id: 25,
        name: 'pikachu',
      });

      // Act & Assert
      await expect(repository.getPokemonDetail(25)).rejects.toThrow(
        'Invalid Pokemon detail response',
      );
    });

    it('should propagate HTTP client errors', async () => {
      // Arrange
      client.get.mockRejectedValue(new Error('Network request failed'));

      // Act & Assert
      await expect(repository.getPokemonDetail(25)).rejects.toThrow(
        'Network request failed',
      );
    });
  });
});
