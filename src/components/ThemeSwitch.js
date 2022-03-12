import { useEffect } from 'react';
import styles from '../../styles/switch.module.scss';
import { withTheme } from '../context/themeContext';

function ThemeSwitch(props) {
  const { state: themeState, dispatch: themeDispatch } = props.themeContext;

  useEffect(() => {
    const { currentTheme } = themeState;
    const bodyElem = document.querySelector('body');
    if (currentTheme === 'dark-theme') {
      bodyElem.classList.add('dark-theme');
      bodyElem.classList.remove('light-theme');
    } else {
      bodyElem.classList.remove('dark-theme');
      bodyElem.classList.add('light-theme');
    }
  }, [themeState]);

  const changeTheme = () => {
    const themeToChange = themeState.currentTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';
    themeDispatch.updateTheme(themeToChange);
  };

  const getThemeIcon = () =>
    themeState.currentTheme === 'dark-theme' ? (
      <i className="fa-solid fa-moon"></i>
    ) : (
      <i className="fa-solid fa-sun"></i>
    );

  const getHandleKlass = () =>
    themeState.currentTheme === 'dark-theme'
      ? `${styles.handle} ${styles.nightMode}`
      : `${styles.handle} ${styles.lightMode}`;

  return (
    <>
      <div className={styles.switchContainer} onClick={changeTheme}>
        <span className={getHandleKlass()}>{getThemeIcon()}</span>
      </div>
    </>
  );
}
export default withTheme(ThemeSwitch);
