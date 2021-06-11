import React from 'react';
import styles from "./Tags.module.css";
import agent from '../agent';

const Tags = props => {
  const tags = props.tags;
  if (tags) {
    return (
      <div className="col-md-3">
        <div className={styles.tagsSidebar}>

          <p>Популярные теги</p>

          <div className={styles.tagsList}>
            {
              tags.map(tag => {
                const handleClick = ev => {
                  ev.preventDefault();
                  props.onClickTag(tag, page => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag));
                };

                return (
                  <a
                    href=""
                    className={styles.tagItem}
                    key={tag}
                    onClick={handleClick}>
                    {tag}
                  </a>
                );
              })
            }
          </div>

        </div>
      </div>
    );
  } else {
    return (
      <div>Загрузка тегов...</div>
    );
  }
};

export default Tags;
