import { useEffect, useState } from 'react';
import style from '../../styles/HamburgMenu.module.scss';

function HamburgMenu({ isMenuOpen, toggleMenu }) {
  const [isOpen, setIsOpen] = useState(isMenuOpen);
  const [klass, setKlass] = useState(`${style.navIcon}`);

  useEffect(() => {
    setKlass(isOpen ? `${style.navIcon} ${style.open}` : `${style.navIcon}`);
  }, [isOpen]);

  return (
    <div
      className={klass}
      onClick={() => {
        setIsOpen(!isOpen);
        toggleMenu(!isOpen);
      }}
    >
      <span />
    </div>
  );
}

export default HamburgMenu;
