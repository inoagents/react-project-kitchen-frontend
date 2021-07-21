import React, { useMemo } from 'react';
import agent from '../../agent.js';
import { connect } from 'react-redux';
import { SET_PAGE } from '../../constants/actionTypes.js';
import next from '../../images/nextPage.svg';
import prev from '../../images/prevPage.svg';
import styles from './ListPagination.module.css'

const mapDispatchToProps = dispatch => ({
  onSetPage: (page, payload) =>
    dispatch({ type: SET_PAGE, page, payload })
});

function preparePagesRange (articlesCount, currentPage) {
  const range = [];
  const pageCount = Math.ceil(articlesCount / 10);
  if (pageCount < 10) {
    for (let i = 0; i < pageCount; ++i) {
      range.push(i);
    }
    return range;
  }
  if (currentPage < 4) {
    for (let i = 0; i < 7; ++i) {
      range.push(i);
    }
    range.push('next');
    range.push(pageCount - 1);
    return range;
  }
  range.push(0, 'prev');
  if (currentPage > (pageCount - 5)) {
    for (let i = pageCount - 7; i < pageCount; i++) {
      range.push(i);
    }
    return range;
  }
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    range.push(i);
  }
  range.push('next');
  range.push(pageCount - 1);
  return range;
}

const ListPagination = props => {
  if (props.articlesCount <= 10) {
    return null;
  }

  const range = useMemo(() => {
    return preparePagesRange(props.articlesCount, props.currentPage);
  }, [props.articlesCount, props.currentPage])

  const setPage = page => {
    if(props.pager) {
      props.onSetPage(page, props.pager(page));
    } else {
      props.onSetPage(page, agent.Articles.all(page))
    }
  };
  const pageItemContent = (v) => {
    if (v === 'prev') {
      return <img alt="prev" width={22} height={22} src={prev}/>;
    }
    if (v === 'next') {
      return <img alt="next" width={22} height={22} src={next}/>;
    }
    return v + 1;
  }
  return (
    <nav className={styles.nav}>
      <ul className={styles.pagination}>
        {
          range.map(v => {
            const isCurrent = v === props.currentPage;
            const onClick = ev => {
              ev.preventDefault();
              if (v === 'next') {
                setPage(props.currentPage + 1);
              } else if (v === 'prev') {
                setPage(props.currentPage - 1);
              } else {
                setPage(v);
              }
            };
            return (
              <li
                className={ isCurrent ? `${styles.pageItem} ${styles.active}` : `${styles.pageItem}` }
                onClick={onClick}
                key={v.toString()}
              >
                {pageItemContent(v)}
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ListPagination);
