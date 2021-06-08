import React from 'react';
import styles from "./Home.module.css";

const Banner = ({ appName, appTagline }) => {
  return (
    <div className={styles.bannerContainer}>
      <div className="container">
        <h1 className={styles.bannerHeading}>
          {appName}
        </h1>
        <p className={styles.bannerSubheading}>
          {appTagline}
        </p>
      </div>
    </div>
  );
};

export default Banner;
