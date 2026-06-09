import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Seo from '../../components/Seo'
import video404 from '../../assets/videos/404-bulldozer.mp4'

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
   Зацикленное фоновое видео (бульдозер) + затемнение,
   поверх — «404» и текст белым. Схема как у Hero на главной.
   ═══════════════════════════════════════════════════════ */
export default function NotFoundPage() {
  /* Замедляем фоновое видео. playbackRate — свойство элемента (не атрибут),
     поэтому задаём через ref. 0.8 = чуть медленнее оригинала. */
  const videoRef = useRef(null)
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.8
  }, [])

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

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-dark px-6 pt-20">
        {/* ── Фоновое видео (зацикленное, без звука) ── */}
        <div aria-hidden className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
          >
            <source src={video404} type="video/mp4" />
          </video>
        </div>

        {/* ── Затемнение, чтобы текст читался поверх видео ── */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1] bg-gradient-to-t from-bg-dark/90 via-bg-dark/55 to-bg-dark/75"
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
            className="font-thin leading-none tracking-tight select-none text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.5)]"
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
            className="my-8 h-px w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />

          {/* Описание */}
          <motion.p
            variants={item}
            className="text-base font-light leading-relaxed text-white/60 max-w-md"
          >
            Возможно, страница была перемещена или больше не существует.
            Проверьте адрес, чтобы продолжить.
          </motion.p>
        </motion.div>
      </section>
    </>
  )
}
