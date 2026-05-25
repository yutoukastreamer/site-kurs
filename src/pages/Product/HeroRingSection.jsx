import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, animate, useMotionValueEvent } from 'framer-motion'
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
/* Ease для автоскролл-доводки колёсиком: резкий старт, мягкое
   торможение. У стандартного EASE медленный разгон в первые ~150 мс,
   из-за чего после wheel-перехвата кажется, что страница «зависла»
   перед началом анимации. */
const EASE_SCROLL = [0, 0, 0.25, 1]

/*
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  SCHEMA_LAYOUT — координаты иконок И точек на машине                    ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║                                                                         ║
 * ║  ⚠️  ИСПОЛЬЗУЕТСЯ ТОЛЬКО НА ДЕСКТОПЕ (lg+).                              ║
 * ║      Для мобильной версии — смотри ниже SCHEMA_LAYOUT_MOBILE.           ║
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
    /* 0: ГНСС антенны                  */ { left: 30, top: 32, dot: [22, 7] },
    /* 1: 10.1" консоль с ПО "КУРС"    */ { left: 78, top: 34, dot: [38, 30] },
    /* 2: Призма режима ЛПС (опц.)     */ { left: 56, top: 31, dot: [45, 5] },
    /* 3: Контроллер гидравлики         */ { left: 18, top: 50, dot: [12, 38] },
    /* 4: Инерц. датчик на отвале       */ { left: 80, top: 62, dot: [75, 60] },
    /* 5: Инерц. датчик в кабине        */ { left: 28, top: 75, dot: [28, 61] },
    /* 6: Центральный контроллер        */ { left: 45, top: 86, dot: [17, 37] },
    /* 7: Инерц. датчик на штанге отв.  */ { left: 65, top: 83, dot: [47, 83] },
  ],
  excavator: [
    /* #  название                           left  top    dot: [x, y] на машине   */
    /* 0: Панель управления с ПО «Курс» */ { left: 78, top: 60, dot: [50, 57] },
    /* 1: ГНСС антенны                  */ { left: 23, top: 53, dot: [5, 49] },
    /* 2: Инерц. датчик (стрела)        */ { left: 34, top: 34, dot: [33, 39] },
    /* 3: Инерц. датчик (рукоять)       */ { left: 70, top: 34, dot: [75, 33] },
    /* 4: Инерц. датчик (ковш)          */ { left: 69, top: 82, dot: [ 82, 65] },
    /* 5: Инерц. датчик (корпус)        */ { left: 30, top: 78, dot: [33, 65] },
    /* 6: Центральный контроллер        */ { left: 48, top: 90, dot: [41, 52] },
  ],

  grader: [
    /* #  название                           left  top    dot: [x, y] на машине   */
    /* 0: Панель управления с ПО «Курс» */ { left: 68, top: 35, dot: [40, 40] },
    /* 1: ГНСС антенны                  */ { left: 43, top: 83, dot: [26, 72] },
    /* 2: Инерциальный датчик           */ { left: 77, top: 64, dot: [42, 74] },
    /* 3: Контроллер гидравлики         */ { left: 22, top: 60, dot: [39, 52] },
    /* 4: Центральный контроллер        */ { left: 30, top: 32, dot: [18, 44] },
  ],
}

/*
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  SCHEMA_LAYOUT_MOBILE — координаты точек ТОЛЬКО для мобильной схемы     ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║                                                                         ║
 * ║  Применяется на экранах < lg (< 1024px), т.е. блок «Схема расположения» ║
 * ║  в мобильной карусели (функция MobileRing в этом же файле).             ║
 * ║                                                                         ║
 * ║  На мобильной версии машина показывается во всю ширину карточки,        ║
 * ║  поэтому координаты = проценты ОТНОСИТЕЛЬНО изображения машины:         ║
 * ║                                                                         ║
 * ║  dot: [x, y]                                                             ║
 * ║    x — горизонталь по картинке:  0 = левый край,  100 = правый край     ║
 * ║    y — вертикаль по картинке:    0 = верх,        100 = низ              ║
 * ║                                                                         ║
 * ║  ▸ увеличь x → точка правее     ▸ увеличь y → точка ниже                 ║
 * ║  ▸ уменьши x → точка левее      ▸ уменьши y → точка выше                 ║
 * ║                                                                         ║
 * ║  Индекс в массиве = индекс компонента в product.diagramComponents       ║
 * ║  (порядок должен совпадать с SCHEMA_LAYOUT выше).                       ║
 * ║                                                                         ║
 * ║  Изменения ЗДЕСЬ не влияют на десктоп и наоборот.                       ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */
