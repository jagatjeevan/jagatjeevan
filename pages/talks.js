import Header from '../src/components/Header';
import styles from '../styles/talks.module.scss';
import Link from 'next/link';
import Tags from '../src/components/Tags';

const talksList = [
  {
    link: 'https://www.youtube.com/embed/b_F91esn_nw',
    image: '/profile.jpeg',
    coPresenter: ['Ankit Luthra'],
    topic: 'Unfold UI 2022 - Cross Platform Solutions',
    tags: ['talk'],
    description:
      'With the emerging tech stacks which cater to both websites and mobile both android and ios, what are the options we have, is it production ready, should we choose cross platform solutions in our projects is all the talk about',
  },
  {
    link: 'https://www.thoughtworks.com/en-in/about-us/events/xconf/2022/India',
    image: '/profile.jpeg',
    coPresenter: ['Anshul Kabra'],
    topic: 'Divide and conquer with micro-frontends',
    tags: ['Workshop'],
    description:
      'Modern web applications tend to have complex and feature-loaded frontends. A single team building and evolving the frontend not only add bottlenecks to the delivery process but significantly slows it down as well. Micro frontend is a design paradigm that helps scale teams up to deliver complex frontends. The approach allows teams to develop multiple micro frontends in parallel and keep the domain responsibility within a bounded context. It also empowers users to transform existing legacy applications in a gradual manner by rebuilding the app in parts.',
  },
];

const ShowTalksList = ({ data }) => {
  return (
    <div className={styles.talksList}>
      <img src={data.image} alt="Picture of the author" />
      <div>
        <Link href={data.link}>{data.topic}</Link>
        <div className={styles.tagContainer}>
          <Tags data={data.tags} />
        </div>
        <p>
          Co-hosted with:
          {data.coPresenter.map((presenter) => (
            <b key={presenter}>{presenter}</b>
          ))}
        </p>

        <p>{data.description}</p>
      </div>
    </div>
  );
};

const Talks = () => {
  return (
    <article className="layout">
      <Header />
      <section className="app-container">
        {talksList.map((talk) => (
          <ShowTalksList data={talk} key={talk.topic} />
        ))}
      </section>
    </article>
  );
};

export default Talks;
