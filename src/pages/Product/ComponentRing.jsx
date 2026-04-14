import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const accentColor = {
  bulldozer: '#3B6B9C',
  excavator: '#9C7B3B',
  grader: '#3B8C6E',
}

export default function ComponentRing({ product }) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const machineScale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.7, 1, 1])
  const machineOpacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1])

  const components = product.diagramComponents
  const color = accentColor[product.accentColor]

  /* Distribute components in a ring layout */
  const ringPositions = components.map((_, i) => {
    const total = components.length
    const angle = (i / total) * 2 * Math.PI - Math.PI / 2
    const radiusX = 42 // % from center
    const radiusY = 40
    return {
      left: 50 + radiusX * Math.cos(angle),
      top: 50 + radiusY * Math.sin(angle),
    }
  })

  return (
    <section ref={sectionRef} className="py-24 lg:py-36 bg-bg-alt overflow-hidden">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-4 whitespace-nowrap">
            Устройство
          </p>
          <h2 className="font-light" style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3rem)' }}>
            Схема расположения компонентов
          </h2>
        </motion.div>

        {/* Ring diagram */}
        <div className="relative w-full max-w-4xl mx-auto aspect-square">
          {/* Center machine image */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] z-[5]"
            style={{ scale: machineScale, opacity: machineOpacity }}
          >
            <img
              src={product.heroImage}
              alt={product.name}
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Components around the ring */}
          {components.map((comp, i) => {
            const pos = ringPositions[i]
            return (
              <ComponentPoint
                key={comp.id || comp.name + i}
                comp={comp}
                left={pos.left}
                top={pos.top}
                index={i}
                color={color}
              />
            )
          })}

          {/* SVG connector lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[15]">
            {components.map((comp, i) => {
              const pos = ringPositions[i]
              return (
                <motion.line
                  key={`line-${i}`}
                  x1={`${pos.left}%`}
                  y1={`${pos.top}%`}
                  x2={`${comp.x}%`}
                  y2={`${comp.y}%`}
                  stroke={color}
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                />
              )
            })}
            {/* Dots on machine */}
            {components.map((comp, i) => (
              <motion.circle
                key={`dot-${i}`}
                cx={`${comp.x}%`}
                cy={`${comp.y}%`}
                r="3"
                fill={color}
                fillOpacity="0.6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
              />
            ))}
          </svg>
        </div>
      </div>
    </section>
  )
}

function ComponentPoint({ comp, left, top, index, color }) {
  const { ref, isInView } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      className="absolute z-20 flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${left}%`, top: `${top}%` }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="w-14 h-14 lg:w-16 lg:h-16 bg-bg border border-border rounded-full flex items-center justify-center shadow-sm overflow-hidden">
        <img src={comp.image} alt={comp.name} className="w-10 h-10 lg:w-11 lg:h-11 object-contain" />
      </div>
      <span className="text-[9px] lg:text-[10px] font-medium text-text-secondary text-center max-w-[90px] leading-tight tracking-wide">
        {comp.label || comp.name}
      </span>
    </motion.div>
  )
}
