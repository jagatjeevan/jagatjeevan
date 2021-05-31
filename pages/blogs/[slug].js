import matter from 'gray-matter';

import React from 'react';
import Head from 'next/head';

import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';

function Blog(props) {
  const { content, data } = props;
  console.log(data);
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
          <section>{content}</section>
        </section>
        <Footer />
      </article>
    </>
  );
}

Blog.getInitialProps = async (context) => {
  const { slug } = context.query;

  // Import our .md file using the `slug` from the URL
  const content = await import(`../../content/${slug}.md`);

  // Parse .md data through `matter`
  const data = matter(content.default);

  // Pass data to our component props
  return { ...data };
};

export default Blog;
