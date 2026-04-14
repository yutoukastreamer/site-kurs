import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function AnimatedHeading({ children, className = '', as: Tag = 'h2', style }) {
  const { ref, isInView } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Tag className={className} style={style}>{children}</Tag>
    </motion.div>
  )
}
