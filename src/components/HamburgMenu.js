import { useState } from 'react';
import style from '../../styles/HamburgMenu.module.scss';

function HamburgMenu({ isMenuOpen, toggleMenu }) {
  const [isOpen, setIsOpen] = useState(isMenuOpen);

  return (
    <button
      type="button"
      className={`${style.navIcon} ${isOpen ? style.open : ''}`}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      onClick={() => {
        const nextIsOpen = !isOpen;
        setIsOpen(nextIsOpen);
        toggleMenu(nextIsOpen);
      }}
    >
      <span />
    </button>
  );
}

export default HamburgMenu;
