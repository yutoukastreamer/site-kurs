import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function RevealImage({ src, alt, className = '' }) {
  const { ref, isInView } = useScrollReveal()

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        initial={{ opacity: 0, scale: 1.15 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  )
}
