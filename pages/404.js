import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Link from 'next/link';
import styles from '../styles/custom404.module.scss';

export default function Custom404() {
  return (
    <article className="layout">
      <Header />
      <section className="app-container">
        <h1>OOopsss !</h1>
        <p>We can't find the page you are looking for</p>
        <p>
          You could go to the <Link href="/">homepage</Link> and see other options to navigate.
        </p>
        <p>
          You could also <a href="mailto:kanhajeevan@gmail.com">Mail me</a> regarding the same
        </p>
        <div className={styles.minionContainer}>
          <img src="/minion.png" />
        </div>
      </section>
      <Footer />
    </article>
  );
}
