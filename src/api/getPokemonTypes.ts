import { getData } from './api';
import { POKEMON_TYPES } from './consts';
import { PokemonType } from '../types/types';

export const getPokemonTypes = (): Promise<PokemonType[]> => (
  getData(POKEMON_TYPES).then(data => data.results)
);
