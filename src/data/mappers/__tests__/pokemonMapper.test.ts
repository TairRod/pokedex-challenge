import { mapPokemonSummary } from '../pokemonMapper';
import type { PokemonListItemDTO } from '../../dto/PokemonListDTO';

describe('mapPokemonSummary', () => {
  it('should trasnform a Pokemon DTO into a domain summary', () => {
    //Arrange
    const dto: PokemonListItemDTO = {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    };

    //Act
    const result = mapPokemonSummary(dto);

    //Assert
    expect(result).toEqual({
      id: 25,
      name: 'pikachu',
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    });
  });

  it('should reject an invalid Pokemon id', () => {
    //Arrange
    const dto: PokemonListItemDTO = {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/invalid/',
    };

    expect(() => mapPokemonSummary(dto)).toThrowError('Invalid pokemon id');
  });
});
