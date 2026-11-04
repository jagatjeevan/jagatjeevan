import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';

import styles from '../styles/Home.module.scss';

const GetTalent = () => {
  const [index, setIndex] = useState(0);

  const talent = [
    'building thoughtful frontend experiences',
    'making the web more accessible',
    'exploring micro-frontends',
    'writing and sharing what I learn',
    'photography and a good game of chess',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % talent.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [talent.length]);

  return <span className={styles.talent}>{talent[index]}</span>;
};

export default function Home() {
  return (
    <article className="layout">
      <Header />
      <section className={`${styles.introContainer} app-container`}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Developer · writer · lifelong learner</p>
          <h1 className={styles.headline}>
            Hi, I’m <span>Jagat Jeevan.</span>
          </h1>
          <p className={styles.summary}>
            I enjoy <GetTalent /> <br />
            and turning ideas into clear, useful experiences on the web.
          </p>
          <p className={styles.currentRole}>
            Currently building software at <strong>Thoughtworks</strong> in Bengaluru.
          </p>
          <ul className={styles.contactLinks}>
            <li>
              <a href="mailto:kanhajeevan@gmail.com" className={styles.primaryLink}>
                Get in touch
              </a>
            </li>
            <li>
              <Link href="/blogs">Read my writing</Link>
            </li>
            <li>
              <a href="https://github.com/jagatjeevan" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.profileCard}>
          <img
            src="/profile.jpeg"
            className={styles.profileImage}
            alt="Portrait of Jagat Jeevan"
            fetchPriority="high"
          />
          <div className={styles.profileCaption}>
            <span>Curious by nature</span>
            <span>Based in Bengaluru</span>
          </div>
        </div>
      </section>
      <section className={styles.interests} aria-label="Areas of interest">
        I’m especially interested in
        <span>Frontend engineering</span>
        <span>Web accessibility</span>
        <span>Developer learning</span>
      </section>
      <Footer />
    </article>
  );
}
