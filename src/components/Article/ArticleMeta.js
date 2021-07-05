import ArticleActions from './ArticleActions';
import { Link } from 'react-router-dom';
import React from 'react';
import styles from './ArticleMeta.module.css';
import ArticleMetaUserInfo from './ArticleMetaUserInfo.js';

const ArticleMeta = props => {
  const article = props.article;
  return (
    <div className={styles.articleMeta}>
      <ArticleMetaUserInfo username={article.author.username} image={article.author.image} createdAt={article.createdAt} />

      <ArticleActions className={styles.articleMeta_Actions} canModify={props.canModify} article={article} />
    </div>
  );
};

export default ArticleMeta;
