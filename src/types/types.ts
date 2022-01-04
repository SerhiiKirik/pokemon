export interface basePokemon {
  name: string;
  url: string;
}

interface Sprites {
  other: {
    dream_world: {
      front_default: string;
    }
  }
}

interface PokemonTypes {
  type: {
    name: string;
  }
}

interface Stats {
  base_stat: number;
  stat: {
    name: string;
  }
}

export interface Pokemon {
  name: string;
  id: number;
  sprites: Sprites;
  types: PokemonTypes[];
  stats: Stats[];
}

export interface ReactSelectOption<T> {
  value: T;
  label: string;
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface Type {
  name: string;
  color: string;
}
