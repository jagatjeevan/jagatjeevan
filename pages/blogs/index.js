const path = require('path');
const fs = require('fs');

import { useState, useEffect } from 'react';
import Footer from '../../src/components/Footer';
import Header from '../../src/components/Header';
import BlogTile from '../../src/components/BlogTile';

import styles from '../../styles/blogPosts.module.scss';

const blogsSortByDate = (a, b) => {
  const aDate = new Date(a.data?.date).getTime();
  const bDate = new Date(b.data?.date).getTime();
  return (aDate - bDate) > 1 ? 1 : -1;
}

function Blogs(props) {
  const { blogs = [] } = props;
  const [sortedBlogs, setSortedBlogs] = useState(blogs);

  useEffect(() => {
    setSortedBlogs(props.blogs);
  }, [props.blogs]);

  if(!blogs.length) return "No blogs found";

  return (
    <article className="layout">
      <Header />
      <section className="app-container">
        <p className={styles.summary}>Total number of posts : {blogs.length}</p>
        <div className={styles.blogsContainer}>
          {sortedBlogs.map((blog, index) => {
            return (
              <BlogTile
                blog={blog}
                key={blog.filenames[index]}
                filename={blog.filenames[index]}
              />
            );
          })}
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
      filenames,
      content: fileContents,
    };
  });

  return {
    props: {
      blogs,
    },
  };
}
