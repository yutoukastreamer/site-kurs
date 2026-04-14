import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, AnimatePresence } from 'framer-motion'
import kursVideo from '../../assets/videos/kurs-video.mp4'

/* ─── Accent color map by product ─── */
const ACCENT_COLORS = {
  bulldozer: '#3B6B9C',
  excavator: '#9C7B3B',
  grader:    '#3B8C6E',
}

/* ─── Time formatter mm:ss ─── */
function fmt(sec) {
  if (!sec || !isFinite(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const EASE = [0.25, 0.1, 0.25, 1]

export default function VideoSection({ product }) {
  const accentColor = ACCENT_COLORS[product.accentColor] || '#111318'
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const update = () => setIsMobile(mq.matches)
    update()
    if (mq.addEventListener) mq.addEventListener('change', update)
    else mq.addListener(update)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update)
      else mq.removeListener(update)
    }
  }, [])

  return isMobile
    ? <MobileVideo product={product} accentColor={accentColor} />
    : <DesktopVideo product={product} accentColor={accentColor} />
}

/* ════════════════════════════════════════════════════════════════════
   DESKTOP — scroll-driven zoom, texts visible.
   Play click → fullscreen fixed overlay with custom controls.
   Section animation stays untouched underneath.
   ════════════════════════════════════════════════════════════════════ */
