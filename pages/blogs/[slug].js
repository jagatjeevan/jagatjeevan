import path from 'path';
import { promises as fsp } from 'fs';

import React from 'react';
import Head from 'next/head';
import matter from 'gray-matter';

import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import ReactMarkdown from 'react-markdown';

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
          <header>
            {data.title} : {data.date}
          </header>
          <ReactMarkdown>{content}</ReactMarkdown>
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
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export default Blog;
