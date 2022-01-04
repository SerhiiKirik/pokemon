import React from 'react';
import { Pokemon, Type } from '../../types/types';
import './PokemonCard.scss';

interface Props {
  pokemon: Pokemon;
  types: Type[];
}

export const PokemonCard: React.FC<Props> = ({ pokemon, types }: Props) => {
  const { name } = pokemon;
  const imageUrl = pokemon.sprites.other.dream_world.front_default;
  const skills = pokemon.types;

  return (
    <div className="pokemonCard">
      <img
        className="pokemonCard__img"
        src={imageUrl}
        alt={name}
      />
      <div className="pokemonCard__name">
        {name}
      </div>

      <div className="pokemonCard__info">
        {skills.map(skill => (
          <h5
            className="pokemonCard__skill"
            key={skill.type.name}
            style={
              { background: `#${types.find(type => type.name === skill.type.name)?.color}` }
            }
          >
            {skill.type.name}
          </h5>
        ))}
      </div>
    </div>
  );
};
