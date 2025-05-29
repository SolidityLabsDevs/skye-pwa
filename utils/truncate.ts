export const truncate = (str = '', len = 10) =>
  str?.length > len ? `${str.substring(0, len)}...` : str;
