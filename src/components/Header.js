import Link from "next/link";

import styles from "../../styles/Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoName}>Jeevan</span>
        <span className={styles.tagline}>Journey of learning</span>
      </div>
      <nav>
        <ul className={styles.menuItems}>
          <li>
            <Link href="/blogs/jagat">Blogs</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
