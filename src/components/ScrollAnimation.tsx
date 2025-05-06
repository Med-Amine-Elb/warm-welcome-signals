
import { useEffect } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
}

const ScrollAnimation = ({ children }: ScrollAnimationProps) => {
  useEffect(() => {
    // Initialize scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    
    document.querySelectorAll('[data-scroll]').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
};

export default ScrollAnimation;
