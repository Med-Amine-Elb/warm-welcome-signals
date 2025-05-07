
import { useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
}

const ScrollAnimation = ({ children }: ScrollAnimationProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Small timeout to ensure DOM is fully loaded
    const timeout = setTimeout(() => {
      // Enhanced scroll animations with more refined effects
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Add animate-in class for entering viewport
              entry.target.classList.add('animate-in');
              
              // Handle transition delay based on data attribute
              const delay = entry.target.getAttribute('data-delay');
              if (delay) {
                // Cast the target to HTMLElement to access style property
                (entry.target as HTMLElement).style.transitionDelay = `${delay}ms`;
              }
            } else {
              // Optional: Remove animation class when element leaves viewport
              // Uncomment if you want elements to re-animate when they re-enter the viewport
              // entry.target.classList.remove('animate-in');
            }
          });
        },
        { 
          threshold: 0.1,  // Trigger when at least 10% of the element is visible
          rootMargin: '0px 0px -10% 0px'  // Slightly adjust the detection area
        }
      );
      
      // Target all elements with data-scroll attribute
      const animatedElements = document.querySelectorAll('[data-scroll]');
      animatedElements.forEach(el => {
        // Reset any existing animations first to ensure clean state
        el.classList.remove('animate-in');
        
        // Start observing the element
        observerRef.current?.observe(el);
      });
      
      // Handle immediate visibility for elements already in viewport on page load
      setTimeout(() => {
        animatedElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          
          if (rect.top <= windowHeight * 0.9) {
            el.classList.add('animate-in');
          }
        });
      }, 100);
      
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
