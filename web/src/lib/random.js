import { v4 as uuidv4 } from 'uuid';

export const getRandomInt = (min, max) => {
  const _min = Math.ceil(min);
  const _max = Math.floor(max);
  return Math.floor(Math.random() * (_max - _min + 1)) + _min;
};

export const getRandomBool = () => {
  const _min = Math.ceil(0);
  const _max = Math.floor(1);
  return Math.floor(Math.random() * (_max - _min + 1)) + _min > 0;
};

export const genUUID = () => {
  return ('id' + uuidv4()).replaceAll('-', "_");
};
