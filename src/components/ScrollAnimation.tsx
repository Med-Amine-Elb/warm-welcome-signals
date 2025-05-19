import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollAnimationProps {
  children: React.ReactNode;
}

const ScrollAnimation = ({ children }: ScrollAnimationProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const location = useLocation();

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
              
              // Get transition delay from data attribute or inline style
              const delay = entry.target.getAttribute('data-delay') || 
                           (entry.target as HTMLElement).style.transitionDelay;
                           
              if (delay) {
                // Cast the target to HTMLElement to access style property
                (entry.target as HTMLElement).style.transitionDelay = delay;
              }
              
              // Handle large number animations (like the "01", "02" in the UJET design)
              const largeNumber = entry.target.querySelector('.text-7xl, .text-8xl, .text-9xl');
              if (largeNumber) {
                largeNumber.classList.add('animate-in');
              }
            } else {
              // Optional: remove the class when out of viewport for re-animation on scroll back
              // Uncomment if you want elements to re-animate when scrolled back into view
              // entry.target.classList.remove('animate-in');
            }
          });
        },
        { 
          threshold: 0.15,  // Trigger when at least 15% of the element is visible
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
          
          if (rect.top <= windowHeight * 0.85) {
            el.classList.add('animate-in');
          }
        });
      }, 300);
      
    }, 200);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearTimeout(timeout);
    };
  }, [location.pathname]);

  return <>{children}</>;
};

export default ScrollAnimation;
