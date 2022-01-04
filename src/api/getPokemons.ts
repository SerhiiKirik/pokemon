import { get, getData } from './api';
import { POKEMONS, POKEMONS_PER_PAGE } from './consts';
import { basePokemon, Pokemon } from '../types/types';

export const getPokemons = (offset: number): Promise<Pokemon[]> => (
  getData(`${POKEMONS}/?limit=${POKEMONS_PER_PAGE}&offset=${offset}`)
    .then(data => Promise.all(data.results.map((response: basePokemon) => get(response.url))))
);
