import React, { useState, useEffect, useRef } from 'react';
import './AnimatedTitle.css'; // Create this CSS file
import { motion, useAnimation } from 'framer-motion'; // Install: npm install framer-motion

const AnimatedTitle: React.FC = () => {
  const title = "ESTATE EMINENCE VENTURES";
  const [animatedTitle, setAnimatedTitle] = useState("");
  const [index, setIndex] = useState(0);
  const controls = useAnimation();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (index <= title.length) {
        setAnimatedTitle(title.substring(0, index));
        setIndex(index + 1);
      } else {
        clearInterval(intervalId);
        // Start a subtle animation after the title is fully displayed
        controls.start({
          scale: [1, 1.05, 1],
          transition: { duration: 2, repeat: Infinity, repeatType: "reverse" },
        });
      }
    }, 150); // Faster animation

    return () => clearInterval(intervalId);
  }, [index, title, controls]);

  useEffect(() => {
    if (titleRef.current) {
        const textWidth = titleRef.current.offsetWidth;
        titleRef.current.style.setProperty('--textWidth', `${textWidth}px`);
    }

  },[animatedTitle]);

  return (
    <div className="animated-title-container">
      <motion.h1
        ref={titleRef}
        className="animated-title"
        animate={controls}
      >
        {animatedTitle}
      </motion.h1>
    </div>
  );
};

export default AnimatedTitle;