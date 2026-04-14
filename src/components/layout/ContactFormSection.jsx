import { useEffect, useRef } from 'react'
import SectionReveal from '../ui/SectionReveal'

/**
 * Блок обратной связи — форма подгружается из Битрикс24.
 *
 * Как подключить:
 * 1. В Битрикс24 → CRM → Формы → создайте форму
 * 2. Скопируйте скрипт встраивания (тег <script>)
 * 3. Вставьте URL скрипта в переменную BITRIX_FORM_SCRIPT ниже
 * 4. Или вставьте полный HTML-код формы в div#bitrix-form
 */

// TODO: Заменить на реальный URL скрипта Битрикс-формы
// const BITRIX_FORM_SCRIPT = 'https://your-portal.bitrix24.ru/bitrix/js/crm/form_loader.js'

export default function ContactFormSection() {
  const formContainerRef = useRef(null)

  /* Uncomment when Bitrix script is ready:
  useEffect(() => {
    const script = document.createElement('script')
    script.src = BITRIX_FORM_SCRIPT
    script.async = true
    formContainerRef.current?.appendChild(script)
    return () => script.remove()
  }, [])
  */

  return (
    <section id="contact" className="py-20 lg:py-28 bg-bg-dark">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — heading + text */}
          <SectionReveal>
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-white/40 mb-4 whitespace-nowrap">
              Обратная связь
            </p>
            <h2 className="font-light mb-6 text-white leading-tight" style={{ fontSize: 'clamp(1.875rem, 3vw, 2.25rem)' }}>
              Оставьте заявку
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-md">
              Заполните форму, и наш специалист свяжется с вами в ближайшее время.
              Мы подберём оптимальное решение для вашей техники и задач.
            </p>
          </SectionReveal>

          {/* Right — Bitrix form container */}
          <SectionReveal delay={0.2}>
            <div
              ref={formContainerRef}
              className="bg-white/[0.03] border border-white/10 p-6 lg:p-8"
            >
              {/*
                Сюда Битрикс вставит свою форму автоматически.
                Пока форма не подключена — показываем placeholder-поля.
              */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-white/40 mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    className="w-full bg-transparent border border-white/15 px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-white/40 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-transparent border border-white/15 px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-white/40 mb-2">
                    Комментарий
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Какая техника, задачи..."
                    className="w-full bg-transparent border border-white/15 px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="button"
                  className="w-full px-8 py-3.5 border border-white/30 text-white text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-white hover:text-bg-dark transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  Отправить заявку
                </button>
                <p className="text-[10px] text-white/20 leading-relaxed">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
