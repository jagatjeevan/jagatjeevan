import styles from '../../styles/Tags.module.scss';

const Tags = ({ data }) => (
  <div className={styles.tagContainer}>
    {data.map((tag) => (
      <span key={tag}>{tag}</span>
    ))}
  </div>
);

export default Tags;
