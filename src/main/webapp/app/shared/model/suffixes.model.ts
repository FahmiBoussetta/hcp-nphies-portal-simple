import { IHumanName } from 'app/shared/model/human-name.model';

export interface ISuffixes {
  id?: number;
  suffix?: string | null;
  human?: IHumanName | null;
}

export const defaultValue: Readonly<ISuffixes> = {};
