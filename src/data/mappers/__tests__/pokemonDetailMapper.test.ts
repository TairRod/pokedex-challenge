import { mapPokemonDetail } from '../pokemonMapper';
import type { PokemonDetailDTO } from '../../dto/PokemonDetailDTO';

describe('mapPokemonDetail', () => {
  const pikachuDTO: PokemonDetailDTO = {
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
          url: 'https://pokeapi.co/api/v2/type/13/',
        },
      },
    ],
    abilities: [
      {
        is_hidden: false,
        slot: 1,
        ability: {
          name: 'static',
          url: 'https://pokeapi.co/api/v2/ability/9/',
        },
      },
    ],
    stats: [
      {
        base_stat: 90,
        effort: 2,
        stat: {
          name: 'speed',
          url: 'https://pokeapi.co/api/v2/stat/6/',
        },
      },
    ],
  };

  it('should map a Pokemon detail DTO to a domain entity', () => {
    // Arrange
    const dto = pikachuDTO;

    // Act
    const result = mapPokemonDetail(dto);

    // Assert
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

  it('should preserve null base experience', () => {
    const dto: PokemonDetailDTO = {
      ...pikachuDTO,
      base_experience: null,
    };

    const result = mapPokemonDetail(dto);

    expect(result.baseExperience).toBeNull();
  });

  it('should reject an unknown Pokemon type', () => {
    const dto: PokemonDetailDTO = {
      ...pikachuDTO,
      types: [
        {
          slot: 1,
          type: {
            name: 'unknown-type',
            url: 'https://example.com/type/',
          },
        },
      ],
    };

    expect(() => mapPokemonDetail(dto)).toThrow('Invalid Pokemon type: unknown-type');
  });
});
