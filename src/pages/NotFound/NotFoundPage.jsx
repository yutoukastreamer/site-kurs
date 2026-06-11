import { useEffect } from 'react'
import { Link } from 'react-router-dom'
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
   Сплошной синий фон акцентного цвета бульдозера (#3B6B9C),
   поверх — крупное «404», заголовок, описание и кнопка
   возврата на главную. Без фонового видео.
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

      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20"
        style={{
          background:
            'radial-gradient(ellipse 120% 90% at 50% 30%, #4D7DB0 0%, #3B6B9C 42%, #2A4E73 100%)',
        }}
      >
        {/* ── Едва заметный «водяной знак» 404 на фоне для глубины ── */}
        <span
          aria-hidden
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center font-thin leading-none text-white/[0.05]"
          style={{ fontSize: 'clamp(18rem, 60vw, 44rem)' }}
        >
          404
        </span>

        {/* ── Тонкая виньетка по краям, чтобы текст в центре читался ── */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(20,38,58,0.45)_100%)]"
        />

        {/* ── Контент ── */}
        <motion.div
          className="relative z-10 flex flex-col items-center text-center max-w-xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Крупное «404» */}
          <motion.div
            variants={item}
            className="font-thin leading-none tracking-tight select-none text-white drop-shadow-[0_4px_40px_rgba(20,38,58,0.45)]"
            style={{ fontSize: 'clamp(7rem, 22vw, 16rem)' }}
          >
            404
          </motion.div>

          {/* Заголовок */}
          <motion.h1
            variants={item}
            className="font-light text-white mt-2"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            Страница не найдена
          </motion.h1>

          {/* Тонкий акцентный разделитель */}
          <motion.div
            variants={item}
            className="my-8 h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />

          {/* Описание */}
          <motion.p
            variants={item}
            className="text-base font-light leading-relaxed text-white/70 max-w-md"
          >
            Возможно, страница была перемещена или больше не существует.
            Проверьте адрес или вернитесь на главную.
          </motion.p>

          {/* Кнопка возврата на главную */}
          <motion.div variants={item} className="mt-10">
            <Link
              to="/"
              className="inline-block px-8 py-3.5 border border-white/40 text-white text-[11px] font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:bg-white hover:text-bulldozer"
            >
              На главную
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
