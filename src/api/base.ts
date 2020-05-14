import { Environment } from '../environment';

export const callApi = async (
  method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH',
  path: string,
  body: object,
  headers?: object
) => {
  const res = await fetch(`${Environment.backendUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });

  return res.json();
};
