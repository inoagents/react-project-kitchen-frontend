const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

export const layoutVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ...transition }
  }
};

export const elementVariants = {
  initial: { scale: 0.9, opacity: 0 },
  enter: { scale: 1, opacity: 1, transition },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: { duration: 1.5, ...transition }
  }
};

export const animationVariants = {
  initial: { scale: 0.9, opacity: 0 },
  enter: { scale: 1, opacity: 1, transition },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: { duration: 1.5, ...transition }
  }
};
