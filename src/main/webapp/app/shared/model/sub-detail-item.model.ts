import { IReferenceIdentifier } from 'app/shared/model/reference-identifier.model';
import { IDetailItem } from 'app/shared/model/detail-item.model';

export interface ISubDetailItem {
  id?: number;
  sequence?: number | null;
  tax?: number | null;
  transportationSRCA?: string | null;
  imaging?: string | null;
  laboratory?: string | null;
  medicalDevice?: string | null;
  oralHealthIP?: string | null;
  oralHealthOP?: string | null;
  procedure?: string | null;
  services?: string | null;
  medicationCode?: string | null;
  quantity?: number | null;
  unitPrice?: number | null;
  udis?: IReferenceIdentifier[] | null;
  detailItem?: IDetailItem | null;
}

export const defaultValue: Readonly<ISubDetailItem> = {};
