import { isNil } from 'lodash';
import type { AnyObject } from './types';

export const APP_TITLE = 'Remix-Shows';

export const getYear = (dateString: string) =>
  dateString ? new Date(dateString).getFullYear() : null;

export const createNumberArray = (max: number) => {
  const arr = [];
  for (let i = 0; i < max; i++) {
    arr.push(i + 1);
  }
  return arr;
};

export const getDateString = (date: string) => {
  if (!date) {
    return null;
  }

  return new Date(date).toLocaleDateString('en');
};

export const isOfType = <T extends AnyObject>(
  val: unknown,
  keys: Array<keyof T>,
): val is T => {
  if (isNil(val)) {
    return false;
  }

  return keys.every((key) => Object.hasOwnProperty.call(val, key));
};
