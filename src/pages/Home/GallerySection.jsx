import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'

import gallery1 from '../../assets/images/gallery/gallery-1.JPG'
import gallery2 from '../../assets/images/gallery/gallery-2.JPG'
import gallery3 from '../../assets/images/gallery/gallery-3.JPG'
import gallery4 from '../../assets/images/gallery/gallery-4.JPG'
import gallery5 from '../../assets/images/gallery/gallery-5.JPG'
import gallery6 from '../../assets/images/gallery/gallery-6.JPG'

const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6]

export default function GallerySection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const { ref, isInView } = useScrollReveal()

  const paginate = useCallback((dir) => {
    setDirection(dir)
    setCurrent((prev) => (prev + dir + images.length) % images.length)
  }, [])

  /* Autoplay */
  useEffect(() => {
    if (!isInView) return
    const timer = setInterval(() => paginate(1), 5000)
    return () => clearInterval(timer)
  }, [isInView, paginate])

  const variants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <section id="gallery" className="py-24 lg:py-36 bg-bg" ref={ref}>
      <div className="container-luxury">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-4">
              Галерея
            </p>
            <h2 className="text-3xl lg:text-5xl font-light">
              На объектах
            </h2>
          </div>
          {/* Nav arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => paginate(-1)}
              className="w-12 h-12 border border-border flex items-center justify-center hover:border-text transition-colors cursor-pointer"
              aria-label="Назад"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.2"/></svg>
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-12 h-12 border border-border flex items-center justify-center hover:border-text transition-colors cursor-pointer"
              aria-label="Вперёд"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2"/></svg>
            </button>
          </div>
        </div>

        {/* Main image */}
        <div className="relative aspect-[16/9] lg:aspect-[21/9] bg-bg-alt overflow-hidden mb-6">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={current}
              src={images[current]}
              alt={`Галерея ${current + 1}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Counter */}
          <div className="absolute bottom-6 right-6 z-10 text-white/60 text-[12px] tracking-[0.2em] font-medium">
            {String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-6 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              className={`aspect-[4/3] overflow-hidden cursor-pointer transition-opacity duration-300 ${
                i === current ? 'opacity-100 ring-1 ring-text' : 'opacity-40 hover:opacity-70'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
