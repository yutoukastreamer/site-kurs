import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useTransform, useMotionValue, AnimatePresence } from 'framer-motion'
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

/*
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  SCHEMA_LAYOUT — координаты иконок И точек на машине                    ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║                                                                         ║
 * ║  left  — горизонталь иконки:  0 = левый край,  50 = центр, 100 = право ║
 * ║  top   — вертикаль иконки:    0 = верх экрана, 50 = середина, 100 = низ║
 * ║                                                                         ║
 * ║  dot: [x, y] — точка-ромб НА МАШИНЕ, куда идёт линия                   ║
 * ║    x — горизонталь на картинке машины:  0 = левый край,  100 = правый   ║
 * ║    y — вертикаль на картинке машины:    0 = верх машины,  100 = низ     ║
 * ║                                                                         ║
 * ║  ▸ увеличь left → иконка вправо    ▸ увеличь dot[0] → точка вправо     ║
 * ║  ▸ уменьши left → иконка влево     ▸ уменьши dot[0] → точка влево      ║
 * ║  ▸ увеличь top  → иконка вниз      ▸ увеличь dot[1] → точка вниз       ║
 * ║  ▸ уменьши top  → иконка вверх     ▸ уменьши dot[1] → точка вверх      ║
 * ║                                                                         ║
 * ║  Линия рисуется АВТОМАТИЧЕСКИ от иконки (left/top) до точки (dot).      ║
 * ║  Двигаешь что угодно — линия сама подстраивается.                       ║
 * ║                                                                         ║
 * ║  Безопасные диапазоны:  left 8–92,  top 24–88,  dot 0–100              ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */
const SCHEMA_LAYOUT = {
  bulldozer: [
    /* #  название                           left  top    dot: [x, y] на машине   */
    /* 0: ГНСС антенны                  */ { left: 30, top: 32, dot: [32, 13] },
    /* 1: 10.1" консоль с ПО "КУРС"    */ { left: 78, top: 34, dot: [38, 30] },
    /* 2: Призма режима ЛПС (опц.)     */ { left: 56, top: 31, dot: [45, 13] },
    /* 3: Контроллер гидравлики         */ { left: 18, top: 50, dot: [12, 42] },
    /* 4: Инерц. датчик на отвале       */ { left: 80, top: 62, dot: [75, 60] },
    /* 5: Инерц. датчик в кабине        */ { left: 28, top: 75, dot: [15, 37] },
    /* 6: Центральный контроллер        */ { left: 45, top: 86, dot: [20, 40] },
    /* 7: Инерц. датчик на штанге отв.  */ { left: 65, top: 83, dot: [47, 75] },
  ],
  excavator: [
    /* #  название                           left  top    dot: [x, y] на машине   */
    /* 0: Панель управления с ПО «Курс» */ { left: 78, top: 60, dot: [50, 57] },
    /* 1: ГНСС антенны                  */ { left: 23, top: 53, dot: [5, 47] },
    /* 2: Инерц. датчик (стрела)        */ { left: 34, top: 34, dot: [31, 38] },
    /* 3: Инерц. датчик (рукоять)       */ { left: 70, top: 34, dot: [75, 23] },
    /* 4: Инерц. датчик (ковш)          */ { left: 69, top: 82, dot: [ 80, 74] },
    /* 5: Инерц. датчик (корпус)        */ { left: 30, top: 78, dot: [33, 78] },
    /* 6: Центральный контроллер        */ { left: 48, top: 90, dot: [43, 42] },
  ],

  grader: [
    /* #  название                           left  top    dot: [x, y] на машине   */
    /* 0: Панель управления с ПО «Курс» */ { left: 68, top: 35, dot: [40, 40] },
    /* 1: ГНСС антенны                  */ { left: 43, top: 83, dot: [26, 69] },
    /* 2: Инерциальный датчик           */ { left: 77, top: 64, dot: [42, 71] },
    /* 3: Контроллер гидравлики         */ { left: 22, top: 60, dot: [39, 52] },
    /* 4: Центральный контроллер        */ { left: 30, top: 32, dot: [23, 39] },
  ],
}

/* ─── Helpers ─── */

function clockToPos(hour, rx = 30, ry = 28) {
  const angle = (hour * Math.PI) / 6 - Math.PI / 2
  return { left: 50 + rx * Math.cos(angle), top: 56 + ry * Math.sin(angle) }
}

function defaultHours(n) {
  return Array.from({ length: n }, (_, i) => ((12 / n) * i) || 12)
}

function machineToVP(mx, my, machineVW, machineVH) {
  return {
    x: 50 + (mx / 100 - 0.5) * machineVW,
    y: 56 + (my / 100 - 0.5) * machineVH,
  }
}

