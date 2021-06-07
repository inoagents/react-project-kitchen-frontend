import ArticleList from '../ArticleList';
import React from 'react';
import agent from '../../agent';
import styles from "./Home.module.css";
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    }

    return (
      <li className="nav-item">
        <a  href=""
            className={ props.tab === 'feed' ? `${styles.tabLink} ${styles.tabLinkActive}` : styles.tabLink }
            onClick={clickHandler}>
          Ваша лента
        </a>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <a
        href=""
        className={ props.tab === 'all' ? `${styles.tabLink} ${styles.tabLinkActive}` : styles.tabLink }
        onClick={clickHandler}>
        Лента
      </a>
    </li>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className={`${styles.tabLink} ${styles.tabLinkActive}`}>
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
  );
};

const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {
  return (
    <div className="col-md-9">
      <div className={styles.tabLinkContainer}>
        <ul className="nav nav-pills">

          <YourFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick} />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />

        </ul>
      </div>

      <ArticleList
        pager={props.pager}
        articles={props.articles}
        loading={props.loading}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
