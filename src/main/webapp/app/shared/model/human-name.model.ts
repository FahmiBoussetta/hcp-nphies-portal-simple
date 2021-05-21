import { IGivens } from 'app/shared/model/givens.model';
import { IPrefixes } from 'app/shared/model/prefixes.model';
import { ISuffixes } from 'app/shared/model/suffixes.model';
import { ITexts } from 'app/shared/model/texts.model';
import { IPatient } from 'app/shared/model/patient.model';
import { IPractitioner } from 'app/shared/model/practitioner.model';

export interface IHumanName {
  id?: number;
  family?: string | null;
  givens?: IGivens[] | null;
  prefixes?: IPrefixes[] | null;
  suffixes?: ISuffixes[] | null;
  texts?: ITexts[] | null;
  patient?: IPatient | null;
  practitioner?: IPractitioner | null;
}

export const defaultValue: Readonly<IHumanName> = {};
