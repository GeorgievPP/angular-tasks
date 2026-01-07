import { GemType } from './gem.types';

export interface Gem {
  id: number;
  name: string;
  color: string;
  carats: string;
  price: number;
  type: GemType;
}
