const path = require('path');
const fs = require('fs');

import { useState } from 'react';
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

function Blogs(props) {
  const { blogs = [], sortedBy } = props;
  const [sortedBlogs, setSortedBlogs] = useState(blogs);
  const [sortBy, setSortBy] = useState(sortedBy);

  const handleSort = (e) => {
    setSortBy(e.target.value);
    if (e.target.value === sortValues.alphabetically) {
      setSortedBlogs(sortedBlogs.sort(sortByAlphabet));
    }

    if (e.target.value === sortValues.newFirst) {
      setSortedBlogs(sortedBlogs.sort(sortByLatestDate));
    }

    if (e.target.value === sortValues.oldFirst) {
      setSortedBlogs(sortedBlogs.sort(sortByOldestDate));
    }
  };

  if (!blogs.length) return 'No blogs found';

  const containerClassName = `app-container ${styles.blogPageLayout}`;
  return (
    <article className="layout">
      <Header />
      <section className={containerClassName}>
        <p className={styles.summary}>Total number of posts : {blogs.length}</p>
        <label className={styles.selectSortType}>
          Sort By :
          <select onChange={handleSort} value={sortBy}>
            <option value={sortValues.newFirst}>Newest First</option>
            <option value={sortValues.oldFirst}>Old First</option>
            <option value={sortValues.alphabetically}>Alphabetically</option>
          </select>
        </label>
        <div className={styles.blogsContainer}>
          {sortedBlogs.map((blog) => (
            <BlogTile blog={blog} key={blog.filename} filename={blog.filename} />
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
    return {
      filename,
      content: fileContents,
    };
  });

  return {
    props: {
      blogs,
      sortedBy: sortValues.alphabetically,
    },
  };
}