function clampPos(pos) {
  return {
    left: Math.max(5, Math.min(95, pos.left)),
    top: Math.max(16, Math.min(90, pos.top)),
  }
}

/* ═══════════════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════════════ */
export default function HeroRingSection({ product }) {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const [heroHidden, setHeroHidden] = useState(false)

  const scrollProgress = useMotionValue(0)

  useEffect(() => {
    const update = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollRange = el.offsetHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, -rect.top / scrollRange))
      scrollProgress.set(progress)
      setHeroHidden(progress > 0.42)
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

  const layout = SCHEMA_LAYOUT[product.slug]
  const ringPositions = components.map((comp, i) => {
    if (layout?.[i]) return layout[i]
    return clampPos(comp.ringPos || clockToPos(comp.clockHour ?? hours[i]))
  })

  const imgVW = product.heroImgVW ?? 32
  const finalRingScale = product.ringMachineScale ?? 0.6
  const machineVW = imgVW * finalRingScale
  const machineVH = machineVW * (26 / 19)

  /* ── Desktop scroll transforms ── */
  const machineLeft = useTransform(scrollProgress, [0, 0.25, 0.55], ['25%', '25%', '50%'])
  const machineTop = useTransform(scrollProgress, [0, 0.25, 0.55], ['46%', '46%', '56%'])
  const machineScale = useTransform(scrollProgress, [0.25, 0.55], [1, finalRingScale])
  const heroOpacity = useTransform(scrollProgress, [0.18, 0.38], [1, 0])
  const titleOpacity = useTransform(scrollProgress, [0.55, 0.68], [0, 1])
  const bgOpacity = useTransform(scrollProgress, [0.35, 0.50], [0, 1])

  return (
    <>
      {/* ══════ DESKTOP — pinned scroll animation ══════ */}
      <div ref={containerRef} className="hidden lg:block relative" style={{ height: '280vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-bg">

          {/* Background transition: bg → bg-alt */}
          <motion.div
            className="absolute inset-0 bg-bg-alt"
            style={{ opacity: bgOpacity }}
          />

          {/* Machine image — scroll-linked position & scale */}
          <motion.div
            className="absolute z-[5] pointer-events-none"
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

          {/* Hero text — fully removed from DOM when transparent */}
          {!heroHidden && (
            <motion.div
              className="absolute right-[4%] xl:right-[8%] top-0 bottom-0 w-[45%] xl:w-[42%] max-w-xl flex items-center z-20"
              style={{ opacity: heroOpacity }}
            >
              <div className={`border-l-2 ${ACCENT_BORDER[product.accentColor]} pl-4 xl:pl-8 animate-hero-enter`}>
                <HeroText product={product} />
              </div>
            </motion.div>
          )}

          {/* ── Schema overlay — relative container, safe bounds via clampPos ── */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="relative w-full h-full">

              {/* Ring heading — starts exactly when machine animation ends */}
              <motion.div
                className="absolute left-1/2 text-center z-30"
                style={{ opacity: titleOpacity, x: '-50%', top: '14%' }}
              >
                <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-2 whitespace-nowrap">
                  Устройство
                </p>
                <h2 className="font-light whitespace-nowrap" style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.875rem)' }}>
                  Схема расположения компонентов
                </h2>
              </motion.div>

              {/* Components with border-based L-shaped connectors */}
              {components.map((comp, i) => {
                const dotOverride = layout?.[i]?.dot
                return (
                  <SchemaItem
                    key={comp.id || comp.name + i}
                    comp={comp}
                    position={ringPositions[i]}
                    dotOverride={dotOverride}
                    index={i}
                    total={components.length}
                    scrollYProgress={scrollProgress}
                    color={color}
                    machineVW={machineVW}
                    machineVH={machineVH}
                    isActive={activeIndex === i}
                    onHover={(active) => setActiveIndex(active ? i : null)}
                  />
                )
              })}

              {/* Machine point markers */}
              {components.map((comp, i) => {
                const dotOverride = layout?.[i]?.dot
                return (
                  <MachineDot
                    key={`dot-${i}`}
                    comp={comp}
                    dotOverride={dotOverride}
                    machineVW={machineVW}
                    machineVH={machineVH}
                    index={i}
                    total={components.length}
                    scrollYProgress={scrollProgress}
                    color={color}
                    isActive={activeIndex === i}
                    onHover={(active) => setActiveIndex(active ? i : null)}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ══════ MOBILE — standard layout, no pinning ══════ */}

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

      <MobileRing product={product} color={color} />
    </>
  )
}

/* ═══════════════════════════════════════════════════════
   Schema item — icon + label + L-shaped border connector
   ═══════════════════════════════════════════════════════ */
function SchemaItem({ comp, position, dotOverride, index, total, scrollYProgress, color, machineVW, machineVH, isActive, onHover }) {
  const stagger = index * (0.15 / total)
  const itemOpacity = useTransform(scrollYProgress, [0.55 + stagger, 0.75 + stagger], [0, 1])

  const mp = dotOverride || comp.machinePoint || [50, 50]
  const target = machineToVP(mp[0], mp[1], machineVW, machineVH)

  const fromX = position.left
  const fromY = position.top
  const toX = target.x
  const toY = target.y

  const connLeft = Math.min(fromX, toX)
  const connTop = Math.min(fromY, toY)
  const connW = Math.abs(fromX - toX)
  const connH = Math.abs(fromY - toY)

  const compIsLeft = fromX <= toX
  const compIsAbove = fromY <= toY

  const bw = isActive ? '2px' : '1px'
  const alpha = isActive ? 'e6' : '80'
  const border = `${bw} solid ${color}${alpha}`

  return (
    <>
      {/* L-shaped connector via transparent div borders */}
      <motion.div
        className="absolute pointer-events-none z-[15]"
        style={{
          left: `${connLeft}%`,
          top: `${connTop}%`,
          width: `${Math.max(connW, 0.05)}%`,
          height: `${Math.max(connH, 0.05)}%`,
          borderLeft: compIsLeft ? border : 'none',
          borderRight: !compIsLeft ? border : 'none',
          borderBottom: compIsAbove ? border : 'none',
          borderTop: !compIsAbove ? border : 'none',
          opacity: itemOpacity,
        }}
      />

      {/* Component icon + label */}
      <motion.div
        className="absolute z-20 pointer-events-auto cursor-pointer"
        style={{
          left: `${position.left}%`,
          top: `${position.top}%`,
          x: '-50%',
          y: '-50%',
          opacity: itemOpacity,
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
    </>
  )
}

/* ═══════════════════════════════════════════════════════
   Machine point marker (diamond dot)
   ═══════════════════════════════════════════════════════ */
function MachineDot({ comp, dotOverride, machineVW, machineVH, index, total, scrollYProgress, color, isActive, onHover }) {
  const stagger = index * (0.15 / total)
  const dotOpacity = useTransform(scrollYProgress, [0.68 + stagger, 0.85 + stagger], [0, 1])

  const mp = dotOverride || comp.machinePoint || [50, 50]
  const target = machineToVP(mp[0], mp[1], machineVW, machineVH)

  return (
    <motion.div
      className="absolute z-[18] pointer-events-auto cursor-pointer"
      style={{
        left: `${target.x}%`,
        top: `${target.y}%`,
        x: '-50%',
        y: '-50%',
        opacity: dotOpacity,
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div
        className={`w-2.5 h-2.5 rotate-45 origin-center transition-transform duration-300
                    ${isActive ? 'scale-[2.2]' : 'hover:scale-[1.6]'}`}
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
      <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-6 whitespace-nowrap">
        {product.name}
      </p>

      <h1 className="font-light leading-[1.05] mb-8" style={{ fontSize: 'clamp(1.75rem, 4vw, 3.75rem)' }}>
        {product.heroTitle.split('\n').map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </h1>

      <p className="text-sm text-text-secondary leading-relaxed max-w-md mb-8">
        {product.heroSubtitle}
      </p>

      <div className="flex gap-4 xl:gap-8 mb-8">
        {product.features.slice(0, 3).map((f) => (
          <div key={f.title} className="shrink-0">
            <span className={`text-2xl font-light text-${product.accentColor} whitespace-nowrap`}>{f.value}</span>
            <span className="text-xs text-text-secondary ml-1 whitespace-nowrap">{f.unit}</span>
            <p className="text-[10px] text-text-secondary tracking-wide uppercase mt-1 whitespace-nowrap">{f.title}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <Button href="/catalog.pdf" download variant="primary">Скачать буклет PDF</Button>
        <Button href="#contact" variant="outline">Получить предложение</Button>
      </div>

      <div className="flex items-center gap-6">
        <img src={logoKurs} alt="Курс" className="h-7 w-auto shrink-0" />
        <img src={logoRussia} alt="Сделано в России" className="h-7 w-auto shrink-0" />
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════
   Mobile carousel schema section
   ═══════════════════════════════════════════════════════ */
function MobileRing({ product, color }) {
  const components = product.diagramComponents
  const layout = SCHEMA_LAYOUT[product.slug]
  const [activeIdx, setActiveIdx] = useState(0)
  const [direction, setDirection] = useState(0)

  const go = useCallback((newIdx) => {
    setDirection(newIdx > activeIdx ? 1 : -1)
    setActiveIdx(newIdx)
  }, [activeIdx])

  const next = useCallback(() => go((activeIdx + 1) % components.length), [go, activeIdx, components.length])
  const prev = useCallback(() => go((activeIdx - 1 + components.length) % components.length), [go, activeIdx, components.length])

  const comp = components[activeIdx]
  const dotPos = layout?.[activeIdx]?.dot || comp.machinePoint || [50, 50]

  const cardVariants = {
    enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  }

  return (
    <section className="lg:hidden py-16 bg-bg-alt overflow-hidden">
      <div className="container-luxury">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-3 whitespace-nowrap">
            Устройство
          </p>
          <h2 className="text-2xl font-light">Схема расположения</h2>
        </motion.div>

        {/* Machine image with dot markers */}
        <div className="relative w-full max-w-sm mx-auto mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={product.heroImage}
              alt={product.name}
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* All dot markers — dim inactive, bright active */}
          {components.map((c, i) => {
            const dp = layout?.[i]?.dot || c.machinePoint || [50, 50]
            const isActive = i === activeIdx
            return (
              <motion.button
                key={`mobdot-${i}`}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${dp[0]}%`, top: `${dp[1]}%`, padding: 6 }}
                onClick={() => go(i)}
                animate={{
                  scale: isActive ? 1.15 : 0.85,
                  opacity: isActive ? 1 : 0.65,
                }}
                transition={{ duration: 0.35, ease: EASE }}
                aria-label={c.label || c.name}
              >
                <div
                  className="w-4 h-4 rounded-full border-2 border-white shadow-md flex items-center justify-center"
                  style={{ backgroundColor: color }}
                >
                  <span className="text-[7px] font-bold text-white leading-none">{i + 1}</span>
                </div>
              </motion.button>
            )
          })}

          {/* Pulse ring on active dot */}
          <motion.div
            className="absolute z-[9] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            animate={{ left: `${dotPos[0]}%`, top: `${dotPos[1]}%` }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <span
              className="block w-8 h-8 rounded-full opacity-30 animate-ping"
              style={{ backgroundColor: color }}
            />
          </motion.div>
        </div>

        {/* Carousel card */}
        <div className="relative max-w-sm mx-auto overflow-hidden" style={{ minHeight: 120 }}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activeIdx}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: EASE }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={(_, info) => {
                if (info.offset.x < -40) next()
                else if (info.offset.x > 40) prev()
              }}
              className="flex items-start gap-5 p-5 bg-bg border border-border touch-pan-y cursor-grab active:cursor-grabbing"
            >
              <div className="w-16 h-16 shrink-0 flex items-center justify-center">
                <img
                  src={comp.image}
                  alt={comp.label || comp.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-text mb-1 leading-tight">
                  {comp.label || comp.name}
                </p>
                {comp.specs && (
                  <div className="flex flex-col gap-0.5 mt-2">
                    {(comp.id === 'central-controller'
                      ? comp.specs.filter((s) => s.label === 'Каналы' || s.label === 'Частота измерений')
                      : comp.specs.slice(0, 3)
                    ).map((s) => (
                      <div key={s.label} className="flex justify-between text-[11px]">
                        <span className="text-text-secondary truncate mr-3">{s.label}</span>
                        <span className="font-medium text-text shrink-0">{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation: arrows + dot indicator */}
        <div className="flex items-center justify-center gap-4 mt-5 max-w-sm mx-auto">
          <button
            onClick={prev}
            className="w-9 h-9 flex items-center justify-center border border-border text-text-secondary hover:text-text transition-colors cursor-pointer shrink-0"
            aria-label="Предыдущий компонент"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.2"/></svg>
          </button>

          <div className="flex items-center gap-1.5">
            {components.map((_, i) => (
              <button
                key={`pag-${i}`}
                onClick={() => go(i)}
                className="cursor-pointer p-0.5"
                aria-label={`Компонент ${i + 1}`}
              >
                <motion.div
                  className="rounded-full"
                  animate={{
                    width: i === activeIdx ? 16 : 6,
                    height: 6,
                    backgroundColor: i === activeIdx ? color : 'rgba(128,128,128,0.3)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="w-9 h-9 flex items-center justify-center border border-border text-text-secondary hover:text-text transition-colors cursor-pointer shrink-0"
            aria-label="Следующий компонент"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2"/></svg>
          </button>
        </div>

        {/* Counter */}
        <p className="text-center text-[11px] text-text-secondary tracking-wide mt-3">
          {activeIdx + 1} / {components.length}
        </p>
      </div>
    </section>
  )
}
