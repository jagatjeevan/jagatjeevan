import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Link from 'next/link';
import styles from '../styles/custom404.module.scss';

export default function Custom404() {
  return (
    <article className="layout">
      <Header />
      <div className={styles.pageNotFoundContainer}>
        <section>
          <h1>OOopsss !</h1>
          <p>We can't find the page you are looking for</p>
          <p>
            You could go to the <Link href="/">homepage</Link> and see other options to navigate.
          </p>
          <p>
            You could also <a href="mailto:kanhajeevan@gmail.com">Mail me</a> regarding the same
          </p>
        </section>
        <section className={styles.imgContainer}>
          <img src="/minion.png" width={170} />
        </section>
      </div>
      <Footer />
    </article>
  );
}
