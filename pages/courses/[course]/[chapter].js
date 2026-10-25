import Head from 'next/head';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Footer from '../../../src/components/Footer';
import Header from '../../../src/components/Header';
import HighlightNotes from '../../../src/components/HighlightNotes';
import {
  getCourseChapters,
  getCourseOverview,
  getCourseSlugs,
} from '../../../src/utils/courseContent';
import styles from '../../../styles/courses.module.scss';

function CourseChapter({ course, chapters, chapter }) {
  const chapterIndex = chapters.findIndex((item) => item.slug === chapter.slug);
  const previousChapter = chapters[chapterIndex - 1];
  const nextChapter = chapters[chapterIndex + 1];

  return (
    <>
      <Head>
        <title>
          {chapter.title} | {course.title}
        </title>
        <meta name="description" content={chapter.description || course.description} />
      </Head>
      <article className="layout">
        <Header />
        <main className={`${styles.coursePage} app-container`}>
          <div className={styles.chapterLinks}>
            <Link href={`/courses/${course.slug}`}>
              &larr; {course.title} course index
            </Link>
            {chapter.tryItUrl && (
              <a
                href={chapter.tryItUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Try this chapter in the ${course.sandboxName || 'online sandbox'}`}
                title={`Try this chapter in the ${course.sandboxName || 'online sandbox'}`}
              >
                <i className="fa-solid fa-code" aria-hidden="true" />
                <span>Try it</span>
                <i className="fa-solid fa-up-right-from-square" aria-hidden="true" />
              </a>
            )}
          </div>
          <header className={styles.chapterHeader}>
            <h1>{chapter.title}</h1>
            {chapter.description && <p className={styles.lead}>{chapter.description}</p>}
          </header>

          <div className={styles.chapterLayout}>
            <aside className={styles.chapterSidebar} aria-label="Course chapters">
              <h2>Course index</h2>
              <ol>
                {chapters.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/courses/${course.slug}/${item.slug}`}
                      aria-current={item.slug === chapter.slug ? 'page' : undefined}
                      className={item.slug === chapter.slug ? styles.currentChapter : undefined}
                    >
                      {item.order}. {item.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </aside>
            <div className={styles.chapterMain}>
              <HighlightNotes courseSlug={course.slug} chapterSlug={chapter.slug}>
                <ReactMarkdown>{chapter.content}</ReactMarkdown>
              </HighlightNotes>
              {chapterIndex === chapters.length - 1 && (
                <p className={styles.finalReferences}>
                  Finished the course? Visit the{' '}
                  <Link href={`/courses/${course.slug}#references`}>
                    references and further reading
                  </Link>
                  .
                </p>
              )}
              <nav className={styles.chapterNavigation} aria-label="Chapter navigation">
                {previousChapter ? (
                  <Link href={`/courses/${course.slug}/${previousChapter.slug}`}>
                    &larr; {previousChapter.title}
                  </Link>
                ) : (
                  <span />
                )}
                {nextChapter ? (
                  <Link href={`/courses/${course.slug}/${nextChapter.slug}`}>
                    {nextChapter.title} &rarr;
                  </Link>
                ) : (
                  <Link href={`/courses/${course.slug}#references`}>Course references &rarr;</Link>
                )}
              </nav>
            </div>
          </div>
        </main>
        <Footer />
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getCourseSlugs().flatMap((course) =>
    getCourseChapters(course).map((chapter) => ({
      params: { course, chapter: chapter.slug },
    })),
  );
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const chapters = getCourseChapters(params.course);
  const chapter = chapters.find((item) => item.slug === params.chapter);
  if (!chapter) return { notFound: true };

  return {
    props: {
      course: getCourseOverview(params.course),
      chapters,
      chapter,
    },
  };
}

export default CourseChapter;
