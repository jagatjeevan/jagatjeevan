const path = require('path');
const fs = require('fs');

import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';
import getReadTime from 'read-time';
import Footer from '../../src/components/Footer';
import Header from '../../src/components/Header';

import styles from '../../styles/blogPosts.module.scss';

function BlogSummary(props) {
  const { blog, filename } = props;
  const { data, content } = matter(blog);
  const { title, date, description } = data;
  const filenameWithoutExt = filename.split('.')[0];

  return (
    <>
      <Head>
        <title>Jagat Jeevan Sahoo's Blog Page</title>
      </Head>

      <div className={styles.blogPost}>
        <header>
          <Link href={`/blogs/${filenameWithoutExt}`}>{title}</Link>
        </header>
        <div className={styles.dateAndReadTime}>
          <div>
            Created on{' : '}
            <time dateTime={date} value={date} className={styles.createdDate}>
              {new Date(date).toDateString()}
            </time>
          </div>
          Read time around : {getReadTime(content).text}
        </div>
        <p>{description}</p>
      </div>
    </>
  );
}

function Blogs(props) {
  const { blogs } = props;
  return (
    <article className="layout">
      <Header />
      <section className="app-container">
        <p className={styles.summary}>Total number of posts : {blogs.length}</p>
        <div className={styles.blogsContainer}>
          {blogs.map((blog, index) => {
            return (
              <BlogSummary
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

export async function getStaticProps(context) {
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
