import { parse } from "query-string";

export const range = (start: number, end: number): number[] => {
  return [...Array(end).keys()].map((el) => el + start);
};

export const limit: number = 10;

export const getPaginator = (search: string) => {
  const parsedSearch = parse(search);
  const currentPage: number = parsedSearch.page ? Number(parsedSearch.page) : 1;
  const offset: number = currentPage * limit - limit;
  return { currentPage, offset };
};
