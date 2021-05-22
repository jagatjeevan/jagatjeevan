import React from "react";
import matter from "gray-matter";

function PostTemplate(props) {
  const { content, data } = props;
  return (
    <article>
      <header>
        {data.title} : {data.date}
      </header>
      <section>{content}</section>
    </article>
  );
}

PostTemplate.getInitialProps = async (context) => {
  const { slug } = context.query;

  // Import our .md file using the `slug` from the URL
  const content = await import(`../../content/${slug}.md`);

  // Parse .md data through `matter`
  const data = matter(content.default);

  // Pass data to our component props
  return { ...data };

  return { slug };
};

export default PostTemplate;
