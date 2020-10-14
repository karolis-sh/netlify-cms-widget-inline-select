import { NAME } from '../constants';

let counter = 0;
let prefix;

export default () => {
  counter += 1;
  prefix = prefix || `${new Date().getTime()}_${Math.random()}`;
  return `${prefix}__${NAME}__${counter}`;
};
