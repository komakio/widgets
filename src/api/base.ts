import { Environment } from '../environment';
import axios from 'axios';

export const callApi = async (
  method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH',
  path: string,
  body: object
) => {
  console.log({ method, path, body });

  const res = await axios.post(`${Environment.backendUrl}${path}`, body);
  return res.data;
  // const res = await fetch(`${Environment.backendUrl}${path}`, {
  //   method,
  //   mode: 'no-cors',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(body),
  // });

  // return res.json();
};
