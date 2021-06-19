import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';
import React, { useEffect, useMemo } from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import marked from 'marked';
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../../constants/actionTypes';
import styles from './Article.module.css';

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: ARTICLE_PAGE_UNLOADED })
});

function Article({ onLoad, onUnload, article, currentUser, match, comments, commentErrors }) {
  useEffect(() => {
    onLoad(Promise.all([
      agent.Articles.get(match.params.id),
      agent.Comments.forArticle(match.params.id)
    ]))
    return () => {
      onUnload()
    }
  }, []);
  const markup = useMemo(() => {
    if (!article) {
      return null;
    }
    return {
      __html: marked(article.body, { sanitize: true })
    };
  }, [article]);
  const canModify = useMemo(() => {
    if (!article) return false;
    return currentUser && currentUser.username === article.author.username;
  }, [currentUser, article])
  if (!article) {
    return null;
  }
  return (
    <div className={styles.articlePage}>
      <div className={styles.banner}>
        <div className="container">
          <ArticleMeta
            article={article}
            canModify={canModify} />
        </div>
      </div>
      <div className="container page">
        <h1>{article.title}</h1>
        <div className={`row ${styles.articleContent}`}>
          <div className="col-xs-12">
            <div dangerouslySetInnerHTML={markup} />
            <ul className="tag-list">
              {
                article.tagList.map(tag => {
                  return (
                    <li
                      className="tag-default tag-pill tag-outline"
                      key={tag}>
                      {tag}
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </div>

        <hr />

        <div className="row">
          <CommentContainer
            comments={comments || []}
            errors={commentErrors}
            slug={match.params.id}
            currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
