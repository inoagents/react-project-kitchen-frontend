import DeleteButton from './DeleteButton';
import React from 'react';
import styles from './Comment.module.css';
import ArticleMetaUserInfo from './ArticleMetaUserInfo.js';

const Comment = props => {
  const comment = props.comment;
  const show = props.currentUser &&
    props.currentUser.username === comment.author.username;
  return (
    <div className={styles.comment}>
      <div className={styles.commentBlock}>
        <p className={styles.commentText}>{comment.body}</p>
      </div>
      <div className={`${styles.commentFooter} flex_row`}>
        <ArticleMetaUserInfo username={comment.author.username} image={comment.author.image} createdAt={comment.createdAt} />

        <div className={styles.commentActions}>
          <DeleteButton show={show} slug={props.slug} commentId={comment.id} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
