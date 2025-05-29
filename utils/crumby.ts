export const titleizeWord = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`;
export const kebabToTitle = (str: string) => str.split('-').map(titleizeWord).join(' ');

type Item = { path: string; name: string };
type Acc = { path: ''; crumbs: Item[] };

export const toBreadcrumbs = (
  pathname: string,
  { rootName = '', nameTransform = (s: string) => s } = {}
): Item[] =>
  pathname
    .split('/')
    .filter(Boolean)
    .reduce(
      (acc: any, curr: any, idx: any, arr: any[]) => {
        acc.path += `/${curr}`;
        acc.crumbs.push({
          path: acc.path,
          name: nameTransform(curr),
        });

        if (idx === arr.length - 1) return (acc as Acc).crumbs;
        else return acc;
      },
      { path: '', crumbs: [{ path: '/', name: rootName }] }
    );
