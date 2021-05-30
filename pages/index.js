import React, { useEffect, useState } from "react";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header";

import styles from "../styles/Home.module.scss";

const GetTalent = () => {
  const [index, setIndex] = useState(0);

  const talent = [
    "Frontend Development",
    "Responsive sites",
    "Progressive Web Apps",
    "Mailer",
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
            And I do <GetTalent />
          </p>
        </div>
        <img src="/profile.jpeg" className={styles.rounded} />
      </section>

      <Footer />
    </article>
  );
}
