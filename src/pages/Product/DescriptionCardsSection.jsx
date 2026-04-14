import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import SectionReveal from '../../components/ui/SectionReveal'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const accentBg = {
  bulldozer: 'bg-bulldozer',
  excavator: 'bg-excavator',
  grader: 'bg-grader',
}

/* ═══════════════════════════════════════════════════════
   Horizontal scroll: "О системе" → "Компоненты системы"
   Desktop: vertical scroll maps to horizontal slide
   Mobile: normal vertical stack
   ═══════════════════════════════════════════════════════ */
export default function DescriptionCardsSection({ product }) {
  const containerRef = useRef(null)
  const scrollProgress = useMotionValue(0)

  useEffect(() => {
    const update = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollRange = el.offsetHeight - window.innerHeight
      if (scrollRange <= 0) return
      const progress = Math.max(0, Math.min(1, -rect.top / scrollRange))
      scrollProgress.set(progress)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [scrollProgress])

  /* Horizontal translate:
     0–25%: Panel 1 stays pinned (dwell)
     25–55%: slide from Panel 1 → Panel 2
     55–100%: Panel 2 stays pinned (dwell) */
  const translateX = useTransform(scrollProgress, [0, 0.25, 0.55, 1], ['0vw', '0vw', '-100vw', '-100vw'])

  const [selected, setSelected] = useState(null)

  return (
    <>
      {/* ══════ DESKTOP — horizontal scroll ══════ */}
      <div ref={containerRef} className="hidden lg:block relative" style={{ height: '300vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            className="flex h-full"
            style={{ x: translateX }}
          >
            {/* Panel 1 — О системе */}
            <div className="w-screen h-full shrink-0 flex items-center bg-bg">
              <div className="container-luxury">
                <div className="grid grid-cols-2 gap-24 items-center">
                  <SectionReveal>
                    <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-4 whitespace-nowrap">
                      О системе
                    </p>
                    <h2 className="font-light mb-8 leading-tight" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}>
                      Инженерное совершенство в каждой детали
                    </h2>
                    <p className="text-text-secondary leading-relaxed text-base mb-8">
                      {product.description}
                    </p>
                    <div className="divider-accent" />
                  </SectionReveal>

                  <SectionReveal delay={0.2}>
                    <div className="aspect-[4/3] bg-bg-alt overflow-hidden flex items-center justify-center p-8">
                      <img
                        src={product.systemImage}
                        alt={`Система ${product.name}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </SectionReveal>
                </div>
              </div>
            </div>

            {/* Panel 2 — Компоненты системы */}
            <div className="w-screen h-full shrink-0 flex items-center bg-bg">
              <div className="container-luxury">
                <div className="mb-8">
                  <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-3 whitespace-nowrap">
                    Оборудование
                  </p>
                  <h2 className="font-light" style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.875rem)' }}>
                    Компоненты системы
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                  {product.componentCards.map((comp, i) => (
                    <CardDesktop
                      key={comp.id}
                      comp={comp}
                      index={i}
                      accent={product.accentColor}
                      onSelect={() => setSelected(comp)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════ MOBILE — normal vertical stack ══════ */}
      <section className="lg:hidden py-20 bg-bg">
        <div className="container-luxury">
          <div className="grid grid-cols-1 gap-12 items-center">
            <SectionReveal>
              <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-4 whitespace-nowrap">
                О системе
              </p>
              <h2 className="text-2xl font-light mb-6 leading-tight">
                Инженерное совершенство в каждой детали
              </h2>
              <p className="text-text-secondary leading-relaxed text-sm mb-6">
                {product.description}
              </p>
              <div className="divider-accent" />
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="aspect-[4/3] bg-bg-alt overflow-hidden flex items-center justify-center p-6">
                <img
                  src={product.systemImage}
                  alt={`Система ${product.name}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="lg:hidden py-20 pb-28 bg-bg">
        <div className="container-luxury">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-4 whitespace-nowrap">
            Оборудование
          </p>
          <h2 className="text-2xl font-light mb-10">
            Компоненты системы
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {product.componentCards.map((comp, i) => (
              <CardDesktop
                key={comp.id}
                comp={comp}
                index={i}
                accent={product.accentColor}
                onSelect={() => setSelected(comp)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal — shared between desktop & mobile */}
      <AnimatePresence>
        {selected && (
          <ComponentModal
            comp={selected}
            accent={product.accentColor}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── Card (works in both layouts) ─── */
function CardDesktop({ comp, index, accent, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="group text-left bg-bg-alt p-4 lg:p-5 cursor-pointer border border-transparent hover:border-border transition-colors duration-300"
    >
      <div className="h-36 lg:h-40 flex items-center justify-center mb-3 p-3">
        <img src={comp.image} alt={comp.name} className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-[11px] font-medium text-text-secondary group-hover:text-text transition-colors leading-tight tracking-wide">
        {comp.name}
      </p>
    </button>
  )
}

/* ─── Modal ─── */
function ComponentModal({ comp, accent, onClose }) {
  useEffect(() => {
    const html = document.documentElement
    const scrollbarWidth = window.innerWidth - html.clientWidth
    html.style.overflow = 'hidden'
    html.style.paddingRight = `${scrollbarWidth}px`
    return () => {
      html.style.overflow = ''
      html.style.paddingRight = ''
    }
  }, [])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-bg-dark/60 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative bg-bg max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-border modal-scroll"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
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
            <div className="flex-1">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-text-secondary mb-2 whitespace-nowrap">
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
