import React from 'react';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import ListPagination from '../ListPagination/ListPagination';
import styles from './ArticleList.module.css';
import { motion } from "framer-motion";
import { elementVariants, layoutVariants } from "../../animation";

const ArticleList = ({ articles, pager, articlesCount, currentPage }) => {
  if (!articles) {
    return (
      <motion.div
        className={styles.articlePreview}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={ elementVariants }
      >
        Загрузка...
      </motion.div>
    );
  }

  if (articles.length === 0) {
    return (
      <motion.div
        className={styles.articlePreview}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={ elementVariants }
      >
        Здесь пусто... пока что.
      </motion.div>
    );
  }

  return (
    <motion.div
      layout="position"
      initial="initial"
      animate="enter"
      exit="exit"
      variants={ layoutVariants }
    >
      {
        articles.map(article => {
          return (
            <motion.div
              layout="position"
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.3 }}
              variants={ elementVariants }
            >
              <ArticlePreview article={article} key={article.slug} />
            </motion.div>
          );
        })
      }

      <ListPagination
        pager={pager}
        articlesCount={articlesCount}
        currentPage={currentPage} />
    </motion.div>

  );
};

export default ArticleList;
