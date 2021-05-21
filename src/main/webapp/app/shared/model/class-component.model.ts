import { ICoverage } from 'app/shared/model/coverage.model';
import { ClassTypeEnum } from 'app/shared/model/enumerations/class-type-enum.model';

export interface IClassComponent {
  id?: number;
  type?: ClassTypeEnum | null;
  value?: string | null;
  name?: string | null;
  coverage?: ICoverage | null;
}

export const defaultValue: Readonly<IClassComponent> = {};
