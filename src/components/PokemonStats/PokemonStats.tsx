import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { Pokemon } from '../../types/types';
import { getPokemon } from '../../api/getPokemon';
import './PokemonStats.scss';

type Props = {
  id: number;
  closeStats: () => void;
};

export const PokemonStats: React.FC<Props> = ({ id, closeStats }: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    setPokemon(null);
    getPokemon(id)
      .then(data => setPokemon(data));
  }, [id]);

  if (!pokemon) {
    return (
      <div className="pokemonStats__content">
        <Loader
          type="Oval"
          color="#000"
          height={150}
          width={150}
        />
      </div>
    );
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="blur"
        onClick={() => closeStats()}
      />
      <div className="pokemonStats__content">

        <button
          type="button"
          className="pokemonStats__closeBtn"
          onClick={() => closeStats()}
        >
          X
        </button>

        <img
          className="pokemonStats__img"
          src={`${pokemon.sprites.other.dream_world.front_default}`}
          alt={`${pokemon.name}`}
        />

        <div className="pokemonStats__content__name">
          {pokemon.name}
        </div>

        <table
          className="pokemonStats"
        >
          <tbody>
            {pokemon.stats.map(stat => (
              <tr
                key={stat.stat.name}
              >
                <td className="pokemonStats__name">
                  <span className="pokemonStats__info">
                    {stat.stat.name}
                  </span>
                </td>

                <td className="pokemonStats__stat">
                  <span className="pokemonStats__info">
                    {stat.base_stat}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>

  );
};
