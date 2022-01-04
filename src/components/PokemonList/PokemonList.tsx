import React from 'react';
import { Pokemon, Type } from '../../types/types';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import './PokemonList.scss';

type Props = {
  setSelectedId: (id: number | null) => void;
  pokemons: Pokemon[];
  types: Type[];
};

export const PokemonList: React.FC<Props> = ({
  pokemons, setSelectedId, types,
} : Props) => {
  return (
    <div className="pokemonList">
      {pokemons.map(pokemon => (
        <button
          className="pokemonList__button"
          type="button"
          onClick={() => setSelectedId(pokemon.id)}
          key={pokemon.name}
        >
          <PokemonCard
            types={types}
            pokemon={pokemon}
          />
        </button>
      ))}
    </div>
  );
};
