import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import logoKurs from '../../assets/images/logos/logo-kurs-white.png'
import logoRussia from '../../assets/images/logos/logo-made-in-russia.png'
import heroVideo from '../../assets/videos/hero-video.mp4'

export default function HeroHome() {
  const { pathname } = useLocation()

  const handleAnchor = (e, id) => {
    if (pathname === '/') {
      e.preventDefault()
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-start md:items-center overflow-hidden bg-bg-dark">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay muted loop playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-bg-dark/90 via-bg-dark/50 to-bg-dark/70" />

      {/*
        Logos
        ─────
        Desktop (md+): top-right corner, flex row.
        Mobile: full-width grid [1fr auto 1fr] — the divider lands exactly
        at the viewport horizontal center regardless of each logo's width.
        Each logo justifies toward the divider (end/start) so the composition
        is visually symmetric around the true center.

        Vertical (mobile):
          iPhone SE (<376px):  logos h-8 (32px), top-28 (112px),
                                heading pt-44 (176px) → 32px gap both sides.
          ≥376px (xs+):         logos h-10 (40px), top-[116px],
                                heading pt-48 (192px) → 36px gap both sides.
      */}
      <motion.div
        className="absolute top-28 xs:top-[116px] md:top-28 inset-x-0 md:inset-x-auto md:right-8 lg:right-12 z-20 grid grid-cols-[1fr_auto_1fr] md:flex items-center gap-4 xs:gap-5"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <img src={logoKurs} alt="Курс" className="h-8 xs:h-10 lg:h-14 w-auto justify-self-end md:justify-self-auto" />
        <div className="w-px h-7 xs:h-8 bg-white/30" />
        <img src={logoRussia} alt="Сделано в России" className="h-8 xs:h-10 lg:h-14 w-auto justify-self-start md:justify-self-auto" style={{ filter: 'brightness(0) invert(1)' }} />
      </motion.div>

      {/* Content */}
      <div className="container-luxury relative z-10 pt-44 xs:pt-48 md:pt-32 pb-20">
        <div className="max-w-3xl text-center md:text-left md:pl-0 lg:-ml-52">
          <motion.p
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-white/40 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Российское производство
          </motion.p>

          <motion.h1
            className="font-light leading-[1.05] mb-6 text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Инновационные
            <br />
            отечественные
            <br />
            <span className="text-white/50">3D системы
            <br />
            нивелирования</span>
          </motion.h1>

          <motion.p
            className="text-base lg:text-lg text-white/35 font-light max-w-lg mb-12 leading-relaxed mx-auto md:mx-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Точность, которой доверяют на строительных площадках по всей России
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Link
              to="/#contact"
              onClick={(e) => handleAnchor(e, 'contact')}
              className="shrink-0 px-8 py-3.5 border border-white/25 text-white text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-white hover:text-bg-dark transition-all duration-300 text-center"
            >
              Получить предложение
            </Link>
            <Link
              to="/#products"
              onClick={(e) => handleAnchor(e, 'products')}
              className="shrink-0 px-8 py-3.5 text-white/40 text-[11px] font-medium tracking-[0.15em] uppercase hover:text-white transition-colors duration-300 text-center"
            >
              Смотреть продукцию
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.svg
          width="18"
          height="28"
          viewBox="0 0 18 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <line x1="9" y1="0" x2="9" y2="20" stroke="white" strokeOpacity="0.25" strokeWidth="0.75" />
          <polyline
            points="3,15 9,22 15,15"
            fill="none"
            stroke="white"
            strokeOpacity="0.25"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </section>
  )
}
