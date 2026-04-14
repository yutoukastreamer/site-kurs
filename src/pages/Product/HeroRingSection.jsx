import { useRef, useEffect, useState } from 'react'
import { motion, useTransform, useMotionValue } from 'framer-motion'
import Button from '../../components/ui/Button'
import logoKurs from '../../assets/images/logos/logo-kurs.png'
import logoRussia from '../../assets/images/logos/logo-made-in-russia.png'

/* ─── Constants ─── */
const ACCENT_HEX = {
  bulldozer: '#3B6B9C',
  excavator: '#9C7B3B',
  grader: '#3B8C6E',
}

const ACCENT_BORDER = {
  bulldozer: 'border-l-bulldozer',
  excavator: 'border-l-excavator',
  grader: 'border-l-grader',
}

const EASE = [0.25, 0.1, 0.25, 1]

/* ─── Helpers ─── */

/** Clock hour (1–12) → position around ring center (viewport %)
 *  Center shifted down (56%) to clear header+title */
function clockToPos(hour, rx = 30, ry = 28) {
  const angle = (hour * Math.PI) / 6 - Math.PI / 2
  return { left: 50 + rx * Math.cos(angle), top: 56 + ry * Math.sin(angle) }
}

/** Default even clock distribution for N components */
function defaultHours(n) {
  return Array.from({ length: n }, (_, i) => ((12 / n) * i) || 12)
}

/** Machine-relative point [0-100, 0-100] → viewport %
 *  machineVW/machineVH — visual size of machine in ring mode (viewport %) */
function machineToVP(mx, my, machineVW, machineVH) {
  return {
    x: 50 + (mx / 100 - 0.5) * machineVW,
    y: 56 + (my / 100 - 0.5) * machineVH,
  }
}

/** Compute an L-shaped waypoint between component and machine dot.
 *  Returns null if a straight line is more appropriate. */
function computeWaypoint(fromX, fromY, toX, toY) {
  const dx = Math.abs(fromX - toX)
  const dy = Math.abs(fromY - toY)

  if (dx > dy * 1.2) {
    // Dominant horizontal → go horizontal first, then vertical
    return { x: toX, y: fromY }
  } else if (dy > dx * 1.2) {
    // Dominant vertical → go vertical first, then horizontal
    return { x: fromX, y: toY }
  }
  return null // roughly diagonal → straight line
}

