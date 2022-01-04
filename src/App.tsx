import React, { useEffect, useMemo, useState } from 'react';
import './App.scss';
import { MultiValue } from 'react-select';
import Loader from 'react-loader-spinner';
import { getPokemons } from './api/getPokemons';
import { Pokemon, ReactSelectOption, Type } from './types/types';
import { PokemonList } from './components/PokemonList/PokemonList';
import { PokemonStats } from './components/PokemonStats/PokemonStats';
import { PokemonsFilter } from './components/PokemonsFilter/PokemonsFilter';
import { getPokemonTypes } from './api/getPokemonTypes';

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<MultiValue<ReactSelectOption<string>>>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPokemonTypes()
      .then(data => {
        setTypes(
          data.map(({ name }) => ({
            name,
            color: Math.floor(Math.random() * 16777215).toString(16),
          })),
        );
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getPokemons(offset).then(data => setPokemons(data));
  }, []);

  const loadMore = () => {
    setIsLoading(true);
    setOffset(currentOffset => {
      const newOffset = currentOffset + 12;

      getPokemons(newOffset).then(data => {
        setPokemons(prevData => [...prevData, ...data]);
        setIsLoading(false);
      });

      return newOffset;
    });
  };

  const preparedPokemons = useMemo(() => {
    if (!selectedFilters.length) {
      return pokemons;
    }

    const preparedFilters = selectedFilters.map(filter => filter.value);

    return pokemons.filter(pokemon => pokemon.types.some(({ type }) => (
      preparedFilters.includes(type.name)
    )));
  }, [selectedFilters, pokemons]);

  return (
    <div className="App">
      <h1 className="App__title">
        POKEDEX
      </h1>

      <div className="App__contentWrapper">
        <PokemonsFilter
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          className="App__filters"
        />

        {!isLoading && !preparedPokemons.length && <h2>Have not pokemons</h2>}

        <PokemonList
          pokemons={preparedPokemons}
          setSelectedId={setSelectedId}
          types={types}
        />

        {isLoading && !preparedPokemons.length && (
          <div className="App__loader">
            <Loader
              type="Oval"
              color="#000"
              height={150}
              width={150}
            />
          </div>
        )}

        {selectedId && (
          <PokemonStats id={selectedId} closeStats={() => setSelectedId(null)} />
        )}

        <button
          className="App__button"
          type="button"
          onClick={loadMore}
          disabled={isLoading}
        >
          Load more
        </button>
      </div>
    </div>
  );
};

export default App;
