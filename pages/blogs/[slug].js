import path from 'path';
import { promises as fsp } from 'fs';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import matter from 'gray-matter';

import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import ReactMarkdown from 'react-markdown';
import RazorPayButton from '../../src/components/RazorPayButton';

import styles from '../../styles/blogPost.module.scss';
import Tags from '../../src/components/Tags';

function Blog(props) {
  const { content, data } = props;
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsPageLoaded(true), 0);
  }, []);

  const getRazorPayButton = isPageLoaded ? <RazorPayButton /> : null;

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content={data.description}></meta>
      </Head>

      <article className="layout">
        <Header />
        <section className="app-container">
          <header className={styles.headerContainer}>
            <h1 className={styles.blogHeader}>{data.title}</h1>
            <div className={styles.createdOn}>
              Created on : {new Date(data.date).toDateString()}
            </div>
            <Tags data={data.tags} />
          </header>
          <ReactMarkdown>{content}</ReactMarkdown>
          <div className="razorpay-button-container">
            <p>
              If you feel, it has helped you in learning something today and if you feel to keep me
              motivated to help the community with blogs like this, please feel free to buy me a
              coffee by clicking the button below.
            </p>
            <form id="razorpay-container">{getRazorPayButton}</form>
          </div>
        </section>
        <Footer />
      </article>
    </>
  );
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const filePath = path.join(process.cwd(), 'content', `${slug}.md`);
  const fileContent = await fsp.readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  return {
    props: {
      data,
      content,
    },
  };
}

export async function getStaticPaths() {
  const contentDirectory = path.join(process.cwd(), 'content');
  const filenames = await fsp.readdir(contentDirectory);
  const paths = filenames.map((filename) => ({ params: { slug: filename.replace('.md', '') } }));
  return {
    paths,
    fallback: false,
  };
}

export default Blog;
