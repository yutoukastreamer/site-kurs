import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import heroVideo from '../../assets/videos/hero-video.mp4'

export default function VideoSection({ product }) {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const fullscreenVideoRef = useRef(null)
  const [watchMode, setWatchMode] = useState(false)
  const scrollProgress = useMotionValue(0)

  /* ── Manual scroll listener (same approach as HeroRingSection) ── */
  useEffect(() => {
    const update = () => {
      const el = sectionRef.current
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

  const videoSrc = product.video || heroVideo

  /* ── Scroll-driven transforms ──
     Phase 1 (0–0.3): Video small with rounded corners, text visible
     Phase 2 (0.3–0.6): Video zooms to fullscreen, text fades out
     Phase 3 (0.6–1.0): Video stays full, then shrinks back */
  const scale = useTransform(scrollProgress, [0, 0.15, 0.5, 0.85, 1], [0.55, 0.65, 1, 0.65, 0.55])
  const borderRadius = useTransform(scrollProgress, [0, 0.5, 1], [24, 0, 24])
  const textOpacity = useTransform(scrollProgress, [0.15, 0.4], [1, 0])
  const textY = useTransform(scrollProgress, [0.15, 0.4], [0, -40])

  /* ── Lock/unlock scroll when entering/exiting fullscreen watch mode ── */
  useEffect(() => {
    if (watchMode) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [watchMode])

  /* ── Close on Escape ── */
  useEffect(() => {
    if (!watchMode) return
    const handleKey = (e) => { if (e.key === 'Escape') closeWatch() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [watchMode])

  /* ── "Watch with sound" handler — opens fullscreen overlay ── */
  const handleWatch = useCallback(() => {
    setWatchMode(true)
    // Pause the inline video
    if (videoRef.current) videoRef.current.pause()
  }, [])

  /* ── Start fullscreen video when it mounts ── */
  useEffect(() => {
    if (watchMode && fullscreenVideoRef.current) {
      fullscreenVideoRef.current.currentTime = 0
      fullscreenVideoRef.current.muted = false
      fullscreenVideoRef.current.play().catch(() => {})
    }
  }, [watchMode])

  const closeWatch = useCallback(() => {
    setWatchMode(false)
    // Resume inline muted video
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const handleVideoEnd = useCallback(() => {
    closeWatch()
  }, [closeWatch])

  /* ── Auto-play muted when section is in viewport ── */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !watchMode) {
          video.muted = true
          video.play().catch(() => {})
        } else if (!watchMode) {
          video.pause()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [watchMode])

  return (
    <>
      <section
        ref={sectionRef}
        className="relative bg-[#111318]"
        style={{ height: '200vh' }}
      >
        {/* Subtle top gradient so dark bg doesn't merge with prev block */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg-alt to-[#111318] pointer-events-none" />

        {/* Subtle bottom gradient so it doesn't merge with next (contact form) block */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-dark to-[#111318] pointer-events-none" />

        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          {/* ── Text overlay — fades out as video zooms in ── */}
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center text-center pointer-events-none"
            style={{ opacity: textOpacity, y: textY }}
          >
            <div className="max-w-2xl px-8">
              <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-white/40 mb-4">
                Видео
              </p>
              <h2 className="text-3xl lg:text-5xl font-light text-white leading-tight mb-4">
                Система в действии
              </h2>
              <p className="text-white/40 text-sm lg:text-base leading-relaxed">
                Посмотрите, как 3D система нивелирования работает в реальных условиях
              </p>
            </div>
          </motion.div>

          {/* ── Video container — scales with scroll ── */}
          <motion.div
            className="relative w-full h-full overflow-hidden"
            style={{ scale, borderRadius }}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover"
              playsInline
              loop
              muted
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>

          {/* ── Center play button — "Смотреть видео" ── */}
          <motion.button
            onClick={handleWatch}
            className="absolute z-30 flex flex-col items-center gap-4 cursor-pointer group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-20 h-20 lg:w-24 lg:h-24 border border-white/20 rounded-full flex items-center justify-center
                          group-hover:border-white/50 group-hover:bg-white/5 transition-all duration-300
                          backdrop-blur-sm">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="ml-1">
                <path
                  d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z"
                  fill="white"
                  fillOpacity="0.8"
                />
              </svg>
            </div>
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/50 group-hover:text-white/80 transition-colors">
              Смотреть видео
            </span>
          </motion.button>
        </div>
      </section>

      {/* ═══ Fullscreen video overlay ═══ */}
      <AnimatePresence>
        {watchMode && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <video
              ref={fullscreenVideoRef}
              src={videoSrc}
              className="w-full h-full object-contain"
              playsInline
              onEnded={handleVideoEnd}
            />

            {/* Close (X) button */}
            <motion.button
              onClick={closeWatch}
              className="absolute top-6 right-6 z-10 w-12 h-12 border border-white/20 rounded-full
                         flex items-center justify-center text-white/60 hover:text-white hover:border-white/40
                         transition-all duration-300 cursor-pointer backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
