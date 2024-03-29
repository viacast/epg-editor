import { useState, useEffect, useCallback } from 'react';
import { hasValue, ReactSetState } from 'utils';

// eslint-disable-next-line no-shadow
export enum LocalStorageKeys {
  CURRENT_PROGRAMS = 'current-programs',
  CURRENT_FILENAME = 'current-filename',
}

export default function useLocalStorage<DataType = unknown>(
  key: LocalStorageKeys,
  defaultValue?: DataType,
): [DataType | undefined, ReactSetState<DataType | undefined>, () => void] {
  const actualKey = `@${process.env.REACT_APP_NAME}:${key}`;

  const inLocalStorage = localStorage.getItem(actualKey);
  let actualDefault: DataType | undefined;
  try {
    actualDefault = JSON.parse(inLocalStorage || '{}').value as DataType;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Local storage error:', err);
  }
  if (!hasValue(actualDefault)) {
    actualDefault = defaultValue;
  }
  if (!hasValue(actualDefault)) {
    actualDefault = undefined;
  }
  const [value, setValue] = useState(actualDefault);
  useEffect(() => {
    localStorage.setItem(actualKey, JSON.stringify({ value }));
  }, [actualKey, value]);
  const remove = useCallback(() => {
    localStorage.removeItem(actualKey);
  }, [actualKey]);
  return [value, setValue, remove];
}
