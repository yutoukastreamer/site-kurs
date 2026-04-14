import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import SectionReveal from '../../components/ui/SectionReveal'

const accentBg = {
  bulldozer: 'bg-bulldozer',
  excavator: 'bg-excavator',
  grader: 'bg-grader',
}

export default function ComponentCards({ product }) {
  const [selected, setSelected] = useState(null)

  return (
    <section className="py-24 lg:py-36 bg-bg">
      <div className="container-luxury">
        <SectionReveal>
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-4">
            Оборудование
          </p>
          <h2 className="text-3xl lg:text-5xl font-light mb-16">
            Компоненты системы
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {product.componentCards.map((comp, i) => (
            <Card
              key={comp.id}
              comp={comp}
              index={i}
              accent={product.accentColor}
              onSelect={() => setSelected(comp)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ComponentModal
            comp={selected}
            accent={product.accentColor}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function Card({ comp, index, accent, onSelect }) {
  const { ref, isInView } = useScrollReveal()

  return (
    <motion.button
      ref={ref}
      onClick={onSelect}
      className="group text-left bg-bg-alt p-5 lg:p-6 cursor-pointer border border-transparent hover:border-border transition-colors duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="aspect-square flex items-center justify-center mb-4 p-4">
        <img src={comp.image} alt={comp.name} className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-[11px] font-medium text-text-secondary group-hover:text-text transition-colors leading-tight tracking-wide">
        {comp.name}
      </p>
    </motion.button>
  )
}

function ComponentModal({ comp, accent, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-bg-dark/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <motion.div
        className="relative bg-bg max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-border"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text transition-colors cursor-pointer z-10"
          aria-label="Закрыть"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>

        <div className="p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Specs table */}
            <div className="flex-1">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-text-secondary mb-2">
                Характеристики
              </p>
              <h3 className="text-xl font-light mb-6">{comp.name}</h3>

              <div className="flex flex-col">
                {comp.specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex justify-between py-3 text-sm ${
                      i < comp.specs.length - 1 ? 'border-b border-border/60' : ''
                    }`}
                  >
                    <span className="text-text-secondary">{spec.label}</span>
                    <span className="font-medium text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="sm:w-48 shrink-0 flex items-start justify-center">
              <div className="w-full aspect-square bg-bg-alt p-6 flex items-center justify-center">
                <img src={comp.image} alt={comp.name} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
