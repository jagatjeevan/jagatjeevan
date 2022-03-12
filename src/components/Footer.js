import styles from '../../styles/Footer.module.css';
import ThemeSwitch from './ThemeSwitch';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        Made with <span className="hearts">&hearts;</span>
      </div>
      <ThemeSwitch />
    </footer>
  );
}

export default Footer;
