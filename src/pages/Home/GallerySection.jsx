import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import galleryImages from '../../data/galleryImages'

const VISIBLE_COUNT = 8

export default function GallerySection() {
  const [showAll, setShowAll] = useState(false)
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })
  const [direction, setDirection] = useState(0)
  const { ref, isInView } = useScrollReveal({ once: true })
  const lightboxRef = useRef(null)

  const visibleImages = showAll ? galleryImages : galleryImages.slice(0, VISIBLE_COUNT)
  const hasMore = galleryImages.length > VISIBLE_COUNT

  const openLightbox = (index) => {
    setDirection(0)
    setLightbox({ open: true, index })
  }

  const closeLightbox = () => setLightbox((prev) => ({ ...prev, open: false }))

  const goTo = useCallback((newIndex, dir) => {
    setDirection(dir)
    setLightbox({ open: true, index: (newIndex + galleryImages.length) % galleryImages.length })
  }, [])

  const goNext = useCallback(() => {
    setLightbox((prev) => {
      const next = (prev.index + 1) % galleryImages.length
      setDirection(1)
      return { open: true, index: next }
    })
  }, [])

  const goPrev = useCallback(() => {
    setLightbox((prev) => {
      const next = (prev.index - 1 + galleryImages.length) % galleryImages.length
      setDirection(-1)
      return { open: true, index: next }
    })
  }, [])

  useEffect(() => {
    if (!lightbox.open) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox.open, goNext, goPrev])

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? '60%' : d < 0 ? '-60%' : 0, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d) => ({ x: d > 0 ? '-60%' : d < 0 ? '60%' : 0, opacity: 0, scale: 0.95 }),
  }

  const gridItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] },
    }),
  }

  return (
    <>
      <section id="gallery" className="py-24 lg:py-32 bg-bg-dark" ref={ref}>
        <div className="container-luxury">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
            <div className="shrink-0">
              <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-white/50 mb-4 whitespace-nowrap">
                Галерея
              </p>
              <h2 className="font-light text-white" style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3rem)' }}>На объектах</h2>
            </div>
            <p className="text-white/50 text-sm max-w-xs">
              {galleryImages.length} фотографий с реальных объектов
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3">
            <AnimatePresence mode="popLayout">
              {visibleImages.map((img, i) => (
                <motion.button
                  key={img.src}
                  custom={i}
                  variants={gridItemVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  layout
                  onClick={() => openLightbox(i)}
                  className="group relative aspect-[4/3] overflow-hidden bg-white/5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Show more / less */}
          {hasMore && (
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={() => setShowAll((v) => !v)}
                className="group flex items-center gap-3 px-8 py-3.5 border border-white/20 hover:border-white/60 text-white transition-colors duration-300 text-[12px] font-medium tracking-[0.2em] uppercase cursor-pointer whitespace-nowrap"
              >
                {showAll ? 'Скрыть' : `Показать все ${galleryImages.length} фото`}
                <motion.svg
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                >
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════════ LIGHTBOX ═══════════ */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer group"
              aria-label="Закрыть"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M7 7l14 14M21 7L7 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="transition-all duration-200 group-hover:stroke-[2]"/>
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute top-7 left-6 z-50 text-white/50 text-[13px] tracking-[0.2em] font-medium select-none">
              {String(lightbox.index + 1).padStart(2, '0')}<span className="mx-1.5">/</span>{String(galleryImages.length).padStart(2, '0')}
            </div>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer group"
              aria-label="Предыдущее фото"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-200 group-hover:stroke-[2.5]"/>
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer group"
              aria-label="Следующее фото"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-200 group-hover:stroke-[2.5]"/>
              </svg>
            </button>

            {/* Image */}
            <div
              className="relative z-10 w-full h-full flex items-center justify-center px-16 lg:px-24 py-20"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.img
                  key={lightbox.index}
                  src={galleryImages[lightbox.index].src}
                  alt={galleryImages[lightbox.index].alt}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="max-w-full max-h-full object-contain select-none"
                  draggable={false}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 flex gap-1.5 max-w-[90vw] overflow-x-auto py-1 px-2 lightbox-thumbstrip">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); goTo(i, i > lightbox.index ? 1 : -1) }}
                  className={`shrink-0 w-14 h-10 lg:w-16 lg:h-11 overflow-hidden transition-all duration-300 cursor-pointer ${
                    i === lightbox.index
                      ? 'opacity-100 ring-1 ring-white scale-105'
                      : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <img src={img.src} alt="" className="w-full h-full object-cover" draggable={false} />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
