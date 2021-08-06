import { Link } from 'react-router-dom';
import styles from './ArticleMeta.module.css';
import defaultAvatar from '../../images/default-avatar.svg';

const ArticleMetaUserInfo = props => {
  return (
    <>
      <div className={styles.articleMeta_Avatar}>
        <Link to={`/@${props.username}`}>
          <img src={props.image || defaultAvatar} alt={props.username} />
        </Link>
      </div>
      <div className={styles.articleMeta_Info}>
        <Link to={`/@${props.username}`} className={`${styles.info_Author} link`}>
          {props.username}
        </Link>
        <span className={styles.info_Date}>
          {props.createdAt ? new Date(props.createdAt).toLocaleDateString(
            'ru-RU',
            { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
          ) : null}
        </span>
      </div>
    </>
  )
}

export default ArticleMetaUserInfo;
