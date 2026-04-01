import { motion } from 'framer-motion';

export default function ImageSkeleton({ width = '100%', height = '300px' }) {
  return (
    <motion.div
      className="rounded-lg bg-navy-700/50 overflow-hidden"
      style={{ width, height }}
    >
      <motion.div
        className="w-full h-full bg-gradient-to-r from-navy-700 via-navy-600 to-navy-700"
        animate={{
          backgroundPosition: ['0%', '100%', '0%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'ease-in-out',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />
    </motion.div>
  );
}
