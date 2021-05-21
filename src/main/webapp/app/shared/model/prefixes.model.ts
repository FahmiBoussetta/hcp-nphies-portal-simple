import { IHumanName } from 'app/shared/model/human-name.model';

export interface IPrefixes {
  id?: number;
  prefix?: string | null;
  human?: IHumanName | null;
}

export const defaultValue: Readonly<IPrefixes> = {};
