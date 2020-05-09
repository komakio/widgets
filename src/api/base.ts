import { Environment } from '../environment';

export const callApi = async (
  method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH',
  path: string,
  body: object
) => {
  const res = await fetch(`${Environment.backendUrl}/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return res.json();
};
