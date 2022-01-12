import { getData } from './api';
import { POKEMONS } from './consts';
import { Pokemon } from '../types/types';

export const getPokemon = (id: number): Promise<Pokemon> => (
  getData(`${POKEMONS}/${id}`)
);
