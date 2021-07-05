import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { DELETE_COMMENT } from '../../constants/actionTypes';
import deleteButton from '../../images/delete.svg';
import styles from './DeleteButton.module.css';

const mapDispatchToProps = dispatch => ({
  onClick: (payload, commentId) =>
    dispatch({ type: DELETE_COMMENT, payload, commentId })
});

const DeleteButton = props => {
  const del = () => {
    const payload = agent.Comments.delete(props.slug, props.commentId);
    props.onClick(payload, props.commentId);
  };

  if (props.show) {
    return (
      <span className={styles.deleteButton}>
        <img width={24} height={24} src={deleteButton} onClick={del} alt="Delete comment"/>
      </span>
    );
  }
  return null;
};

export default connect(() => ({}), mapDispatchToProps)(DeleteButton);
