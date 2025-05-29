export function getUniqueListBy<T>(arr: T[], key: keyof T): T[] {
  return [
    ...new Map(
      arr.map(item => {
        return [getProperty(item, key as string), item];
      })
    ).values(),
  ];
}

function getProperty(obj: any, prop: string) {
  const parts = prop.split('.');
  if (Array.isArray(parts) && prop.includes('.')) {
    const last = parts.pop();
    const l = parts.length;
    let i = 1,
      current = parts[0];

    while ((obj = obj[current]) && i < l) {
      current = parts[i];
      i++;
    }

    if (obj) {
      return obj[last as string];
    }
  } else {
    return obj[prop];
  }
}
