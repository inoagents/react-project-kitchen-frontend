import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { ADD_COMMENT } from '../../constants/actionTypes';
import styles from './CommentInput.module.css'
import ArticleMetaUserInfo from './ArticleMetaUserInfo.js';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: ADD_COMMENT, payload })
});

function CommentInput({ onSubmit, slug, currentUser }) {
  const [body, setBody] = React.useState('');
  const createComment = (ev) => {
    ev.preventDefault();
    if (body) {
      const payload = agent.Comments.create(slug, { body });
      setBody('');
      onSubmit(payload);
    }
  }
  const onChange = React.useCallback((ev) => {
    setBody(ev.target.value);
  }, [setBody])
  return (
    <form className={styles.commentInput} onSubmit={createComment}>
      <div className={styles.inputBlock}>
          <textarea className={styles.textArea}
                    placeholder="Write a comment..."
                    value={body}
                    onChange={onChange}
                    rows="3">
          </textarea>
      </div>
      <div className={styles.inputFooter}>
        <ArticleMetaUserInfo username={currentUser.username} image={currentUser.image} />
        <button
          className={`button ${styles.submitCommentButton}`}
          type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
}

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
