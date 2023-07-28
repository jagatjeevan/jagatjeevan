import React, { useEffect, useState } from 'react';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';

import styles from '../styles/Home.module.scss';

const GetTalent = () => {
  const [index, setIndex] = useState(0);

  const talent = [
    'working on Frontend Development',
    'making Responsive websites',
    'photography',
    'Playing chess',
    'enhancing to Progressive Web Apps',
    'blogging',
    'travelling with friends',
    'problem solving',
    'structuring code with Micro-frontend',
    'eating almost all edibles',
  ];

  const getTalentText = () => {
    return <span className={styles.talent}>{talent[index]}</span>;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (index === talent.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
      getTalentText();
    }, 3000);
    return () => clearInterval(timer);
  }, [index]);

  return getTalentText();
};

export default function Home() {
  return (
    <article className="layout">
      <Header />
      <section className={`${styles.introContainer} app-container`}>
        <div className={styles.intro}>
          <p>Hey there!</p>
          <p>I am Jagat Jeevan.</p>
          <p>
            I love <GetTalent />
          </p>
          <p>I am currently working @ThoughtWorks, Bengaluru.</p>
          <ul className={styles.contactLinks}>
            <li>
              <a href="https://github.com/jagatjeevan" target="_blank">
                Github
              </a>
            </li>
            <li>
              <a href="mailto:kanhajeevan@gmail.com">Mail me</a>
            </li>
            <li>
              <a href="https://slides.com/kanhajeevan" target="_blank">
                Blogs in presentation mode
              </a>
            </li>
          </ul>
        </div>
        <img src="/profile.jpeg" className={styles.profileImage} />
      </section>
      <Footer />
    </article>
  );
}
