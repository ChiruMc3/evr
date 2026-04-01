import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
};

const noMotion = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
}) {
  const reduced = useReducedMotion();

  // Clean up will-change after animation completes
  const onComplete = useCallback((el) => {
    if (el?.style) el.style.willChange = 'auto';
  }, []);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      transition={reduced ? { duration: 0 } : { duration, delay, ease: 'easeOut' }}
      variants={reduced ? noMotion : variants[variant]}
      className={className}
      style={{ willChange: 'opacity, transform' }}
      onAnimationComplete={onComplete}
    >
      {children}
    </motion.div>
  );
}

export default memo(ScrollReveal);
