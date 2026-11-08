import { useMemo, useState } from 'react';
import { getCourseFunctionIndex } from '../data/courseFunctionIndexes';
import styles from '../../styles/functionIndex.module.scss';

function FunctionCard({ item }) {
  return (
    <details className={styles.functionCard}>
      <summary>
        <span className={styles.functionCardHeading}>
          <strong>{item.name}</strong>
          <code>{item.signature}</code>
          <span>{item.description}</span>
        </span>
        <span className={styles.expandIcon} aria-hidden="true">
          +
        </span>
      </summary>
      <div className={styles.functionDetails}>
        <p>{item.details}</p>
        <div className={styles.exampleLabel}>Example</div>
        <pre>
          <code>{`${item.examplePrefix}${item.example}`}</code>
        </pre>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.documentationLabel} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </details>
  );
}

function FunctionIndex({ courseSlug }) {
  const [query, setQuery] = useState('');
  const index = useMemo(() => getCourseFunctionIndex(courseSlug, query), [courseSlug, query]);
  if (!index) return null;

  const { title, categories } = index;
  const resultCount = categories.reduce((total, category) => total + category.functions.length, 0);

  return (
    <section className={styles.functionIndex} aria-label={`Searchable ${title} function index`}>
      <div className={styles.searchPanel}>
        <label htmlFor={`${courseSlug}-function-search`}>Search this function index</label>
        <div className={styles.searchInputWrap}>
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
          <input
            id={`${courseSlug}-function-search`}
            type="search"
            placeholder="Try “reshape”, “random”, or “mean”"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
              Clear
            </button>
          )}
        </div>
        <p aria-live="polite">
          {resultCount} {resultCount === 1 ? 'result' : 'results'} in{' '}
          {categories.length} {categories.length === 1 ? 'category' : 'categories'}
        </p>
      </div>

      {categories.length > 0 && (
        <nav className={styles.categoryNavigation} aria-label="Function categories">
          {categories.map((category) => (
            <a key={category.id} href={`#${courseSlug}-functions-${category.id}`}>
              {category.title}
              <span>{category.functions.length}</span>
            </a>
          ))}
        </nav>
      )}

      {categories.length > 0 ? (
        categories.map((category) => (
          <section
            key={category.id}
            id={`${courseSlug}-functions-${category.id}`}
            className={styles.categorySection}
            aria-labelledby={`${courseSlug}-functions-${category.id}-heading`}
          >
            <div className={styles.categoryHeading}>
              <div>
                <h2 id={`${courseSlug}-functions-${category.id}-heading`}>{category.title}</h2>
                <p>{category.description}</p>
              </div>
              <span>{category.functions.length}</span>
            </div>
            <div className={styles.functionList}>
              {category.functions.map((item) => (
                <FunctionCard key={item.name} item={item} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className={styles.emptyState}>
          <h2>No functions found</h2>
          <p>Try a shorter name or search for what you want to do, such as “sort” or “random”.</p>
          <button type="button" onClick={() => setQuery('')}>
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}

export default FunctionIndex;
