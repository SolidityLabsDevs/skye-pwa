'use client';
import { useEffect } from 'react';
import { Control, SetFieldValue, useWatch } from 'react-hook-form';
import localforage from 'localforage';

const STORAGE = {
  localStorage: typeof window === 'undefined' ? undefined : window?.localStorage,
  sessionStorage: typeof window === 'undefined' ? undefined : window?.sessionStorage,
  localForage: typeof window === 'undefined' ? undefined : localforage,
};

type FormPersistConfig = Partial<{
  storage?: keyof typeof STORAGE;
  control: Control<any>;
  setValue: SetFieldValue<any>;
  exclude?: string[];
  onDataRestored?: (data: any) => void;
  validate?: boolean;
  dirty?: boolean;
  touch?: boolean;
  onTimeout?: () => void;
  timeout?: number;
}>;

interface UseFormPersistResult {
  clear(): void;
}

export const useFormPersist = (
  name: string,
  {
    storage = 'sessionStorage',
    control,
    setValue,
    exclude = [],
    onDataRestored,
    validate = false,
    dirty = false,
    touch = false,
    onTimeout,
    timeout,
  }: FormPersistConfig
): UseFormPersistResult => {
  const watchedValues = useWatch({
    control,
  });

  const getStorage = () => STORAGE[storage] || window?.sessionStorage || window?.localStorage;

  const clearStorage = () => getStorage().removeItem(name);

  useEffect(() => {
    (async () => {
      const str = await getStorage().getItem(name);
      if (str) {
        const { _timestamp = null, ...values } =
          storage === 'localForage' ? str : JSON.parse(str as string);
        const dataRestored: { [key: string]: any } = {};
        const currTimestamp = Date.now();

        if (timeout && currTimestamp - _timestamp > timeout) {
          onTimeout && onTimeout();
          clearStorage();
          return;
        }

        Object.keys(values).forEach(key => {
          const shouldSet = !exclude.includes(key);
          if (shouldSet) {
            dataRestored[key] = values[key];
            setValue(key, values[key], {
              shouldValidate: validate,
              shouldDirty: dirty,
              shouldTouch: touch,
            });
          }
        });

        if (onDataRestored) {
          onDataRestored(dataRestored);
        }
      }
    })();
  }, [storage, name, onDataRestored, setValue]);

  useEffect(() => {
    (async () => {
      const values: Record<string, unknown> = exclude.length
        ? Object.entries(watchedValues)
          .filter(([key]) => !exclude.includes(key))
          .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {})
        : Object.assign({}, watchedValues);

      if (Object.entries(values).length) {
        if (timeout !== undefined) {
          values._timestamp = Date.now();
        }
        await getStorage().setItem(
          name,
          storage === 'localForage' ? values : (JSON.stringify(values) as any)
        );
      }
    })();
  }, [watchedValues, timeout, storage]);

  return {
    clear: async () => await getStorage().removeItem(name),
  };
};