/* ═══════════════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════════════ */
export default function HeroRingSection({ product }) {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(null)

  /* ── Manual scroll progress (more reliable than useScroll target) ── */
  const scrollProgress = useMotionValue(0)

  useEffect(() => {
    const update = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollRange = el.offsetHeight - window.innerHeight
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

  const color = ACCENT_HEX[product.accentColor]
  const components = product.diagramComponents
  const hours = defaultHours(components.length)

  /* Use explicit ringPos when available, fallback to clockToPos */
  const ringPositions = components.map((comp, i) =>
    comp.ringPos || clockToPos(comp.clockHour ?? hours[i])
  )

  /* ── Machine size config (per-product, with defaults) ── */
  const imgVW = product.heroImgVW ?? 32
  const finalRingScale = product.ringMachineScale ?? 0.6
  const machineVW = imgVW * finalRingScale
  const machineVH = machineVW * (26 / 19)

  /* ── Desktop scroll transforms ── */
  const machineLeft = useTransform(scrollProgress, [0, 0.25, 0.55], ['25%', '25%', '50%'])
  const machineTop = useTransform(scrollProgress, [0, 0.25, 0.55], ['46%', '46%', '56%'])
  const machineScale = useTransform(scrollProgress, [0.25, 0.55], [1, finalRingScale])
  const heroOpacity = useTransform(scrollProgress, [0.18, 0.38], [1, 0])
  const titleOpacity = useTransform(scrollProgress, [0.42, 0.58], [0, 1])
  const bgOpacity = useTransform(scrollProgress, [0.35, 0.50], [0, 1])

  return (
    <>
      {/* ══════ DESKTOP — pinned scroll animation ══════ */}
      <div ref={containerRef} className="hidden lg:block relative" style={{ height: '280vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-bg">

          {/* Background transition: bg → bg-alt (light) */}
          <motion.div
            className="absolute inset-0 bg-bg-alt"
            style={{ opacity: bgOpacity }}
          />

          {/* Machine image — scroll-linked position & scale */}
          <motion.div
            className="absolute z-10 pointer-events-none"
            style={{ left: machineLeft, top: machineTop }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2" style={{ width: `${imgVW}vw`, maxWidth: `${Math.round(imgVW * 16.25)}px` }}>
              <motion.div style={{ scale: machineScale }} className="origin-center">
                <img
                  src={product.heroImage}
                  alt={product.name}
                  className="w-full h-auto object-contain drop-shadow-lg animate-fade-in"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Hero text — right side, scroll-linked fade */}
          <motion.div
            className="absolute right-[8%] top-0 bottom-0 w-[42%] max-w-xl flex items-center z-20"
            style={{ opacity: heroOpacity }}
          >
            <div className={`border-l-2 ${ACCENT_BORDER[product.accentColor]} pl-8 animate-hero-enter`}>
              <HeroText product={product} />
            </div>
          </motion.div>

          {/* Ring heading — fades in, pushed below header */}
          <motion.div
            className="absolute top-32 lg:top-36 left-1/2 text-center z-30 pointer-events-none"
            style={{ opacity: titleOpacity, x: '-50%' }}
          >
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-2">
              Устройство
            </p>
            <h2 className="text-2xl lg:text-3xl font-light">
              Схема расположения компонентов
            </h2>
          </motion.div>

          {/* Ring components — staggered by scroll */}
          {components.map((comp, i) => (
            <RingPoint
              key={comp.id || comp.name + i}
              comp={comp}
              position={ringPositions[i]}
              index={i}
              total={components.length}
              scrollYProgress={scrollProgress}
              isActive={activeIndex === i}
              onHover={(active) => setActiveIndex(active ? i : null)}
            />
          ))}

          {/* SVG connector lines (solid, L-shaped) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]">
            {components.map((comp, i) => (
              <ConnectorLine
                key={`line-${i}`}
                comp={comp}
                position={ringPositions[i]}
                index={i}
                total={components.length}
                scrollYProgress={scrollProgress}
                color={color}
                machineVW={machineVW}
                machineVH={machineVH}
                isActive={activeIndex === i}
              />
            ))}
          </svg>

          {/* Diamond markers on machine body */}
          {components.map((comp, i) => (
            <DiamondMarker
              key={`diamond-${i}`}
              comp={comp}
              machineVW={machineVW}
              machineVH={machineVH}
              index={i}
              total={components.length}
              scrollYProgress={scrollProgress}
              color={color}
              isActive={activeIndex === i}
              onHover={(active) => setActiveIndex(active ? i : null)}
            />
          ))}
        </div>
      </div>

      {/* ══════ MOBILE — standard layout, no pinning ══════ */}

      {/* Mobile Hero — text only, no machine image */}
      <section className="lg:hidden min-h-[80vh] flex items-center bg-bg">
        <div className="container-luxury pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <div className={`border-l-2 ${ACCENT_BORDER[product.accentColor]} pl-6`}>
              <HeroText product={product} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Ring — machine centered, components around */}
      <MobileRing product={product} color={color} imgVW={imgVW} />
    </>
  )
}

/* ═══════════════════════════════════════════════════════
   Desktop ring point (scroll-linked stagger + hover)
   ═══════════════════════════════════════════════════════ */
function RingPoint({ comp, position, index, total, scrollYProgress, isActive, onHover }) {
  const stagger = index * (0.12 / total)
  const opacity = useTransform(scrollYProgress, [0.55 + stagger, 0.72 + stagger], [0, 1])
  const scale = useTransform(scrollYProgress, [0.55 + stagger, 0.70 + stagger], [0.4, 1])

  return (
    <motion.div
      className="absolute z-20 cursor-pointer"
      style={{
        left: `${position.left}%`,
        top: `${position.top}%`,
        x: '-50%',
        y: '-50%',
        opacity,
        scale,
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className={`flex flex-col items-center gap-1.5 origin-center
                        transition-transform duration-300 ease-out
                        ${isActive ? 'scale-110' : ''}`}>
        <div className="w-20 h-20 flex items-center justify-center">
          <img src={comp.image} alt={comp.name} className="w-full h-full object-contain drop-shadow-sm" />
        </div>
        <span className={`text-[10px] font-medium text-center max-w-[140px] leading-tight tracking-wide
                          whitespace-pre-line transition-colors duration-300
                          ${isActive ? 'text-text' : 'text-text-secondary'}`}>
          {comp.label || comp.name}
        </span>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   Desktop SVG connector line (solid, L-shaped, premium-thin)
   ═══════════════════════════════════════════════════════ */
function ConnectorLine({ comp, position, index, total, scrollYProgress, color, machineVW, machineVH, isActive }) {
  const stagger = index * (0.12 / total)
  const lineOpacity = useTransform(scrollYProgress, [0.58 + stagger, 0.78 + stagger], [0, 1])

  const mp = comp.machinePoint || [50, 50]
  const target = machineToVP(mp[0], mp[1], machineVW, machineVH)

  // Compute L-shaped waypoint automatically
  const waypoint = computeWaypoint(position.left, position.top, target.x, target.y)

  // Solid premium lines: slightly thinner, soft transparency
  const sw = isActive ? 1.6 : 1.1
  const so = isActive ? 0.95 : 0.55

  const commonProps = {
    stroke: color,
    strokeLinecap: 'round',
  }

  return (
    <motion.g style={{ opacity: lineOpacity }}>
      {waypoint ? (
        <>
          <motion.line
            x1={`${position.left}%`} y1={`${position.top}%`}
            x2={`${waypoint.x}%`} y2={`${waypoint.y}%`}
            {...commonProps}
            animate={{ strokeWidth: sw, strokeOpacity: so }}
            transition={{ duration: 0.3 }}
          />
          <motion.line
            x1={`${waypoint.x}%`} y1={`${waypoint.y}%`}
            x2={`${target.x}%`} y2={`${target.y}%`}
            {...commonProps}
            animate={{ strokeWidth: sw, strokeOpacity: so }}
            transition={{ duration: 0.3 }}
          />
        </>
      ) : (
        <motion.line
          x1={`${position.left}%`} y1={`${position.top}%`}
          x2={`${target.x}%`} y2={`${target.y}%`}
          {...commonProps}
          animate={{ strokeWidth: sw, strokeOpacity: so }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.g>
  )
}

/* ═══════════════════════════════════════════════════════
   Diamond marker at machine point
   ═══════════════════════════════════════════════════════ */
function DiamondMarker({ comp, machineVW, machineVH, index, total, scrollYProgress, color, isActive, onHover }) {
  const stagger = index * (0.12 / total)
  const opacity = useTransform(scrollYProgress, [0.70 + stagger, 0.85 + stagger], [0, 1])

  const mp = comp.machinePoint || [50, 50]
  const target = machineToVP(mp[0], mp[1], machineVW, machineVH)

  return (
    <motion.div
      className={`absolute z-[15] cursor-pointer transition-transform duration-300
                  ${isActive ? 'scale-[1.8]' : 'hover:scale-125'}`}
      style={{
        left: `${target.x}%`,
        top: `${target.y}%`,
        x: '-50%',
        y: '-50%',
        opacity,
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div
        className="w-2.5 h-2.5 rotate-45"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   Shared hero text content
   ═══════════════════════════════════════════════════════ */
function HeroText({ product }) {
  return (
    <>
      <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-6">
        {product.name}
      </p>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-8">
        {product.heroTitle.split('\n').map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </h1>

      <p className="text-sm text-text-secondary leading-relaxed max-w-md mb-8">
        {product.heroSubtitle}
      </p>

      {/* Quick specs */}
      <div className="flex gap-8 mb-8">
        {product.features.slice(0, 3).map((f) => (
          <div key={f.title}>
            <span className={`text-2xl font-light text-${product.accentColor}`}>{f.value}</span>
            <span className="text-xs text-text-secondary ml-1">{f.unit}</span>
            <p className="text-[10px] text-text-secondary tracking-wide uppercase mt-1">{f.title}</p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <Button href="#" variant="primary">Скачать буклет PDF</Button>
        <Button href="#contact" variant="outline">Получить предложение</Button>
      </div>

      {/* Logos */}
      <div className="flex items-center gap-6">
        <img src={logoKurs} alt="Курс" className="h-7 w-auto" />
        <img src={logoRussia} alt="Сделано в России" className="h-7 w-auto" />
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════
   Mobile ring section
   ═══════════════════════════════════════════════════════ */
function MobileRing({ product, color, imgVW }) {
  const components = product.diagramComponents
  const mobileImgPct = imgVW > 36 ? '55%' : '45%'
  const mobVW = imgVW > 36 ? 55 : 45
  const mobVH = imgVW > 36 ? 42 : 35

  const ringPositions = components.map((_, i) => {
    const total = components.length
    const angle = (i / total) * 2 * Math.PI - Math.PI / 2
    return { left: 50 + 38 * Math.cos(angle), top: 50 + 38 * Math.sin(angle) }
  })

  return (
    <section className="lg:hidden py-16 bg-bg-alt">
      <div className="container-luxury">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-3">
            Устройство
          </p>
          <h2 className="text-2xl font-light">Схема расположения</h2>
        </motion.div>

        <div className="relative w-full aspect-square max-w-sm mx-auto">
          {/* Center machine */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ width: mobileImgPct }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img src={product.heroImage} alt={product.name} className="w-full h-auto object-contain" />
          </motion.div>

          {/* Components around ring */}
          {components.map((comp, i) => {
            const pos = ringPositions[i]
            return (
              <motion.div
                key={comp.id || comp.name + i}
                className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: EASE }}
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  <img src={comp.image} alt={comp.name} className="w-full h-full object-contain drop-shadow-sm" />
                </div>
                <span className="text-[8px] font-medium text-text-secondary text-center max-w-[70px] leading-tight whitespace-pre-line">
                  {comp.label || comp.name}
                </span>
              </motion.div>
            )
          })}

          {/* SVG lines (solid) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]">
            {components.map((comp, i) => {
              const pos = ringPositions[i]
              const mp = comp.machinePoint || [50, 50]
              const target = {
                x: 50 + (mp[0] / 100 - 0.5) * mobVW,
                y: 50 + (mp[1] / 100 - 0.5) * mobVH,
              }
              return (
                <g key={`mline-${i}`}>
                  <motion.line
                    x1={`${pos.left}%`} y1={`${pos.top}%`}
                    x2={`${target.x}%`} y2={`${target.y}%`}
                    stroke={color} strokeWidth="1" strokeOpacity="0.6"
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                  />
                  <motion.circle
                    cx={`${target.x}%`} cy={`${target.y}%`}
                    r="2" fill={color} fillOpacity="0.5"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
                  />
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </section>
  )
}
