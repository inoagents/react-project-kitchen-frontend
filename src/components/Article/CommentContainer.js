import CommentInput from './CommentInput';
import CommentList from './CommentList';
import { Link } from 'react-router-dom';
import React from 'react';
import styles from './CommentContainer.module.css';

const CommentContainer = props => {
  if (props.currentUser) {
    return (
      <div className={`flex_column ${styles.commentContainer}`}>
        <div className={styles.commentContainerItem}>
          <list-errors errors={props.errors}></list-errors>
          <CommentInput slug={props.slug} currentUser={props.currentUser} />
        </div>

        <CommentList
          className={styles.commentContainerItem}
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser} />
      </div>
    );
  } else {
    return (
      <div className={`flex_column ${styles.commentContainer}`}>
        <p className={styles.commentContainerItem}>
          <Link to="/login" className="link">Sign in</Link>
          &nbsp;or&nbsp;
          <Link to="/register" className="link">sign up</Link>
          &nbsp;to add comments on this article.
        </p>

        <CommentList
          className={styles.commentContainerItem}
          comments={props.comments}
          slug={props.slug} />
      </div>
    );
  }
};

export default CommentContainer;
