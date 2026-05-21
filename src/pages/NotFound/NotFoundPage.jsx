import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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
   404 — standalone full-screen page (без Header / Footer)
   ═══════════════════════════════════════════════════════ */
export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Страница не найдена — КУРС"
        description="Запрашиваемая страница не существует или была перемещена."
        path="/404"
      />

      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-dark px-6">
        {/* ── Мягкое размытое свечение в тон акцентных цветов техники ── */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -top-[15%] -left-[10%] w-[38rem] h-[38rem] rounded-full bg-bulldozer/25 blur-[140px]"
            animate={{ scale: [1, 1.12, 1], opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[18%] -right-[12%] w-[34rem] h-[34rem] rounded-full bg-excavator/20 blur-[140px]"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-[22%] left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-grader/20 blur-[150px]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Лёгкая виньетка — углы остаются глубокими */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* ── Контент ── */}
        <motion.div
          className="relative z-10 flex flex-col items-center text-center max-w-xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Крупное «404» — градиент из акцентных цветов техники */}
          <motion.div
            variants={item}
            className="font-thin leading-none tracking-tight select-none
                       text-transparent bg-clip-text
                       bg-gradient-to-r from-bulldozer via-grader to-excavator"
            style={{ fontSize: 'clamp(7rem, 22vw, 16rem)' }}
          >
            404
          </motion.div>

          {/* Заголовок */}
          <motion.h1
            variants={item}
            className="font-light text-text-light mt-2"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            Страница не найдена
          </motion.h1>

          {/* Тонкий акцентный разделитель */}
          <motion.div
            variants={item}
            className="my-8 h-px w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />

          {/* Описание */}
          <motion.p
            variants={item}
            className="text-base font-light leading-relaxed text-white/35 max-w-md"
          >
            Возможно, страница была перемещена или больше не существует.
            Проверьте адрес или вернитесь на главную, чтобы продолжить.
          </motion.p>

          {/* Кнопка возврата на главную */}
          <motion.div variants={item} className="mt-12">
            <Link
              to="/"
              className="group inline-flex items-center gap-3 px-8 py-3.5 border border-white/25
                         text-white text-[11px] font-medium tracking-[0.15em] uppercase
                         transition-all duration-300 hover:bg-white hover:text-bg-dark"
            >
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                <path
                  d="M5 1L1 5l4 4M1 5h14"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              На главную
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </>
  )
}
