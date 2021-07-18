import React, { useCallback } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
} from "../../constants/actionTypes";
import agent from "../../agent";

import TagList from "../TagList";

import like from "../../images/like.svg";
import unlike from "../../images/unlike.svg";

import styles from "./ArticlePreview.module.css";

const mapDispatchToProps = ( dispatch ) => ( {
  // todo переписать на одной действие - LIKE_TOGGLE
  favorite: (slug) =>
    dispatch({
      type: ARTICLE_FAVORITED,
      payload: agent.Articles.favorite(slug),
    }),
  unfavorite: (slug) =>
    dispatch({
      type: ARTICLE_UNFAVORITED,
      payload: agent.Articles.unfavorite(slug),
    }),
});

function ArticlePreview({ article, favorite, unfavorite }) {
  const likeBtnClickHandler = useCallback(
    (ev) => {
      ev.preventDefault();
      article.favorited ?
        unfavorite( article.slug ) :
        favorite( article.slug );
    },
    [article, favorite, unfavorite]
  );

  const likeBtnClassName = article.favorited ?
    `${ styles.likeBtn } ${ styles.likeBtnActive }` :
    styles.likeBtn;

  const likeBtnIconSrc = article.favorited ? unlike : like;

  return (
    <article className={styles.article}>
      <div className={styles.articleImageContainer}>
        <img
          className={ styles.articleImage }
          src={ article.image }
          alt={ article.title }
        />
      </div>
      <div className={styles.articleContent}>
        <header className={styles.articleMeta}>
          <Link to={`/@${article.author.username}`} className={styles.metaLink}>
            <img
              className={styles.userAvatar}
              src={article.author.image}
              alt={article.author.username}
              width='40'
              height='40'
            />
            <div className={styles.userInfo}>
              <div className={styles.userName}>
                {article.author.username}
              </div>
              <time
                dateTime={article.createdAt}
                className={styles.createdDate}>
                {new Date(article.createdAt).toLocaleDateString()}
              </time>
            </div>
          </Link>
          <button
            className={ likeBtnClassName }
            onClick={ likeBtnClickHandler }>
            {article.favoritesCount}
            <img
              className={styles.likeIcon}
              src={likeBtnIconSrc}
              alt=''
              aria-hidden='true' />
          </button>
        </header>
        <Link
          to={`/article/${article.slug}`}
          className={styles.body}
        >
          <h2 className={styles.title}>{article.title}</h2>
          <p className={styles.description}>{article.description}</p>
        </Link>
        <footer className={styles.footer}>
          <Link to={`/article/${article.slug}`} className={styles.readMoreLink}>
            Читать дальше
          </Link>
          <TagList
            tagList={article.tagList}
            className={styles.tagList}
            onClick={console.log}
          />
        </footer>
      </div>
    </article>
  );
}

export default connect(null, mapDispatchToProps)(ArticlePreview);
