
import { useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
}

const ScrollAnimation = ({ children }: ScrollAnimationProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Enhanced scroll animations with more refined effects
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add transition delay based on data attribute
            const delay = entry.target.getAttribute('data-delay');
            if (delay) {
              // Fix: Cast the target to HTMLElement to access style property
              (entry.target as HTMLElement).style.transitionDelay = `${delay}ms`;
            }
          } else {
            // Optional: Remove animation class when element is not in view for reanimation
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
