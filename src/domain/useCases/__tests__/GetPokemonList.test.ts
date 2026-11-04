import { GetPokemonList } from '../GetPokemonList';
import type { PokemonSummary } from '../../entities/Pokemon';
import type { PokemonRepository } from '../../repositories/PokemonRepository';

describe('GetPokemonList', () => {
  it('should return the fist 20 Pokemons by default', async () => {
    //Arrange
    const pokemonList: PokemonSummary[] = [
      {
        id: 1,
        name: 'bulbasaur',
        imageUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      },
    ];

    const repository: jest.Mocked<PokemonRepository> = {
      getPokemonList: jest.fn().mockResolvedValue(pokemonList),
      getPokemonDetail: jest.fn(),
    };

    const useCase = new GetPokemonList(repository);

    //Act
    const result = await useCase.execute();

    //Assert
    expect(result).toEqual(pokemonList);
    expect(repository.getPokemonList).toHaveBeenCalledWith(20, 0);
  });

  it('should support custom pagination parameters', async () => {
    //Arrange
    const repository: jest.Mocked<PokemonRepository> = {
      getPokemonList: jest.fn().mockResolvedValue([]),
      getPokemonDetail: jest.fn(),
    };

    const useCase = new GetPokemonList(repository);

    //Act
    await useCase.execute(20, 20);

    //Assert
    expect(repository.getPokemonList).toHaveBeenCalledWith(20, 20);
  });
});
