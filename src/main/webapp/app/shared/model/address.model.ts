export interface IAddress {
  id?: number;
  addressLine?: string | null;
  city?: string | null;
  district?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
}

export const defaultValue: Readonly<IAddress> = {};
