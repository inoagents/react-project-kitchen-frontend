import { Link } from 'react-router-dom';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { DELETE_ARTICLE } from '../../constants/actionTypes';
import styles from './ArticleActions.module.css';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: DELETE_ARTICLE, payload })
});

const ArticleActions = props => {
  const article = props.article;
  const del = () => {
    props.onClickDelete(agent.Articles.del(article.slug))
  };
  if (props.canModify) {
    return (
      <span className={`${props.className} ${styles.articleActions}`}>

        <Link
          to={`/editor/${article.slug}`}
          className={`${styles.button} ${styles.buttonPrimary}`}>
          <i className="ion-edit"></i> Редактировать запись
        </Link>

        <button className={styles.button} onClick={del}>
          <i className="ion-trash-a"></i> Удалить запись
        </button>

      </span>
    );
  }

  return (
    <span className={props.className}>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ArticleActions);
