
import { useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
}

const ScrollAnimation = ({ children }: ScrollAnimationProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Small timeout to ensure DOM is ready
    const timeout = setTimeout(() => {
      // Enhanced scroll animations with more refined effects
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
              
              // Add transition delay based on data attribute
              const delay = entry.target.getAttribute('data-delay');
              if (delay) {
                // Cast the target to HTMLElement to access style property
                (entry.target as HTMLElement).style.transitionDelay = `${delay}ms`;
              }
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
    }, 100);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearTimeout(timeout);
    };
  }, []);

  return <>{children}</>;
};

export default ScrollAnimation;
