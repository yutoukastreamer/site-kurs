import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '../../components/ui/SectionReveal'
import AnimatedHeading from '../../components/ui/AnimatedHeading'
import newsData from '../../data/newsData'

const PLACEHOLDER_IMG = (id) => `https://picsum.photos/seed/news${id}/800/500`
const ease = [0.25, 0.1, 0.25, 1]

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

/* ─── Ticker ─── */
function NewsTicker() {
  const titles = newsData.map((n) => n.title)
  const doubled = [...titles, ...titles]

  return (
    <div className="w-full overflow-hidden bg-bg-dark py-3.5 mt-8 lg:mt-12">
      <div className="ticker-track flex whitespace-nowrap gap-16">
        {doubled.map((title, i) => (
          <span
            key={i}
            className="text-text-light/50 text-[10px] lg:text-sm font-medium tracking-[0.08em] uppercase shrink-0 flex items-center gap-16"
          >
            {title}
            <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── News Card ─── */
function NewsCard({ item, onClick }) {
  const [imgError, setImgError] = useState(false)

  return (
    <SectionReveal>
      <article
        className="group cursor-pointer bg-white border border-border/60 hover:border-border transition-all duration-500 overflow-hidden"
        onClick={() => onClick(item)}
      >
        <div className="aspect-[16/10] overflow-hidden">
          {item.video ? (
            <video
              src={item.video}
              muted
              loop
              autoPlay
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <img
              src={imgError ? PLACEHOLDER_IMG(item.id) : item.image}
              alt={item.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          )}
        </div>
        <div className="p-6 lg:p-8">
          <time className="text-[11px] font-medium tracking-[0.12em] uppercase text-text-secondary">
            {formatDate(item.date)}
          </time>
          <h3 className="mt-3 text-lg lg:text-xl font-light leading-snug tracking-tight text-text line-clamp-2">
            {item.title}
          </h3>
          <p className="mt-3 text-sm text-text-secondary leading-relaxed line-clamp-3">
            {item.preview}
          </p>
          <span className="inline-block mt-5 text-[11px] font-medium tracking-[0.14em] uppercase text-text-secondary group-hover:text-text transition-colors duration-300 whitespace-nowrap">
            Читать далее
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </span>
        </div>
      </article>
    </SectionReveal>
  )
}

/* ─── Modal / Pop-up ─── */
function NewsModal({ item, onClose }) {
  const [imgError, setImgError] = useState(false)
  const contentRef = useRef(null)

  /* Scroll lock */
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

  /* Close on Escape */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  /* Scroll content to top on open */
  useEffect(() => {
    contentRef.current?.scrollTo(0, 0)
  }, [item])

  if (!item) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
    >
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Content */}
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white overflow-hidden flex flex-col z-10"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200"
          aria-label="Закрыть"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        {/* Scrollable body */}
        <div ref={contentRef} className="overflow-y-auto flex-1">
          {/* Image */}
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={imgError ? PLACEHOLDER_IMG(item.id) : item.image}
              alt={item.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="p-6 lg:p-10">
            <time className="text-[11px] font-medium tracking-[0.12em] uppercase text-text-secondary">
              {formatDate(item.date)}
            </time>
            <h2 className="mt-4 text-2xl lg:text-3xl font-light leading-tight tracking-tight text-text">
              {item.title}
            </h2>
            <div className="mt-6 space-y-4">
              {item.fullText.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-[15px] text-text-secondary leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Page ─── */
export default function NewsPage() {
  const [selectedNews, setSelectedNews] = useState(null)

  return (
    <>
      {/* Hero section */}
      <section className="pt-32 lg:pt-40 pb-0 bg-bg">
        <div className="container-luxury">
          <AnimatedHeading
            as="h1"
            className="font-light tracking-tight text-text"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.75rem)' }}
          >
            Новости
          </AnimatedHeading>
          <SectionReveal delay={0.15}>
            <p className="mt-4 lg:mt-6 text-base lg:text-lg text-text-secondary max-w-2xl leading-relaxed">
              Актуальные события, обновления продукции и достижения компании Курс
            </p>
          </SectionReveal>
        </div>

        {/* Ticker */}
        <NewsTicker />
      </section>

      {/* News grid */}
      <section className="py-16 lg:py-24 bg-bg">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {newsData.map((item) => (
              <NewsCard key={item.id} item={item} onClick={setSelectedNews} />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedNews && (
          <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
