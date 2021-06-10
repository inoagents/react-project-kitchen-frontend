import React, { useCallback } from 'react';
import styles from './Tags.module.css';

function TagList({ className = '', tagList = [], onClick }) {
  const onTagClick = useCallback((ev) => {
    if (onClick) {
      ev.preventDefault();
      const target = ev.target;
      const tag = target.getAttribute('data-tag');
      onClick(tag);
    }
  }, [onClick])
  return (
    <div className={`${className} ${styles.tagsList}`}>
      {
        tagList.map(tag => {
          return (
            <i
              className={`${styles.tagItem} ${styles.tagItemInactive}`}
              data-tag={tag}
              key={tag}
              onClick={onTagClick}
            >
              {tag}
            </i>
          )
        })
      }
    </div>
  )
}

export default TagList;
