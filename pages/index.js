import Footer from "../src/components/Footer";
import Header from "../src/components/Header";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.layout}>
      <Header />
      <div>Here goes the front page</div>
      <Footer />
    </div>
  );
}
