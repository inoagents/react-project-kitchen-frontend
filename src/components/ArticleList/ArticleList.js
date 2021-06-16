import React from 'react';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import ListPagination from '../ListPagination/ListPagination';
import styles from './ArticleList.module.css';

const ArticleList = ({ articles, pager, articlesCount, currentPage }) => {
  if (!articles) {
    return (
      <div className={styles.articlePreview}>Loading...</div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className={styles.articlePreview}>
        No articles are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        articles.map(article => {
          return (
            <ArticlePreview article={article} key={article.slug} />
          );
        })
      }

      <ListPagination
        pager={pager}
        articlesCount={articlesCount}
        currentPage={currentPage} />
    </div>
  );
};

export default ArticleList;
