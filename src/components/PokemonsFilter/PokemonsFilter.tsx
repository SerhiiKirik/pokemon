import React, { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { getPokemonTypes } from '../../api/getPokemonTypes';
import { ReactSelectOption } from '../../types/types';

interface Props {
  selectedFilters: MultiValue<ReactSelectOption<string>>;
  setSelectedFilters: (filters: MultiValue<ReactSelectOption<string>>) => void;
  className: string;
}

export const PokemonsFilter: React.FC<Props> = ({
  selectedFilters, setSelectedFilters, className,
}) => {
  const [options, setOptions] = useState<MultiValue<ReactSelectOption<string>>>([]);

  useEffect(() => {
    getPokemonTypes()
      .then(types => setOptions(types.map(type => (
        {
          value: type.name,
          label: type.name,
        }
      ))));
  }, []);

  return (
    <div className={className}>
      <Select
        options={options}
        isMulti
        value={selectedFilters}
        onChange={(filters) => setSelectedFilters(filters)}
      />
    </div>
  );
};