const SCHEMA_LAYOUT_MOBILE = {
  bulldozer: [
    /* 0: ГНСС антенны                  */ { dot: [22, 7] },
    /* 1: 10.1" консоль с ПО "КУРС"    */ { dot: [38, 30] },
    /* 2: Призма режима ЛПС (опц.)     */ { dot: [45, 5] },
    /* 3: Контроллер гидравлики         */ { dot: [12, 38] },
    /* 4: Инерц. датчик на отвале       */ { dot: [75, 60] },
    /* 5: Инерц. датчик в кабине        */ { dot: [28, 61] },
    /* 6: Центральный контроллер        */ { dot: [17, 37] },
    /* 7: Инерц. датчик на штанге отв.  */ { dot: [47, 83] },
  ],
  excavator: [
    /* 0: Панель управления с ПО «Курс» */ { dot: [50, 57] },
    /* 1: ГНСС антенны                  */ { dot: [5, 49] },
    /* 2: Инерц. датчик (стрела)        */ { dot: [33, 39] },
    /* 3: Инерц. датчик (рукоять)       */ { dot: [75, 33] },
    /* 4: Инерц. датчик (ковш)          */ { dot: [82, 65] },
    /* 5: Инерц. датчик (корпус)        */ { dot: [33, 65] },
    /* 6: Центральный контроллер        */ { dot: [41, 52] },
  ],
  grader: [
    /* 0: Панель управления с ПО «Курс» */ { dot: [40, 40] },
    /* 1: ГНСС антенны                  */ { dot: [26, 72] },
    /* 2: Инерциальный датчик           */ { dot: [42, 74] },
    /* 3: Контроллер гидравлики         */ { dot: [39, 52] },
    /* 4: Центральный контроллер        */ { dot: [18, 44] },
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

/* Переводит координату на машине (mx,my — проценты по картинке машины)
   в координату вьюпорта. box.wPct / box.hPct — фактический размер
   картинки машины в процентах вьюпорта (меряется из DOM). */
function machineToVP(mx, my, box) {
  return {
    x: 50 + (mx / 100 - 0.5) * box.wPct,
    y: 56 + (my / 100 - 0.5) * box.hPct,
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

  /* Нативный прогресс прокрутки пиннутой секции (0..1) — скролл не перехватывается */
  const { scrollYProgress: scrollProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  /* ── Триггерный автоскролл (доводка) ──
     Первый тик колёсика в зоне секции плавно доигрывает сборку схемы до
     конца (или откручивает к началу) и магнитит экран ровно к соседнему
     блоку — секция не может «застрять» посередине. Нативный скролл не
     ломается: перехватывается только тик, запускающий доводку; флаг
     isAnimating глушит повторные тики, пока идёт плавный доскролл. */
  const isAnimatingRef = useRef(false)

  useEffect(() => {
    const EPS = 0.02
    let animation = null
    let releaseTimer = null

    const handleWheel = (e) => {
      const el = containerRef.current
      if (!el) return

      if (isAnimatingRef.current) {
        e.preventDefault()
        return
      }

      const rect = el.getBoundingClientRect()
      const scrollRange = el.offsetHeight - window.innerHeight
      if (scrollRange <= 0) return // мобильная вёрстка / секция скрыта

      // Секция «в зоне», пока её sticky-контейнер удерживает экран
      const inZone = rect.top <= 0 && rect.top >= -scrollRange
      if (!inZone) return

      const dir = e.deltaY
      if (dir === 0) return

      const progress = Math.max(0, Math.min(1, -rect.top / scrollRange))
      const containerTop = window.scrollY + rect.top

      let targetY
      if (dir > 0) {
        if (progress >= 1 - EPS) return // схема собрана — отпускаем вниз
        targetY = containerTop + scrollRange
      } else {
        if (progress <= EPS) return // схема в начале — отпускаем вверх
        targetY = containerTop
      }

      e.preventDefault()
      isAnimatingRef.current = true
      animation = animate(window.scrollY, targetY, {
        duration: 0.9,
        ease: EASE_SCROLL,
        onUpdate: (v) => window.scrollTo(0, v),
        onComplete: () => {
          // короткая пауза гасит инерцию трекпада после доводки
          releaseTimer = setTimeout(() => { isAnimatingRef.current = false }, 120)
        },
      })
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (animation) animation.stop()
      if (releaseTimer) clearTimeout(releaseTimer)
    }
  }, [])

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

  /* Реальный размер картинки машины (после finalRingScale) в процентах
     вьюпорта. Меряется из DOM через ResizeObserver — поэтому точки схемы
     не «разъезжаются» при смене размера экрана, соотношения сторон или
     при срабатывании maxWidth-капа. Стартовое значение — оценка по формуле,
     дальше уточняется измерением. */
  const machineBoxRef = useRef(null)
  const [machineBox, setMachineBox] = useState(() => ({
    wPct: imgVW * finalRingScale,
    hPct: imgVW * finalRingScale * (26 / 19),
  }))

  useEffect(() => {
    const el = machineBoxRef.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      if (!r.width || !r.height) return
      setMachineBox({
        wPct: (r.width / window.innerWidth) * 100 * finalRingScale,
        hPct: (r.height / window.innerHeight) * 100 * finalRingScale,
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [finalRingScale])

  /* ── Desktop scroll transforms (направляются ровно прогрессом скролла) ──
     left/top машины оставлены на декларативном пути Framer Motion — они
     корректно обновляются во всех браузерах. Все opacity/scale, наоборот,
     прокидываются в DOM ИМПЕРАТИВНО через useMotionValueEvent ниже:
     Chromium в связке sticky + scroll-driven MotionValue не применяет
     style.opacity, посчитанный декларативно (DOM-атрибут залипает на
     стартовом значении, хотя сам MotionValue считается верно). Прямая
     запись в element.style.* этот баг обходит. */
  const machineLeft = useTransform(scrollProgress, [0, 0.45], ['25%', '50%'])
  const machineTop = useTransform(scrollProgress, [0, 0.45], ['46%', '56%'])
  const machineScale = useTransform(scrollProgress, [0, 0.45], [1, finalRingScale])
  const heroOpacity = useTransform(scrollProgress, [0, 0.25], [1, 0])
  const titleOpacity = useTransform(scrollProgress, [0.50, 0.62], [0, 1])
  const bgOpacity = useTransform(scrollProgress, [0.20, 0.40], [0, 1])

  /* Императивные рефы — см. комментарий выше */
  const machineScaleRef = useRef(null)
  const heroTextRef = useRef(null)
  const titleRef = useRef(null)
  const bgRef = useRef(null)

  useMotionValueEvent(machineScale, 'change', (v) => {
    const el = machineScaleRef.current
    if (el) el.style.transform = `scale(${v})`
  })
  useMotionValueEvent(heroOpacity, 'change', (v) => {
    const el = heroTextRef.current
    if (!el) return
    el.style.opacity = v
    el.style.pointerEvents = v > 0.05 ? 'auto' : 'none'
  })
  useMotionValueEvent(titleOpacity, 'change', (v) => {
    const el = titleRef.current
    if (el) el.style.opacity = v
  })
  useMotionValueEvent(bgOpacity, 'change', (v) => {
    const el = bgRef.current
    if (el) el.style.opacity = v
  })

  return (
    <>
      {/* ══════ DESKTOP — pinned scroll animation ══════ */}
      <div ref={containerRef} className="hidden lg:block relative" style={{ height: '200vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-bg">

          {/* Background transition: bg → bg-alt
              opacity ставится императивно (см. useMotionValueEvent выше),
              стартовое значение 0 в inline-style — чтобы до первого тика
              скролла фон оставался скрытым. */}
          <div
            ref={bgRef}
            className="absolute inset-0 bg-bg-alt"
            style={{ opacity: 0 }}
          />

          {/* Machine image — scroll-linked position & scale */}
          <motion.div
            className="absolute z-[5] pointer-events-none"
            style={{ left: machineLeft, top: machineTop }}
          >
            <div ref={machineBoxRef} className="-translate-x-1/2 -translate-y-1/2" style={{ width: `${imgVW}vw`, maxWidth: `${Math.round(imgVW * 16.25)}px` }}>
              <div ref={machineScaleRef} className="origin-center" style={{ transform: 'scale(1)' }}>
                <img
                  src={product.heroImage}
                  alt={product.name}
                  className="w-full h-auto object-contain drop-shadow-lg animate-fade-in"
                />
              </div>
            </div>
          </motion.div>

          {/* Hero text — всегда в DOM (без ремоунта), управляется opacity.
              opacity и pointer-events ставятся императивно (см. выше). */}
          <div
            ref={heroTextRef}
            className="absolute right-[4%] xl:right-[8%] top-0 bottom-0 w-[45%] xl:w-[42%] max-w-xl flex items-center z-20"
            style={{ opacity: 1 }}
          >
            <div className={`border-l-2 ${ACCENT_BORDER[product.accentColor]} pl-4 xl:pl-8 animate-hero-enter`}>
              <HeroText product={product} />
            </div>
          </div>

          {/* ── Schema overlay — relative container, safe bounds via clampPos ── */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="relative w-full h-full">

              {/* Ring heading — starts exactly when machine animation ends.
                  opacity ставится императивно (см. useMotionValueEvent выше). */}
              <div
                ref={titleRef}
                className="absolute left-1/2 text-center z-30 pointer-events-none"
                style={{ opacity: 0, transform: 'translateX(-50%)', top: '14%' }}
              >
                <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-2 whitespace-nowrap">
                  Устройство
                </p>
                <h2 className="font-light whitespace-nowrap" style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.875rem)' }}>
                  Схема расположения компонентов
                </h2>
              </div>

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
                    machineBox={machineBox}
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
                    machineBox={machineBox}
                    index={i}
                    total={components.length}
                    scrollYProgress={scrollProgress}
                    color={color}
                    isActive={activeIndex === i}
                    onHover={(active) => setActiveIndex(active ? i : null)}
                  />
                )
              })}

              {/* ── Hover side panel: enlarged image + name ── */}
              <AnimatePresence>
                {activeIndex !== null && (() => {
                  const ac = components[activeIndex]
                  const fromRight = ringPositions[activeIndex].left < 50
                  return (
                    <HoverPanel
                      key={activeIndex}
                      comp={ac}
                      color={color}
                      fromRight={fromRight}
                    />
                  )
                })()}
              </AnimatePresence>
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
function SchemaItem({ comp, position, dotOverride, index, total, scrollYProgress, color, machineBox, isActive, onHover }) {
  /* Тайминги (доли scrollProgress):
     — Иконки появляются по кругу:   0.55 → 0.77  (по индексу)
     — Линии-коннекторы:             0.77 → 0.87  (после иконок)
     Ромбы на машине — см. MachineDot.
     opacity для иконки и линии прокидываем в DOM императивно через
     useMotionValueEvent — обход бага композитора Chromium (sticky +
     scroll-driven MotionValue декларативно не дочитывается). */
  const iconStagger = index * (0.17 / total)
  const iconOpacity = useTransform(
    scrollYProgress,
    [0.55 + iconStagger, 0.60 + iconStagger],
    [0, 1]
  )
  const lineStagger = index * (0.08 / total)
  const lineOpacity = useTransform(
    scrollYProgress,
    [0.77 + lineStagger, 0.82 + lineStagger],
    [0, 1]
  )

  const iconRef = useRef(null)
  const lineRef = useRef(null)
  useMotionValueEvent(iconOpacity, 'change', (v) => {
    const el = iconRef.current
    if (!el) return
    el.style.opacity = v
    /* Пока иконка не проявилась — не перехватываем курсор, иначе
       невидимый спрайт ворует hover у кнопки в hero-блоке. */
    el.style.pointerEvents = v > 0.5 ? 'auto' : 'none'
  })
  useMotionValueEvent(lineOpacity, 'change', (v) => {
    const el = lineRef.current
    if (el) el.style.opacity = v
  })

  const mp = dotOverride || comp.machinePoint || [50, 50]
  const target = machineToVP(mp[0], mp[1], machineBox)

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
      <div
        ref={lineRef}
        className="absolute pointer-events-none z-[10]"
        style={{
          left: `${connLeft}%`,
          top: `${connTop}%`,
          width: `${Math.max(connW, 0.05)}%`,
          height: `${Math.max(connH, 0.05)}%`,
          borderLeft: compIsLeft ? border : 'none',
          borderRight: !compIsLeft ? border : 'none',
          borderBottom: compIsAbove ? border : 'none',
          borderTop: !compIsAbove ? border : 'none',
          opacity: 0,
        }}
      />

      {/* Component icon + label */}
      <div
        ref={iconRef}
        className="absolute z-20 cursor-pointer"
        style={{
          left: `${position.left}%`,
          top: `${position.top}%`,
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          pointerEvents: 'none',
        }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <div className={`flex flex-col items-center origin-center
                          transition-transform duration-300 ease-out
                          ${isActive ? 'scale-110' : ''}`}>
          <div className="flex items-end justify-center"
               style={{
                 width: comp.imageScale ? `${5 * comp.imageScale}rem` : '5rem',
                 maxHeight: comp.imageScale ? `${5 * comp.imageScale}rem` : '5rem',
               }}>
            <img src={comp.image} alt={comp.name} className="max-w-full max-h-full h-auto object-contain drop-shadow-sm" />
          </div>
        </div>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════
   Machine point marker (diamond dot)
   ═══════════════════════════════════════════════════════ */
function MachineDot({ comp, dotOverride, machineBox, index, total, scrollYProgress, color, isActive, onHover }) {
  // Ромбы — финальная фаза, по той же круговой очерёдности, после линий.
  // opacity ставится императивно — обход бага композитора Chromium.
  const stagger = index * (0.06 / total)
  const dotOpacity = useTransform(
    scrollYProgress,
    [0.87 + stagger, 0.92 + stagger],
    [0, 1]
  )

  const dotRef = useRef(null)
  useMotionValueEvent(dotOpacity, 'change', (v) => {
    const el = dotRef.current
    if (!el) return
    el.style.opacity = v
    el.style.pointerEvents = v > 0.5 ? 'auto' : 'none'
  })

  const mp = dotOverride || comp.machinePoint || [50, 50]
  const target = machineToVP(mp[0], mp[1], machineBox)

  return (
    <div
      ref={dotRef}
      className="absolute z-[15] cursor-pointer"
      style={{
        left: `${target.x}%`,
        top: `${target.y}%`,
        transform: 'translate(-50%, -50%)',
        opacity: 0,
        pointerEvents: 'none',
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div
        className={`w-2.5 h-2.5 rotate-45 origin-center transition-transform duration-300
                    ${isActive ? 'scale-[2.2]' : 'hover:scale-[1.6]'}`}
        style={{ backgroundColor: color }}
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   Hover panel — slides in from the page edge on hover.
   Component on LEFT half  →  panel slides in from the RIGHT
   Component on RIGHT half →  panel slides in from the LEFT
   ═══════════════════════════════════════════════════════ */
function HoverPanel({ comp, color, fromRight }) {
  const offsetPx = 420 // off-screen start distance
  /* Масштаб картинки в панели наведения. Мелкие компоненты (призма,
     imageScale < 1) показываем с фиксированным масштабом 0.325;
     компоненты с imageScale ≥ 1 не раздуваем (потолок 1). */
  const rawScale = comp.imageScale ?? 1
  const imgScale = rawScale < 1 ? 0.325 : 1
  return (
    <motion.div
      initial={{ x: fromRight ? offsetPx : -offsetPx, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: fromRight ? offsetPx : -offsetPx, opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute z-30 pointer-events-none ${fromRight ? 'right-4 xl:right-10' : 'left-4 xl:left-10'}`}
      style={{ top: '50%', y: '-50%', width: '19rem' }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          backgroundColor: '#1A1F2A',
          borderRadius: '14px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.05)',
        }}
      >
        {/* Accent vertical bar on the schema-facing edge */}
        <div
          className={`absolute top-0 bottom-0 w-[2px] ${fromRight ? 'left-0' : 'right-0'}`}
          style={{ backgroundColor: color }}
        />

        {/* Decorative corner ticks */}
        <span className="absolute top-3 left-3 w-3 h-px bg-white/15" />
        <span className="absolute top-3 left-3 w-px h-3 bg-white/15" />
        <span className="absolute top-3 right-3 w-3 h-px bg-white/15" />
        <span className="absolute top-3 right-3 w-px h-3 bg-white/15" />
        <span className="absolute bottom-3 left-3 w-3 h-px bg-white/15" />
        <span className="absolute bottom-3 left-3 w-px h-3 bg-white/15" />
        <span className="absolute bottom-3 right-3 w-3 h-px bg-white/15" />
        <span className="absolute bottom-3 right-3 w-px h-3 bg-white/15" />

        {/* Image area with subtle accent-colored radial glow */}
        <div className="relative aspect-[4/3] flex items-center justify-center">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at center, ${color}26 0%, transparent 65%)`,
            }}
          />
          <img
            src={comp.image}
            alt={comp.name}
            className="relative object-contain"
            style={{
              maxWidth: `${65 * imgScale}%`,
              maxHeight: `${78 * imgScale}%`,
              filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.55))',
            }}
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.08]" />

        {/* Text area */}
        <div className="px-6 py-5">
          <p
            className="text-[10px] font-medium tracking-[0.32em] uppercase mb-2"
            style={{ color, opacity: 0.85 }}
          >
            Компонент
          </p>
          <h3 className="text-base xl:text-lg font-light leading-snug text-white whitespace-pre-line">
            {comp.label || comp.name}
          </h3>
        </div>
      </div>
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
  /* Мобильный layout — редактируй SCHEMA_LAYOUT_MOBILE в шапке файла */
  const layout = SCHEMA_LAYOUT_MOBILE[product.slug]
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
