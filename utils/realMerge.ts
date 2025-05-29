import { deepCopyObject } from './deepCopyObject';

export const realMerge = function (to: Record<string, any>, from: Record<string, any>) {
  to = deepCopyObject(to);
  from = deepCopyObject(from);

  for (const n in from) {
    if (typeof to[n] != 'object') {
      to[n] = from[n];
    } else if (typeof from[n] == 'object') {
      to[n] = realMerge(to[n], from[n]);
    }
  }
  return to;
};
