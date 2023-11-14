export const sortValues = {
  alphabetically: 'alphabetical',
  newFirst: 'newestFirst',
  oldFirst: 'oldestFirst',
};

export const sortByAlphabet = (a, b) => (a - b > 1 ? -1 : 1);

export const sortByLatestDate = (a, b) => {
  const aDate = new Date(a.data?.date).getTime();
  const bDate = new Date(b.data?.date).getTime();
  return aDate - bDate > 1 ? -1 : 1;
};

export const sortByOldestDate = (a, b) => {
  const aDate = new Date(a.data?.date).getTime();
  const bDate = new Date(b.data?.date).getTime();
  return aDate - bDate > 1 ? 1 : -1;
};
