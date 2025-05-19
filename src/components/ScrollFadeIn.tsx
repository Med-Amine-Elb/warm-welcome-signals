import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

interface ScrollFadeInProps {
  children: React.ReactNode;
  y?: number; // Amount to slide up from (default 40px)
}

const ScrollFadeIn = ({ children, y = 40 }: ScrollFadeInProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y });
    }
  }, [inView, controls, y]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={controls}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollFadeIn; 