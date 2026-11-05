import { PokeApiClient } from '../../data/api/PokeApiClient';
import { PokemonRepositoryImpl } from '../../data/repositories/PokemonRepositoryImpl';
import { GetPokemonList } from '../../domain/useCases/GetPokemonList';
import { GetPokemonDetail } from '../../domain/useCases/GetPokemonDetail';

//Infraestructure
const httpClient = new PokeApiClient();

//Data
const pokemonRepository = new PokemonRepositoryImpl(httpClient);

//Domain use cases
export const getPokemonList = new GetPokemonList(pokemonRepository);
export const getPokemonDetail = new GetPokemonDetail(pokemonRepository);
