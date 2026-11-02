import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import HamburgMenu from './HamburgMenu';
import styles from '../../styles/Header.module.scss';

function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();

  const getActiveLink = (name) => {
    const isActive = router.pathname === name || router.pathname.startsWith(`${name}/`);
    return isActive ? `${styles.activeLink} link` : 'link';
  };

  const getMenuClass = () => (isMenuVisible ? `${styles.open}` : `${styles.closed}`);

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
      <div className={styles.menuIcon}>
        <HamburgMenu isMenuOpen={isMenuVisible} toggleMenu={setIsMenuVisible} />
      </div>
      <nav id="navbar" aria-label="Main navigation" className={`${styles.nav} ${getMenuClass()}`}>
        <ul className={`${styles.menuItems} ${getMenuClass()}`}>
          <li className={getActiveLink('/blogs')}>
            <Link href="/blogs">Blogs</Link>
          </li>
          <li className={getActiveLink('/courses')}>
            <Link href="/courses">Courses</Link>
          </li>
          <li className={getActiveLink('/demo')}>
            <Link href="/references">Reference</Link>
          </li>
          <li>
            <Link href="/showcase">Showcase</Link>
          </li>
          <li>
            <a
              href="https://jagatjeevan-portfolio.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
