import Head from 'next/head';
import Link from 'next/link';
import Footer from '../../src/components/Footer';
import Header from '../../src/components/Header';
import {
  getCourseChapters,
  getCourseOverview,
  getCourseSlugs,
} from '../../src/utils/courseContent';
import styles from '../../styles/courses.module.scss';

function Courses({ courses }) {
  return (
    <>
      <Head>
        <title>Courses | Jagat Jeevan Sahoo</title>
        <meta name="description" content="Structured courses for learning technical topics." />
      </Head>
      <article className="layout">
        <Header />
        <main className={`${styles.coursePage} app-container`}>
          <header className={styles.pageHeader}>
            <p className={styles.eyebrow}>Learn at your own pace</p>
            <h1>Courses</h1>
            <p>Guided chapters, practical examples, and notes you can keep in this browser.</p>
          </header>
          <div className={styles.courseGrid}>
            {courses.map((course) => (
              <article className={styles.courseCard} key={course.slug}>
                <p className={styles.eyebrow}>{course.level}</p>
                <h2>
                  <Link href={`/courses/${course.slug}`}>{course.title}</Link>
                </h2>
                <p>{course.description}</p>
                <p className={styles.courseMeta}>
                  {course.chapterCount} chapters
                  {course.audience ? ` · ${course.audience}` : ''}
                </p>
                <Link href={`/courses/${course.slug}`}>Explore course &gt;&gt;</Link>
              </article>
            ))}
          </div>
        </main>
        <Footer />
      </article>
    </>
  );
}

export async function getStaticProps() {
  const courses = getCourseSlugs().map((slug) => {
    const course = getCourseOverview(slug);
    return { ...course, chapterCount: getCourseChapters(slug).length };
  });

  return { props: { courses } };
}

export default Courses;
