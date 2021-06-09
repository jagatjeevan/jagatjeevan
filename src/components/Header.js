import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from '../../styles/Header.module.scss';

function Header() {
  const router = useRouter();

  const getActiveLink = (name) => {
    return router.pathname === name ? `${styles.activeLink} link` : 'link';
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoName}>
          <Link href="/">Jeevan</Link>
        </span>
        <span className={`${styles.tagline}`}>
          <Link href="/">Journey of learning</Link>
        </span>
      </div>
      <nav>
        <ul className={styles.menuItems}>
          <li className={getActiveLink('/blogs')}>
            <Link href="/blogs">Blogs</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
