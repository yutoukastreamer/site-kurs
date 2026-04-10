import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import logoKurs from '../../assets/images/logos/logo-kurs.png'
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg-dark">
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

      {/* Logos — top right corner, large & visible */}
      <motion.div
        className="absolute top-28 right-8 lg:right-12 z-20 flex items-center gap-5"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <img src={logoKurs} alt="Курс" className="h-10 lg:h-14 w-auto brightness-0 invert opacity-90" />
        <div className="w-px h-8 bg-white/30" />
        <img src={logoRussia} alt="Сделано в России" className="h-10 lg:h-14 w-auto brightness-0 invert opacity-70" />
      </motion.div>

      {/* Content */}
      <div className="container-luxury relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
          <motion.p
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-white/40 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Российское производство
          </motion.p>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-6 text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Инновационные отечественные{' '}
            <span className="text-white/50">3D системы нивелирования</span>
          </motion.h1>

          <motion.p
            className="text-base lg:text-lg text-white/35 font-light max-w-lg mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Точность, которой доверяют на строительных площадках по всей России
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Link
              to="/#contact"
              onClick={(e) => handleAnchor(e, 'contact')}
              className="px-8 py-3.5 border border-white/25 text-white text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-white hover:text-bg-dark transition-all duration-300 text-center"
            >
              Получить предложение
            </Link>
            <Link
              to="/#products"
              onClick={(e) => handleAnchor(e, 'products')}
              className="px-8 py-3.5 text-white/40 text-[11px] font-medium tracking-[0.15em] uppercase hover:text-white transition-colors duration-300 text-center"
            >
              Смотреть продукцию
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-white/15"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}
