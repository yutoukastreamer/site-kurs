import { useEffect } from 'react'
import { useMotionValue, animate } from 'framer-motion'

const DURATION = 1.8                       // сек — длительность авто-проигрыша
const EASE = [0.42, 0, 0.58, 1]            // плавный ease-in-out
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)

/*
 * useScrollScene — прогресс прокрутки «пиннутой» секции (0..1) + авто-проигрыш.
 *
 * scrollProgress ведут:
 *  • обычная прокрутка — scroll-событие (rAF-троттлинг);
 *  • авто-проигрыш — анимационный движок framer-motion (animate()), который
 *    в одном цикле плавно двигает и страницу, и scrollProgress. На время
 *    авто-проигрыша обработчик scroll-события отключён — никаких побочных
 *    пересчётов параллельно не идёт.
 *
 * Один тик колёсика в зоне секции (в любую сторону) запускает плавный
 * проигрыш всей зоны: вниз — к концу, вверх — к началу. Триггер срабатывает
 * мгновенно и симметрично в обе стороны; дальняя кромка по направлению
 * выхода не перехватывается — из секции можно свободно выйти.
 */
export function useScrollScene(containerRef) {
  const scrollProgress = useMotionValue(0)

  useEffect(() => {
    const el = containerRef.current
    if (typeof window === 'undefined' || !el) return

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches

    let autoScrolling = false
    let scrollRaf = null
    let playback = null

    const rangeOf = () => el.offsetHeight - window.innerHeight

    /* ── Обычная прокрутка → прогресс (rAF-троттлинг) ── */
    const readProgress = () => {
      scrollRaf = null
      const range = rangeOf()
      if (range <= 0) return
      scrollProgress.set(clamp01(-el.getBoundingClientRect().top / range))
    }
    const onScroll = () => {
      if (autoScrolling || scrollRaf != null) return
      scrollRaf = requestAnimationFrame(readProgress)
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

      const range = rangeOf()
      if (range <= 0) return

      const delta = e.deltaY
      if (!delta) return

      const rectTop = el.getBoundingClientRect().top
      const vh = window.innerHeight
      const goingDown = delta > 0

      // Зона авто-проигрыша + полэкрана «подхвата» с каждой стороны.
      // Дальняя кромка по направлению выхода исключена.
      const triggerDown = goingDown && rectTop > -range && rectTop <= vh * 0.5
      const triggerUp = !goingDown && rectTop < 0 && rectTop >= -range - vh * 0.5
      if (!triggerDown && !triggerUp) return

      const rectTopAbs = window.scrollY + rectTop
      const startY = window.scrollY
      const targetY = goingDown ? rectTopAbs + range : rectTopAbs
      const diff = targetY - startY
      // Почти на месте — не перехватываем (иначе можно «застрять» у кромки).
      if (Math.abs(diff) < 1) return

      e.preventDefault()
      autoScrolling = true
      playback = animate(startY, targetY, {
        duration: DURATION,
        ease: EASE,
        onUpdate: (y) => {
          // Одна операция: двигаем страницу и сразу выставляем прогресс.
          window.scrollTo(0, y)
          scrollProgress.set(clamp01((y - rectTopAbs) / range))
        },
        onComplete: () => {
          autoScrolling = false
        },
      })
    }
    window.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('wheel', onWheel)
      if (scrollRaf) cancelAnimationFrame(scrollRaf)
      if (playback) playback.stop()
    }
  }, [containerRef, scrollProgress])

  return scrollProgress
}
