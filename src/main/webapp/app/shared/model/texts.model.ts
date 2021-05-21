import { IHumanName } from 'app/shared/model/human-name.model';

export interface ITexts {
  id?: number;
  textName?: string | null;
  human?: IHumanName | null;
}

export const defaultValue: Readonly<ITexts> = {};
