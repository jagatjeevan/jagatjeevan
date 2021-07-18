import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import HamburgMenu from './HamburgMenu';
import styles from '../../styles/Header.module.scss';

function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const height = document.querySelector('#navbar').offsetHeight;
    const windowWidth = window.innerWidth;
    if (windowWidth < 521) {
      document.querySelector('#navbar').setAttribute('style', `height: ${height}px`);
    }
  }, []);

  const getActiveLink = (name) => {
    return router.pathname === name ? `${styles.activeLink} link` : 'link';
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
      <nav id="navbar" className={`${styles.nav} ${getMenuClass()}`}>
        <ul className={`${styles.menuItems} ${getMenuClass()}`}>
          <li className={getActiveLink('/blogs')}>
            <Link href="/blogs">Blogs</Link>
          </li>
          <li className={getActiveLink('/demo')}>
            <Link href="/demo">Reference</Link>
          </li>
          <li>
            <a href="https://jagatjeevan.github.io/portfolio" target="_blank">
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
