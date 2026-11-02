const path = require('path');
const fs = require('fs');

import matter from 'gray-matter';
import { useMemo, useState } from 'react';
import Footer from '../../src/components/Footer';
import Header from '../../src/components/Header';
import BlogTile from '../../src/components/BlogTile';

import styles from '../../styles/blogPosts.module.scss';
import {
  sortByAlphabet,
  sortByLatestDate,
  sortByOldestDate,
  sortValues,
} from '../../src/config/sortValues';

const sortComparators = {
  [sortValues.alphabetically]: sortByAlphabet,
  [sortValues.newFirst]: sortByLatestDate,
  [sortValues.oldFirst]: sortByOldestDate,
};

function Blogs(props) {
  const { blogs = [], sortedBy } = props;
  const [sortBy, setSortBy] = useState(sortedBy);
  const sortedBlogs = useMemo(
    () => [...blogs].sort(sortComparators[sortBy]),
    [blogs, sortBy],
  );

  if (!blogs.length) return 'No blogs found';

  const containerClassName = `app-container ${styles.blogPageLayout}`;
  return (
    <article className="layout">
      <Header />
      <section className={containerClassName}>
        <p className={styles.summary}>Total number of posts : {blogs.length}</p>
        <label className={styles.selectSortType}>
          Sort By :
          <select onChange={(event) => setSortBy(event.target.value)} value={sortBy}>
            <option value={sortValues.newFirst}>Newest First</option>
            <option value={sortValues.oldFirst}>Oldest First</option>
            <option value={sortValues.alphabetically}>Alphabetically</option>
          </select>
        </label>
        <div className={styles.blogsContainer}>
          {sortedBlogs.map((blog) => (
            <BlogTile
              blog={blog}
              key={blog.filename}
              filename={blog.filename}
              createdOn={blog.createdOn}
            />
          ))}
        </div>
      </section>
      <Footer />
    </article>
  );
}

export default Blogs;

export async function getStaticProps() {
  const contentDirectory = path.join(process.cwd(), 'content');
  const filenames = fs.readdirSync(contentDirectory);

  const blogs = filenames.map((filename) => {
    const filePath = path.join(contentDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const createdOnDate = new Date(data.date);

    if (!Number.isFinite(createdOnDate.getTime())) {
      throw new Error(`Blog "${filename}" is missing a valid created-on date.`);
    }

    return {
      filename,
      content: fileContents,
      data,
      createdOn: createdOnDate.toISOString(),
    };
  });

  return {
    props: {
      blogs,
      sortedBy: sortValues.alphabetically,
    },
  };
}
