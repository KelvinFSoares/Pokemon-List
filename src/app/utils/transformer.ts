import { Pokemon } from '../pokelist/interface/pokemon';

export function transformRawPokermonData(rawData: unknown): Pokemon {
  return Object.assign({} as Pokemon, rawData);
}
