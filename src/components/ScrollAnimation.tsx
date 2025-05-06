
import { useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
}

const ScrollAnimation = ({ children }: ScrollAnimationProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Initialize scroll animations with smoother transitions
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          } else {
            // Optional: Remove animation class when element is not in view
            // entry.target.classList.remove('animate-in');
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -10% 0px' 
      }
    );
    
    // Target all elements with data-scroll attribute
    document.querySelectorAll('[data-scroll]').forEach(el => {
      observerRef.current?.observe(el);
    });
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return <>{children}</>;
};

export default ScrollAnimation;
