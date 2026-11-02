export const sortValues = {
  alphabetically: 'alphabetical',
  newFirst: 'newestFirst',
  oldFirst: 'oldestFirst',
};

export const sortByAlphabet = (a, b) =>
  (a.data?.title ?? a.filename ?? '').localeCompare(b.data?.title ?? b.filename ?? '', undefined, {
    sensitivity: 'base',
  });

const compareDates = (a, b) => {
  const aDate = Date.parse(a.createdOn);
  const bDate = Date.parse(b.createdOn);
  const aHasDate = Number.isFinite(aDate);
  const bHasDate = Number.isFinite(bDate);

  if (!aHasDate || !bHasDate) {
    return aHasDate === bHasDate ? 0 : aHasDate ? -1 : 1;
  }

  return aDate - bDate;
};

export const sortByLatestDate = (a, b) => compareDates(b, a);

export const sortByOldestDate = compareDates;
