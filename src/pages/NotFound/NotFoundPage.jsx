import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Seo from '../../components/Seo'

const EASE = [0.25, 0.1, 0.25, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

/* ═══════════════════════════════════════════════════════
   404 — внутри общего Layout (с Header / Footer).
   Светлая палитра «Arctic Precision», как весь сайт.
   ═══════════════════════════════════════════════════════ */
export default function NotFoundPage() {
  /* Скрываем плавающий виджет Битрикс24 ТОЛЬКО на странице 404.
     При уходе на любую другую страницу стиль удаляется — виджет возвращается. */
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent =
      '.b24-widget-button-wrapper,.b24-widget-button-popup,.b24-widget-button-shadow{display:none!important;}'
    document.head.appendChild(style)
    return () => style.remove()
  }, [])

  return (
    <>
      <Seo
        title="Страница не найдена — КУРС"
        description="Запрашиваемая страница не существует или была перемещена."
        path="/404"
      />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg px-6 pt-20">
        {/* ── Мягкое холодное свечение в тон акцентных цветов техники ── */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -top-[15%] -left-[10%] w-[38rem] h-[38rem] rounded-full bg-bulldozer/10 blur-[150px]"
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-[20%] right-[5%] w-[34rem] h-[34rem] rounded-full bg-grader/10 blur-[150px]"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* ── Контент ── */}
        <motion.div
          className="relative z-10 flex flex-col items-center text-center max-w-xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Крупное «404» — один цвет */}
          <motion.div
            variants={item}
            className="font-thin leading-none tracking-tight select-none text-text"
            style={{ fontSize: 'clamp(7rem, 22vw, 16rem)' }}
          >
            404
          </motion.div>

          {/* Заголовок */}
          <motion.h1
            variants={item}
            className="font-light text-text mt-2"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            Страница не найдена
          </motion.h1>

          {/* Тонкий акцентный разделитель */}
          <motion.div
            variants={item}
            className="my-8 h-px w-20 bg-gradient-to-r from-transparent via-border to-transparent"
          />

          {/* Описание */}
          <motion.p
            variants={item}
            className="text-base font-light leading-relaxed text-text-secondary max-w-md"
          >
            Возможно, страница была перемещена или больше не существует.
            Проверьте адрес, чтобы продолжить.
          </motion.p>
        </motion.div>
      </section>
    </>
  )
}
