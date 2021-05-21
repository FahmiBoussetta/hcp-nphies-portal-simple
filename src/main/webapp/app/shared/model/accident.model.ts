import dayjs from 'dayjs';
import { IAddress } from 'app/shared/model/address.model';
import { AccidentTypeEnum } from 'app/shared/model/enumerations/accident-type-enum.model';

export interface IAccident {
  id?: number;
  date?: string | null;
  type?: AccidentTypeEnum | null;
  location?: IAddress | null;
}

export const defaultValue: Readonly<IAccident> = {};
