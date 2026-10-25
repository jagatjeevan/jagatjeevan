import Head from 'next/head';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Footer from '../../src/components/Footer';
import Header from '../../src/components/Header';
import {
  getCourseChapters,
  getCourseOverview,
  getCourseSlugs,
} from '../../src/utils/courseContent';
import styles from '../../styles/courses.module.scss';

function Course({ course, chapters }) {
  return (
    <>
      <Head>
        <title>{course.title} | Courses</title>
        <meta name="description" content={course.description} />
      </Head>
      <article className="layout">
        <Header />
        <main className={`${styles.coursePage} app-container`}>
          <Link href="/courses">
            <a className={styles.backLink}>&larr; All courses</a>
          </Link>
          <header className={styles.courseHeader}>
            <p className={styles.eyebrow}>{course.level}</p>
            <h1>{course.title}</h1>
            <p className={styles.lead}>{course.description}</p>
            {course.audience && <p className={styles.courseMeta}>For {course.audience}</p>}
          </header>

          <section className={styles.learningSection}>
            <h2>{course.outcomesHeading || 'What you will learn'}</h2>
            <ul>
              {course.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </section>
          <div className={styles.twoColumn}>
            <section className={styles.learningSection}>
              <h2>{course.useCasesHeading || 'Where to use this'}</h2>
              <ul>
                {course.useCases.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section className={styles.learningSection}>
              <h2>{course.avoidCasesHeading || 'When this may not be the right choice'}</h2>
              <ul>
                {course.avoidCases.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className={styles.courseDescription}>
            <ReactMarkdown>{course.content}</ReactMarkdown>
          </section>

          <section className={styles.chapterIndex}>
            <h2>{course.chaptersHeading || 'Course chapters'}</h2>
            <ol>
              {chapters.map((chapter) => (
                <li key={chapter.slug}>
                  <span className={styles.chapterNumber}>
                    {String(chapter.order).padStart(2, '0')}
                  </span>
                  <span className={styles.chapterDetails}>
                    <Link href={`/courses/${course.slug}/${chapter.slug}`}>
                      <a>{chapter.title}</a>
                    </Link>
                    {chapter.description && <small>{chapter.description}</small>}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.references} id="references">
            <h2>{course.referencesHeading || 'References and further reading'}</h2>
            <ul>
              {course.references.map((reference) => (
                <li key={reference.url}>
                  <a href={reference.url} target="_blank" rel="noopener noreferrer">
                    {reference.title}
                  </a>
                  {reference.description && <span> — {reference.description}</span>}
                </li>
              ))}
            </ul>
          </section>
        </main>
        <Footer />
      </article>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: getCourseSlugs().map((course) => ({ params: { course } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      course: getCourseOverview(params.course),
      chapters: getCourseChapters(params.course).map(({ content, ...chapter }) => chapter),
    },
  };
}

export default Course;
