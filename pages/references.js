import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import style from '../styles/demo.module.scss';

const config = {
  html: {
    header: { name: 'CSS' },
    body: [
      {
        id: 1,
        description: 'Understanding the basic concept of CSS Grid',
        link: 'https://github.com/jagatjeevan/css-grid',
        label: 'Css Grid',
      },
    ],
  },
  js: {
    header: { name: 'JavaScript' },
    body: [
      {
        id: 1,
        description: 'Algorithm problems',
        link: 'https://github.com/jagatjeevan/problems',
        label: 'Programming in JS',
      },
      {
        id: 2,
        description: 'Loadash functions',
        link: 'https://github.com/jagatjeevan/loadash-challenges',
        label: 'array functions',
      },
      {
        id: 3,
        description: 'A basic indexdb sample',
        link: 'https://github.com/jagatjeevan/indexDBSpike',
        label: 'IndexDB',
      },
    ],
  },
  reactNext: {
    header: { name: 'React And Next Js' },
    body: [
      {
        id: 1,
        description: 'Virtualization implemented in React',
        link: 'https://github.com/jagatjeevan/virtualization',
        label: 'Virtualization in React',
      },
      {
        id: 2,
        description: 'React Context API',
        link: 'https://github.com/jagatjeevan/context-reducer-react',
        label: 'React Context & Reducer',
      },
    ],
  },
  graphQl: {
    header: { name: 'GraphQl' },
    body: [
      {
        id: 1,
        description: 'NextJs and GraphQL',
        link: 'https://next-apollo-jagatjeevan.vercel.app/',
        label: 'GraphQL in NextJs setup',
      },
    ],
  },
  progressiveWebApp: {
    header: { name: 'Progressive Web Apps' },
    body: [
      {
        id: 1,
        description: 'Service Workers',
        link: 'https://github.com/Progressive-Web-App-Components/serviceWorker',
        label: 'Sample service worker',
      },
    ],
  },
  others: {
    header: { name: 'Others' },
    body: [
      {
        id: 1,
        description: 'Customize a Google form / Google Scripts',
        link: 'https://github.com/jagatjeevan/googleForm',
        label: 'Customised Google Form',
      },
    ],
  },
};

const SectionHeader = ({ name }) => {
  return <div className={style.sectionHeader}>{name}</div>;
};

const SectionBody = ({ description, link, label }) => {
  return (
    <>
      <div className={style.labelDescription}>{description}</div>
      <div className={style.link}>
        <a href={link} target="_blank">
          {label}
        </a>
      </div>
    </>
  );
};

const GetSectionBody = ({ data }) => {
  return data.map((datum) => (
    <SectionBody
      key={datum.id}
      description={datum.description}
      link={datum.link}
      label={datum.label}
    />
  ));
};

const GetSections = () => {
  const keys = Object.keys(config);
  return keys.map((key) => (
    <>
      <SectionHeader key={config[key].header.name} name={config[key].header.name} />

      <GetSectionBody data={config[key].body} />
    </>
  ));
};

const References = () => {
  return (
    <article className="layout">
      <Header />
      <section className={`${style.linksContainer} app-container`}>
        <GetSections />
      </section>
      <Footer />
    </article>
  );
};

export default References;