function DesktopVideo({ product, accentColor }) {
  const sectionRef      = useRef(null)
  const videoRef        = useRef(null)
  const overlayVideoRef = useRef(null)

  const [overlayOpen, setOverlayOpen] = useState(false)
  const [isPaused,    setIsPaused]    = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration,    setDuration]    = useState(0)

  /* Motion values driven by scroll only */
  const scaleMV  = useMotionValue(0.55)
  const borderMV = useMotionValue(24)

  /* ── Scroll listener: zoom 0.55→1 over first 60% of progress, hold at 1 ── */
  useEffect(() => {
    const update = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollRange = el.offsetHeight - window.innerHeight
      if (scrollRange <= 0) return
      const p = Math.max(0, Math.min(1, -rect.top / scrollRange))
      const zp = Math.min(p / 0.6, 1)
      scaleMV.set(0.55 + 0.45 * zp)
      borderMV.set(24 * (1 - zp))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [scaleMV, borderMV])

  /* ── Lock body scroll when overlay is open ── */
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [overlayOpen])

  const videoSrc = product.video || kursVideo

  /* ─── Open overlay player ─── */
  const handleWatch = useCallback(() => {
    setOverlayOpen(true)
    setIsPaused(false)
    setCurrentTime(0)
  }, [])

  /* ─── Close overlay player ─── */
  const handleClose = useCallback(() => {
    const v = overlayVideoRef.current
    if (v) { v.pause(); v.muted = true }
    setOverlayOpen(false)
    setIsPaused(false)
  }, [])

  /* ─── Overlay controls ─── */
  const handleTogglePause = useCallback(() => {
    const v = overlayVideoRef.current
    if (!v) return
    if (v.paused) {
      v.play().catch(() => {})
      setIsPaused(false)
    } else {
      v.pause()
      setIsPaused(true)
    }
  }, [])

  const handleVideoEnd = useCallback(() => {
    setOverlayOpen(false)
    setIsPaused(false)
  }, [])

  const handleTimeUpdate = useCallback(() => {
    const v = overlayVideoRef.current
    if (v) setCurrentTime(v.currentTime)
  }, [])

  const handleLoadedMetadata = useCallback(() => {
    const v = overlayVideoRef.current
    if (v) setDuration(v.duration)
  }, [])

  const handleSeek = useCallback((e) => {
    const v = overlayVideoRef.current
    if (!v) return
    const t = parseFloat(e.target.value)
    v.currentTime = t
    setCurrentTime(t)
  }, [])

  /* ── Close overlay on Escape ── */
  useEffect(() => {
    if (!overlayOpen) return
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [overlayOpen, handleClose])

  /* ── Autoplay overlay video when opened ── */
  useEffect(() => {
    if (!overlayOpen) return
    const v = overlayVideoRef.current
    if (!v) return
    v.currentTime = 0
    v.muted = false
    v.play().catch(() => {})
  }, [overlayOpen])

  /* ── Auto-play/pause section background video based on visibility ── */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.3) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: [0, 0.3] }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '200vh', backgroundColor: accentColor }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* ── Left text — "Система в действии" ── */}
        <div className="absolute left-[3vw] top-1/2 -translate-y-1/2 z-20 max-w-md pointer-events-none">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-white/60 mb-5">
            Видео
          </p>
          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.05]">
            Система
            <br />в действии
          </h2>
        </div>

        {/* ── Right text — description ── */}
        <div className="absolute right-[3vw] top-1/2 -translate-y-1/2 z-20 max-w-[18rem] pointer-events-none">
          <p className="text-white/80 text-sm lg:text-base leading-relaxed text-right">
            Посмотрите, как 3D система нивелирования работает в реальных условиях
          </p>
        </div>

        {/* ── Video container — scales with scroll ── */}
        <motion.div
          className="relative w-full h-full overflow-hidden"
          style={{ scale: scaleMV, borderRadius: borderMV }}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover"
            playsInline
            loop
            muted
          />
          {/* Permanent dark overlay on background video */}
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* ── Center play button ── */}
        <button
          onClick={handleWatch}
          className="absolute z-30 flex flex-col items-center gap-4 cursor-pointer group"
        >
          <div className="w-20 h-20 lg:w-24 lg:h-24 border border-white/50 rounded-full flex items-center justify-center
                          group-hover:border-white group-hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="ml-1">
              <path
                d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z"
                fill="white"
                fillOpacity="0.95"
              />
            </svg>
          </div>
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors">
            Смотреть видео
          </span>
        </button>
      </div>

      {/* ── Fullscreen overlay player ── */}
      <AnimatePresence>
        {overlayOpen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <video
              ref={overlayVideoRef}
              src={videoSrc}
              className="w-full h-full object-contain"
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnd}
            />

            {/* Close button — top right */}
            <motion.button
              onClick={handleClose}
              className="absolute top-6 right-6 z-30 w-12 h-12 border border-white/30 rounded-full
                         flex items-center justify-center text-white/70 hover:text-white
                         hover:border-white/60 transition-all duration-300 cursor-pointer
                         backdrop-blur-sm bg-black/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              aria-label="Закрыть"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Bottom control bar — pause + time + seek + duration */}
            <motion.div
              className="absolute bottom-6 left-6 right-6 z-30 flex items-center gap-4
                         backdrop-blur-sm bg-black/30 rounded-full px-5 py-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {/* Pause / Play */}
              <button
                onClick={handleTogglePause}
                className="shrink-0 w-10 h-10 flex items-center justify-center text-white/80
                           hover:text-white transition-colors cursor-pointer"
                aria-label={isPaused ? 'Воспроизвести' : 'Пауза'}
              >
                {isPaused ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                )}
              </button>

              {/* Current time */}
              <span className="text-white/60 text-xs font-medium tabular-nums shrink-0 w-10 text-right">
                {fmt(currentTime)}
              </span>

              {/* Seek slider */}
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 appearance-none bg-white/20 rounded-full cursor-pointer
                           accent-white [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                           [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                           [&::-webkit-slider-thumb]:appearance-none"
              />

              {/* Duration */}
              <span className="text-white/60 text-xs font-medium tabular-nums shrink-0 w-10">
                {fmt(duration)}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════
   MOBILE — static horizontal player, title+description above video,
   play / pause / fullscreen (with X close) controls.
   ════════════════════════════════════════════════════════════════════ */
function MobileVideo({ product, accentColor }) {
  const videoRef   = useRef(null)
  const fsVideoRef = useRef(null)
  const [isPaused, setIsPaused] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoSrc = product.video || kursVideo

  const handlePlay = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = false
    v.play().catch(() => {})
    setIsPaused(false)
  }

  const handlePause = () => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    setIsPaused(true)
  }

  const openFullscreen  = () => setIsFullscreen(true)
  const closeFullscreen = () => setIsFullscreen(false)

  /* Lock page scroll while fullscreen overlay is open */
  useEffect(() => {
    if (isFullscreen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isFullscreen])

  /* Auto-pause when scrolled far from video */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.3 && !v.paused) {
          v.pause()
          setIsPaused(true)
        }
      },
      { threshold: [0, 0.3, 0.6, 1] }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <section
        className="relative py-14"
        style={{ backgroundColor: accentColor }}
      >
        <div className="container-luxury">
          {/* ── Title + description above video ── */}
          <div className="mb-7">
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-white/60 mb-3">
              Видео
            </p>
            <h2 className="text-3xl font-light text-white leading-tight mb-3">
              Система в действии
            </h2>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              Посмотрите, как 3D система нивелирования работает в реальных условиях
            </p>
          </div>

          {/* ── Static horizontal player ── */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/40 shadow-xl">
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover"
              playsInline
              muted
              loop
              onPause={() => setIsPaused(true)}
              onPlay={() => setIsPaused(false)}
            />

            {/* Dim + play button overlay when paused */}
            {isPaused && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center z-10 bg-black/40"
                aria-label="Воспроизвести"
              >
                <div className="w-16 h-16 border border-white/70 rounded-full flex items-center justify-center backdrop-blur-sm bg-black/20">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="ml-1">
                    <path d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
                  </svg>
                </div>
              </button>
            )}

            {/* Bottom-right controls (pause + fullscreen) */}
            <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2">
              {!isPaused && (
                <button
                  onClick={handlePause}
                  className="w-10 h-10 border border-white/40 rounded-full flex items-center justify-center
                             text-white backdrop-blur-sm bg-black/40"
                  aria-label="Пауза"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                </button>
              )}
              <button
                onClick={openFullscreen}
                className="w-10 h-10 border border-white/40 rounded-full flex items-center justify-center
                           text-white backdrop-blur-sm bg-black/40"
                aria-label="На весь экран"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Custom fullscreen overlay with X close button ── */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <video
              ref={fsVideoRef}
              src={videoSrc}
              className="w-full h-full object-contain"
              playsInline
              autoPlay
              loop
              controls
            />
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 w-12 h-12 border border-white/40 rounded-full flex items-center justify-center
                         text-white bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-colors"
              aria-label="Закрыть"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
