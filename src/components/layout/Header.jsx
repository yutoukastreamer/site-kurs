import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logoGsi from '../../assets/images/logos/logo-gsi.png'
import logoGsiWhite from '../../assets/images/logos/logo-gsi-white.png'

const navLinks = [
  { to: '/bulldozer', label: 'Бульдозер' },
  { to: '/excavator', label: 'Экскаватор' },
  { to: '/grader', label: 'Грейдер' },
  { to: '/news', label: 'Новости' },
  { to: '/#gallery', label: 'Галерея' },
  { to: '/#where-to-buy', label: 'Где купить' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [footerInView, setFooterInView] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Hide header on desktop when footer scrolls into view */
  useEffect(() => {
    const footer = document.getElementById('main-footer')
    if (!footer) return
    const io = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { rootMargin: '0px 0px 0px 0px', threshold: 0 }
    )
    io.observe(footer)
    return () => io.disconnect()
  }, [pathname])

  /* Scroll to hash after navigation to / */
  useEffect(() => {
    const hash = window.location.hash
    if (pathname === '/' && hash) {
      const id = hash.slice(1)
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [pathname])

  const handleAnchorClick = (e, to) => {
    if (to.startsWith('/#')) {
      e.preventDefault()
      const id = to.slice(2)
      if (pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate('/', { state: { scrollTo: id } })
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      }
    }
  }

  /* Light mode: on homepage, before scroll — white text/logos over video */
  const isHome = pathname === '/'
  const isLight = isHome && !isScrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.04)]'
          : 'bg-transparent'
      } ${footerInView ? 'lg:-translate-y-full lg:opacity-0 lg:pointer-events-none' : ''}`}
    >
      <div className="container-luxury flex items-center justify-between h-20">
        {/* Logo GSI */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={isLight ? logoGsiWhite : logoGsi}
            alt="ГСИ"
            className="h-9 w-auto transition-all duration-500"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={(e) => handleAnchorClick(e, link.to)}
              className={({ isActive }) =>
                `whitespace-nowrap text-[11px] xl:text-[12px] font-medium tracking-[0.14em] uppercase transition-colors duration-300 ${
                  isLight
                    ? isActive && !link.to.startsWith('/#')
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                    : isActive && !link.to.startsWith('/#')
                      ? 'text-text'
                      : 'text-text-secondary hover:text-text'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-6 shrink-0">
          <a
            href="tel:+78001234567"
            className={`whitespace-nowrap text-[11px] xl:text-[12px] font-medium tracking-wide transition-colors ${
              isLight
                ? 'text-white/60 hover:text-white'
                : 'text-text-secondary hover:text-text'
            }`}
          >
            8 800 777-57-14
          </a>
          <Link
            to="/#contact"
            onClick={(e) => handleAnchorClick(e, '/#contact')}
            className={`whitespace-nowrap shrink-0 px-4 xl:px-6 py-2.5 text-[10px] xl:text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-300 border ${
              isLight
                ? 'border-white/40 text-white hover:bg-white hover:text-bg-dark'
                : 'border-text text-text hover:bg-text hover:text-text-light'
            }`}
          >
            Получить предложение
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          <motion.span
            className={`block w-6 h-[2px] origin-center ${isLight ? 'bg-white' : 'bg-text'}`}
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className={`block w-6 h-[2px] ${isLight ? 'bg-white' : 'bg-text'}`}
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className={`block w-6 h-[2px] origin-center ${isLight ? 'bg-white' : 'bg-text'}`}
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-border overflow-hidden"
          >
            <nav className="container-luxury py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={(e) => handleAnchorClick(e, link.to)}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-[0.12em] uppercase ${
                      isActive && !link.to.startsWith('/#')
                        ? 'text-text'
                        : 'text-text-secondary'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="divider-accent mt-2" />
              <a href="tel:+78001234567" className="text-sm text-text-secondary">
                8 800 777 57 14
              </a>
              <Link
                to="/#contact"
                onClick={(e) => handleAnchorClick(e, '/#contact')}
                className="self-start px-6 py-3 border border-text text-text text-[11px] font-medium tracking-[0.15em] uppercase"
              >
                Получить предложение
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
