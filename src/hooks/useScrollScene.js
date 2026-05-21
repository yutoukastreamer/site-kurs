import { useEffect } from 'react'
import { useMotionValue } from 'framer-motion'

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)

/*
 * useScrollScene — прогресс прокрутки «пиннутой» секции (0..1) + авто-проигрыш.
 *
 * Возвращает MotionValue `scrollProgress`, который ведут:
 *  • при обычной прокрутке — scroll-событие (rAF-троттлинг);
 *  • при авто-проигрыше — ОДИН rAF-цикл, который одновременно двигает
 *    страницу и выставляет scrollProgress. Во время авто-проигрыша
 *    обработчик scroll-события отключён — никаких побочных пересчётов
 *    и getBoundingClientRect параллельно не выполняется.
 *
 * Один тик колёсика в зоне секции запускает плавную прокрутку всей зоны.
 * Триггер срабатывает мгновенно — как только секция занимает верхнюю
 * половину экрана (вниз) или находится в своей зоне (вверх).
 */
export function useScrollScene(containerRef, { duration = 1100 } = {}) {
  const scrollProgress = useMotionValue(0)

  useEffect(() => {
    const el = containerRef.current
    if (typeof window === 'undefined' || !el) return

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches

    let autoScrolling = false
    let scrollRaf = null
    let animRaf = null

    /* ── Обычная прокрутка → прогресс (rAF-троттлинг) ── */
    const readProgress = () => {
      scrollRaf = null
      if (autoScrolling) return
      const range = el.offsetHeight - window.innerHeight
      if (range <= 0) return
      scrollProgress.set(clamp01(-el.getBoundingClientRect().top / range))
    }
    const onScroll = () => {
      if (scrollRaf == null) scrollRaf = requestAnimationFrame(readProgress)
    }
    readProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    /* ── Авто-проигрыш по колёсику (только десктоп) ── */
    const onWheel = (e) => {
      if (!isDesktop) return
      if (autoScrolling) {
        e.preventDefault()
        return
      }

      const range = el.offsetHeight - window.innerHeight
      if (range <= 0) return

      const delta = e.deltaY
      if (!delta) return

      const rectTop = el.getBoundingClientRect().top
      const vh = window.innerHeight
      const goingDown = delta > 0

      // Вниз: секция активна, как только её верх в верхней половине экрана.
      // Вверх: пока секция находится в пределах своей зоны.
      const triggerDown = goingDown && rectTop <= vh * 0.5 && rectTop > -range
      const triggerUp = !goingDown && rectTop <= 0 && rectTop >= -range
      if (!triggerDown && !triggerUp) return

      e.preventDefault()

      const rectTopAbs = window.scrollY + rectTop
      const startY = window.scrollY
      const targetY = goingDown ? rectTopAbs + range : rectTopAbs
      const diff = targetY - startY
      if (Math.abs(diff) < 1) return

      autoScrolling = true
      const startTime = performance.now()
      const step = (now) => {
        const t = Math.min((now - startTime) / duration, 1)
        const y = startY + diff * easeInOutCubic(t)
        // Одна операция: двигаем страницу и СРАЗУ выставляем прогресс —
        // визуальная анимация идёт синхронно, без лага и побочных событий.
        window.scrollTo(0, y)
        scrollProgress.set(clamp01((y - rectTopAbs) / range))
        if (t < 1) {
          animRaf = requestAnimationFrame(step)
        } else {
          autoScrolling = false
        }
      }
      animRaf = requestAnimationFrame(step)
    }
    window.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('wheel', onWheel)
      if (scrollRaf) cancelAnimationFrame(scrollRaf)
      if (animRaf) cancelAnimationFrame(animRaf)
    }
  }, [containerRef, scrollProgress, duration])

  return scrollProgress
}
