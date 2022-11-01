import path from 'path';
import { promises as fsp } from 'fs';

import React from 'react';
import Head from 'next/head';
import matter from 'gray-matter';

import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import ReactMarkdown from 'react-markdown';

import styles from '../../styles/blogPost.module.scss';
import RazorPayButton from '../../src/components/RazorPayButton';

function Blog(props) {
  const { content, data } = props;

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
            <div className={styles.tagContainer}>
              {data.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </header>
          <ReactMarkdown>{content}</ReactMarkdown>
          <RazorPayButton />
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
