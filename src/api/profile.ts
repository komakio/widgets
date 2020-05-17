import { callApi } from './base';
import { authenticate } from './auth';

interface Location {
  type: 'Point';
  coordinates: [number, number];
}
export interface Address {
  raw: string;
  extra?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  location: Location;
}

interface Phone {
  dialCode?: string;
  number: string;
}

export interface ProfileRequestCreation {
  _id?: string;
  firstName: string;
  lastName: string;
  address: Address;
  phone: Phone;
  email: string;
}

export const createRequest = async (
  profile: ProfileRequestCreation,
  captcha: string
) => {
  const authorization = await authenticate(captcha);
  return callApi('POST', '/v1/requests/webform', profile, { authorization });
};
