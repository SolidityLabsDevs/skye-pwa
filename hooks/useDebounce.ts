'use client';
import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value: unknown, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState<any>();
  const timerRef = useRef<NodeJS.Timeout>(null!);

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};
