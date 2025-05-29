'use client';
import { useEffect, useState } from 'react';

export function useStickyState(
  defaultValue: string | undefined,
  key: string
): [string | undefined, (v: string) => void] {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    const stickyValue = localStorage.getItem(key);
    if (stickyValue !== null) {
      setValue(stickyValue);
    } else {
      setValue(defaultValue);
      defaultValue && localStorage.setItem(key, defaultValue);
    }
  }, [key, defaultValue]);

  return [
    value,
    v => {
      localStorage.setItem(key, v);
      setValue(v);
    },
  ] as const;
}
