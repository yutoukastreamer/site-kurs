import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '../../components/ui/SectionReveal'

/* ─── Акцентный цвет техники ─── */
const ACCENT_HEX = {
  bulldozer: '#3B6B9C',
  excavator: '#9C7B3B',
  grader: '#3B8C6E',
}

/* ═══════════════════════════════════════════════════════
   Horizontal scroll: "О системе" → "Компоненты системы"
   Desktop: нативный CSS Scroll Snap (overflow-x + snap-x mandatory).
            Перелистывание считает сам браузер на уровне композитора —
            плавно на любых устройствах, без JS-расчёта прогресса и без
            фейковой sticky-высоты.
   Mobile:  обычный вертикальный стек.
   ═══════════════════════════════════════════════════════ */
export default function DescriptionCardsSection({ product }) {
  const scrollRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const color = ACCENT_HEX[product.accentColor] || ACCENT_HEX.bulldozer

  /* Активный слайд вычисляем из нативного scrollLeft контейнера */
  const handleScroll = (e) => {
    const idx = Math.round(e.target.scrollLeft / window.innerWidth)
    setCurrentSlide(Math.min(1, Math.max(0, idx)))
  }

  /* Клик по точке — плавная нативная прокрутка к нужной панели */
  const goToSlide = (index) => {
    scrollRef.current?.scrollTo({
      left: index * window.innerWidth,
      behavior: 'smooth',
    })
  }

  /* ── Трансляция вертикального колёсика в горизонтальный скролл ──
     onWheel в React пассивный — preventDefault() в нём не сработает,
     поэтому вешаем wheel-листенер вручную с { passive: false }.
     Пока контейнер не упёрся в край — крутим его вбок и гасим
     вертикальную прокрутку страницы; на краю preventDefault НЕ зовём,
     и страница нативно листается дальше к соседним блокам.
     CSS Scroll Snap сам доводит контейнер до ближайшей панели. */
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleWheel = (e) => {
      const maxScroll = el.scrollWidth - el.clientWidth
      const canScrollRight = e.deltaY > 0 && el.scrollLeft < maxScroll - 1
      const canScrollLeft = e.deltaY < 0 && el.scrollLeft > 0
      if (!canScrollRight && !canScrollLeft) return // упёрлись в край

      e.preventDefault()
      el.scrollLeft += e.deltaY
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <>
      {/* ══════ DESKTOP — нативный горизонтальный скролл со snap ══════ */}
      <section className="hidden lg:block relative h-screen bg-bg">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory
                     [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Panel 1 — О системе */}
          <div className="w-screen h-full shrink-0 snap-start flex items-center bg-bg">
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
          <div className="w-screen h-full shrink-0 snap-start flex items-center bg-bg">
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
                {product.componentCards.map((comp) => (
                  <CardDesktop
                    key={comp.id}
                    comp={comp}
                    onSelect={() => setSelected(comp)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Точки-индикаторы панелей ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          {[0, 1].map((i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="p-2 cursor-pointer"
              aria-label={`Перейти к панели ${i + 1}`}
            >
              <motion.span
                className="block rounded-full"
                animate={{
                  width: currentSlide === i ? 26 : 8,
                  backgroundColor: currentSlide === i ? color : 'rgba(128,128,128,0.3)',
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ height: 8 }}
              />
            </button>
          ))}
        </div>
      </section>

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
            {product.componentCards.map((comp) => (
              <CardDesktop
                key={comp.id}
                comp={comp}
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
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── Card (works in both layouts) ─── */
function CardDesktop({ comp, onSelect }) {
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
function ComponentModal({ comp, onClose }) {
  const scrollRef = useRef(null)
  const [hasMoreBelow, setHasMoreBelow] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    const prevPadding = html.style.paddingRight
    const scrollbarWidth = window.innerWidth - html.clientWidth
    html.style.overflow = 'hidden'
    html.style.paddingRight = `${scrollbarWidth}px`
    return () => {
      html.style.overflow = prevOverflow
      html.style.paddingRight = prevPadding
    }
  }, [])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  /* Отслеживаем, есть ли скрываемые характеристики ниже текущего скролла */
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const check = () => {
      const more = el.scrollHeight - el.scrollTop - el.clientHeight > 8
      setHasMoreBelow(more)
    }
    el.scrollTop = 0
    check()
    el.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      el.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [comp])

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
        ref={scrollRef}
        className="relative bg-bg max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-border modal-scroll"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="sticky top-0 z-10 flex justify-end pointer-events-none">
          <button
            onClick={onClose}
            className="pointer-events-auto mt-2 mr-3 w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text transition-colors cursor-pointer"
            aria-label="Закрыть"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.18))' }}
            >
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="p-8 lg:p-10 -mt-12">
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

        {/* Подсказка о прокручиваемых характеристиках —
           залипает у нижней кромки модалки и исчезает,
           когда пользователь долистал до конца */}
        <div
          className={`sticky bottom-0 left-0 right-0 -mt-16 h-16 pointer-events-none z-10
                      flex items-end justify-center pb-3 transition-opacity duration-300
                      ${hasMoreBelow ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/90 to-transparent" />
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative text-text-secondary"
          >
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
              <path d="M1 1l8 7 8-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
