import React, { useCallback } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../../constants/actionTypes';
import TagList from '../TagList';
import like from '../../images/like.svg';
import unlike from '../../images/unlike.svg';
import styles from './ArticlePreview.module.css'

const FAVORITED_CLASS = `${styles.Button} ${styles.ButtonLiked}`;
const NOT_FAVORITED_CLASS = styles.Button;

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: ARTICLE_FAVORITED,
    payload: agent.Articles.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: agent.Articles.unfavorite(slug)
  })
});

function ArticlePreview({ article, favorite, unfavorite }) {
  const favoriteButtonClass = article.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS;
  const likeImage = article.favorited ? unlike : like;
  const handleClick = useCallback((ev) => {
    ev.preventDefault();
    if (article.favorited) {
      unfavorite(article.slug);
    } else {
      favorite(article.slug);
    }
  }, [article, favorite, unfavorite]);
  return (
    <div className={styles.Article}>
      <div className={styles.ArticlePhoto}>

      </div>
      <div className={styles.ArticleContent}>
        <div className={styles.ArticleMeta}>
          <div className={styles.ArticleMeta_Avatar}>
            <Link to={`/@${article.author.username}`}>
              <img src={article.author.image} alt={article.author.username} />
            </Link>
          </div>
          <div className={styles.ArticleMeta_UserInfo}>
            <div className={styles.UserInfo_Name}>
              {article.author.username}
            </div>
            <div className={styles.UserInfo_Date}>
              {new Date(article.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className={styles.ArticleMeta_Button}>
            <button className={favoriteButtonClass} onClick={handleClick}>
              <i>
                <img src={likeImage} />
              </i> {article.favoritesCount}
            </button>
          </div>
        </div>
        <div className={styles.ArticleContent_Content}>
          <Link to={`/article/${article.slug}`} className={styles.ArticleContent_Preview}>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
          </Link>
          <div className={styles.ReadMoreAndTags}>
            <Link to={`/article/${article.slug}`} className={styles.ReadMore_Link}>
              <span className={styles.ReadMore}>Читать дальше</span>
            </Link>
            <TagList tagList={article.tagList} className={styles.TagList} onClick={console.log}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);

