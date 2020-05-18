import { callApi } from './base';

export class LoginResult {
  public accessToken: { token: string; expiration: number };
}

export const authenticate = async (captcha) => {
  const authorization = getCached();

  if (authorization) {
    return authorization;
  }

  const res = await callApi('POST', '/v1/users/captcha', { captcha });
  setCached(`Bearer ${res.accessToken.token}`, res.accessToken.expiration);
  return `Bearer ${res.accessToken.token}`;
};

const getCached = () => {
  const authorization = localStorage.getItem('authorization');
  const expiration = localStorage.getItem('expiration');

  if (authorization && expiration && Date.now() <= Number(expiration)) {
    return authorization;
  }

  localStorage.removeItem('authorization');
  localStorage.removeItem('expiration');
};

const setCached = (authorization: string, expiration: number) => {
  localStorage.setItem('authorization', authorization);
  localStorage.setItem('expiration', (Date.now() + expiration).toString());
};
