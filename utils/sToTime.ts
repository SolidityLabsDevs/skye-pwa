export function sToTime(duration: number) {
  const addZero = (d: number) => (d.toString().length === 1 ? `0${d}` : d);

  const d = Math.floor(duration / 60 / 60 / 24);
  const h = Math.floor(duration / 60 / 60 - d * 24);
  const m = Math.floor(duration / 60 - d * 24 * 60 - h * 60);
  const s = Math.floor(duration - d * 24 * 60 * 60 - h * 60 * 60 - m * 60);

  return [addZero(d), addZero(h), addZero(m), addZero(s)];
}
