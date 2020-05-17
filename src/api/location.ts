import { callApi } from './base';
import { authenticate } from './auth';

export interface GeolocationResult {
  label: string;
  layer: string;
  longitude: number;
  latitude: number;
}

export const autoComplete = async (
  text: string,
  captcha: string
): Promise<GeolocationResult[]> => {
  try {
    const authorization = await authenticate(captcha);

    const res = await callApi(
      'POST',
      '/v1/geocoder/autocomplete',
      {
        text,
        size: 5,
      },
      { authorization }
    );
    return res.results;
  } catch (e) {
    console.log(e);
  }
};
