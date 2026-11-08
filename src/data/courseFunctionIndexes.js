import { filterFunctionCategories, numpyFunctionCategories } from './functionIndex';
import pandasFunctionCategories from './pandasFunctionIndex';
import pythonFunctionCategories from './pythonFunctionIndex';
import reactFunctionCategories from './reactFunctionIndex';

const catalogs = {
  'numpy-for-data-science': {
    title: 'NumPy',
    examplePrefix: 'import numpy as np\n',
    documentationLabel: 'NumPy documentation',
    categories: numpyFunctionCategories,
  },
  'python-fundamentals': {
    title: 'Python',
    examplePrefix: '',
    documentationLabel: 'Python documentation',
    documentationUrl: 'https://docs.python.org/3/library/functions.html',
    categories: pythonFunctionCategories,
  },
  'pandas-for-data-analysis': {
    title: 'pandas',
    examplePrefix: 'import pandas as pd\n',
    documentationLabel: 'pandas documentation',
    documentationUrl: 'https://pandas.pydata.org/docs/reference/index.html',
    categories: pandasFunctionCategories,
  },
  'react-basics-to-advanced': {
    title: 'React',
    examplePrefix: '',
    documentationLabel: 'React documentation',
    documentationUrl: 'https://react.dev/reference/react',
    categories: reactFunctionCategories,
  },
};

export function getCourseFunctionIndex(courseSlug, query = '') {
  const catalog = catalogs[courseSlug];
  if (!catalog) return null;

  const normalizedQuery = query.trim().toLowerCase();
  const categories = filterFunctionCategories(catalog.categories, normalizedQuery);

  return {
    ...catalog,
    categories: categories.map((category) => ({
      ...category,
      functions: category.functions.map((item) => ({
        ...item,
        examplePrefix: item.examplePrefix ?? catalog.examplePrefix,
        documentationLabel: catalog.documentationLabel,
        url: item.url ?? catalog.documentationUrl,
      })),
    })),
  };
}
