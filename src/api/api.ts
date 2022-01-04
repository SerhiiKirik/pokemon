import { BASE_URL } from './consts';

export const getData = (url: string) => (
  fetch(`${BASE_URL}/${url}`)
    .then(response => response.json())
);

export const get = (url: string) => (
  fetch(url)
    .then(response => response.json())
);
