export interface PokemonDto {
  id: number;
  name: string;
  urlImage: string;
  urlFrontImage: string;
  urlBackImage: string;
  heigth: number;
  weigth: number;
  baseExperience: number;
  types: PokemonTypeSlot[];
  stats: PokemonStat[];
  abilities: PokemonAbilitySlot[];
}

export interface PokemonTypeSlot {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbilitySlot {
  slot: number;
  is_hidden: boolean;
  ability: {
    name: string;
    url: string;
  };
}