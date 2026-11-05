import { GetPokemonDetail } from '../GetPokemonDetail';
import type { Pokemon } from '../../entities/Pokemon';
import type { PokemonRepository } from '../../repositories/PokemonRepository';

describe('GetPokemonDetail', () => {
  const pikachu: Pokemon = {
    id: 25,
    name: 'pikachu',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    types: ['electric'],
    abilities: ['static', 'lightning-rod'],
    stats: [
      {
        name: 'speed',
        value: 90,
      },
    ],
    height: 4,
    weight: 60,
    baseExperience: 112,
  };

  it('should return the requested Pokemon', async () => {
    //Arrange
    const repository: jest.Mocked<PokemonRepository> = {
      getPokemonList: jest.fn(),
      getPokemonDetail: jest.fn().mockResolvedValue(pikachu),
    };

    const useCase = new GetPokemonDetail(repository);

    //Act
    const result = await useCase.execute(25);

    //Assert
    expect(result).toEqual(pikachu);
    expect(repository.getPokemonDetail).toHaveBeenCalledWith(25);
    expect(repository.getPokemonList).not.toHaveBeenCalledTimes(1);
  });
});
