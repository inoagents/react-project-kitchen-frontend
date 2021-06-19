import ArticleActions from './ArticleActions';
import { Link } from 'react-router-dom';
import React from 'react';
import styles from './ArticleMeta.module.css';

const ArticleMeta = props => {
  const article = props.article;
  return (
    <div className={styles.articleMeta}>
      <div className={styles.articleMeta_Avatar}>
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>
      </div>
      <div className={styles.articleMeta_Info}>
        <Link to={`/@${article.author.username}`} className={styles.info_Author}>
          {article.author.username}
        </Link>
        <span className={styles.info_Date}>
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>

      <ArticleActions className={styles.articleMeta_Actions} canModify={props.canModify} article={article} />
    </div>
  );
};

export default ArticleMeta;
