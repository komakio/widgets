import { callApi } from './base';

export interface GeolocationResult {
  label: string;
  layer: string;
  longitude: number;
  latitude: number;
}

export const autoComplete = async (text: string) => {
  const res = await callApi('POST', '/v1/geocoder/autocomplete', {
    text,
    size: 5,
  });
  return res.results;
};
