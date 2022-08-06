import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';
import getReadTime from 'read-time';

import styles from '../../styles/blogPosts.module.scss';

function BlogTile(props) {
  const { blog = '', filename='' } = props;
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
        <div className={styles.readMore}>
          <Link href={`/blogs/${filenameWithoutExt}`}>Read more &gt;&gt;</Link>
        </div>
      </div>
    </>
  );
}

export default BlogTile;
