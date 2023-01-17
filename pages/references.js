import Link from 'next/link';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import style from '../styles/demo.module.scss';

const Demo = () => {
  return (
    <article className="layout">
      <Header />
      <section className={`${style.linksContainer} app-container`}>
        <div className={style.sectionHeader}>CSS</div>
        <div className={style.labelDescription}>Understanding the basic concept of CSS Grid</div>
        <div className={style.link}>
          <a href="https://github.com/jagatjeevan/css-grid" target="_blank">
            Css Grid
          </a>
        </div>
        <div className={style.sectionHeader}>JavaScript</div>
        <div className={style.labelDescription}>Algorithm problems</div>
        <div className={style.link}>
          <a href="https://github.com/jagatjeevan/problems" target="_blank">
            Programming in JS
          </a>
        </div>
        <div className={style.labelDescription}>Loadash functions</div>
        <div className={style.link}>
          <a href="https://github.com/jagatjeevan/loadash-challenges" target="_blank">
            array functions
          </a>
        </div>

        <div className={style.labelDescription}>A basic indexdb sample</div>
        <div className={style.link}>
          <a href="https://github.com/jagatjeevan/indexDBSpike" target="_blank">
            IndexDB
          </a>
        </div>

        <div className={style.sectionHeader}>React and NextJs</div>
        <div className={style.labelDescription}>Virtualization implemented in React</div>
        <div className={style.link}>
          <a href="https://github.com/jagatjeevan/virtualization" target="_blank">
            Virtualization in React
          </a>
        </div>
        <div className={style.labelDescription}>React Context API</div>
        <div className={style.link}>
          <a href="https://github.com/jagatjeevan/context-reducer-react" target="_blank">
            React Context &amp; Reducer
          </a>
        </div>

        <div className={style.sectionHeader}>GraphQL</div>
        <div className={style.labelDescription}>NextJs and GraphQL</div>
        <div className={style.link}>
          <a href="https://next-apollo-jagatjeevan.vercel.app/" target="_blank">
            GraphQL in NextJs setup
          </a>
        </div>
        <div className={style.sectionHeader}>Progressive Web Apps</div>
        <div className={style.labelDescription}>Service Workers</div>
        <div className={style.link}>
          <a href="https://github.com/Progressive-Web-App-Components/serviceWorker" target="_blank">
            sample service worker
          </a>
        </div>

        <div className={style.sectionHeader}>Others</div>
        <div className={style.labelDescription}>Customize a Google form</div>
        <div className={style.link}>
          <a href="https://github.com/jagatjeevan/googleForm" target="_blank">
            Google form
          </a>
        </div>
      </section>
      <Footer />
    </article>
  );
};

export default Demo;
