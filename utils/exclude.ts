export function exclude<T, Key extends keyof T>(obj: T, keys: Array<Key>): Omit<T, Key> {
  for (const key of keys) {
    delete obj[key];
  }
  return obj;
}
