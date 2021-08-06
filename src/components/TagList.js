import React, { useCallback } from 'react';
import styles from './Tags.module.css';
import { motion } from "framer-motion";
import { animationVariants} from "../animation";

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
    <motion.div
      className={`${className} ${styles.tagsList}`}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={ animationVariants }
    >
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
    </motion.div>
  )
}

export default TagList;
