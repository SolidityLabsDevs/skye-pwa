'use client';
import { useEffect, useRef } from 'react';

export const useEventListener = (
  eventType: keyof WindowEventMap,
  callback: (e: Event) => void,
  element = window
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!element) return;
    const handler = (e: Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
};
