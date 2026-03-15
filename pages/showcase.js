import Image from 'next/image';
import Link from 'next/link';
import Header from '../src/components/Header';
import Tags from '../src/components/Tags';

import talkStyles from '../styles/talks.module.scss';

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
    <div className={talkStyles.talksList}>
      <img src={data.image} alt="Picture of the author" />
      <div>
        <Link href={data.link}>{data.topic}</Link>
        <div className={talkStyles.tagContainer}>
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

const projectShowcase = [
  {
    title: 'Sankalp - Goal Planner',
    description:
      'A focused goal-oriented Todo app with deadline tracking, completion logging, and habit-style visuals. It helps set, track, and achieve your most important goals with one-pointed focus.',
    link: 'https://sankalp-woad.vercel.app/',
    image: '/sankalp-app.png',
    tags: ['Next.js', 'productivity', 'PWA'],
  },
  {
    title: 'A GoogleForm for a quick survey',
    description:
      "A custom Google Form for a client who wanted a low budget solution for a quick survey for their product samples to be given away. This form would collect the customers' address and phone number in response collection.",
    link: 'https://github.com/jagatjeevan/googleForm',
    image: '/googleform.gif',
    tags: ['Forms', 'Google Scripts'],
  },
  {
    title: 'Stock Animation',
    description:
      'An engaging stock-market animation demo with real-time style chart movement and data-driven visual effect, built for browser rendering and interaction.',
    link: 'https://jagatjeevan.github.io/stock-animation/',
    image: '/stock-bull.gif',
    tags: ['CSS', 'Animation', 'Finance'],
  },
];

const ProjectCard = ({ project }) => (
  <div className={talkStyles.talksList}>
    <a href={project.link} target="_blank" rel="noreferrer noopener">
      <Image src={project.image} alt={`${project.title} screenshot`} width={100} height={100} />
    </a>
    <div>
      <h3 className={talkStyles.projectTitle}>
        <Link href={project.link} passHref>
          <Link target="_blank" rel="noreferrer noopener">
            {project.title}
          </Link>
        </Link>
      </h3>
      <div className={talkStyles.tagContainer}>
        <Tags data={project.tags} />
      </div>
      <p>{project.description}</p>
    </div>
  </div>
);

const Showcase = () => {
  return (
    <article className="layout">
      <Header />
      <section className="app-container">
        <h2 className={talkStyles.heading}>Talks and Workshops</h2>
        {talksList.map((talk) => (
          <ShowTalksList data={talk} key={talk.topic} />
        ))}
        <h2 className={talkStyles.projectShowcaseHeading}>Project Showcase</h2>
        {projectShowcase.map((project) => (
          <ProjectCard project={project} key={project.title} />
        ))}
      </section>
    </article>
  );
};

export default Showcase;
