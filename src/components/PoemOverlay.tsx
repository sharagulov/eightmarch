import { motion } from 'framer-motion';

interface PoemOverlayProps {
  poem: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.8,
    }
  }
};

const lineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1, ease: "easeOut" as const }
  }
};

export const PoemOverlay: React.FC<PoemOverlayProps> = ({ poem }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center text-center space-y-4 mb-8 z-10 px-4"
    >
      {poem.map((line, index) => (
        <motion.div
          key={index}
          variants={lineVariants}
          className="text-xl md:text-2xl font-medium tracking-wide"
          style={{ textShadow: '0 1px 5px rgba(0,0,0,0.4)' }}
        >
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
};
