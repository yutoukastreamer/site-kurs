import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import SectionReveal from '../../components/ui/SectionReveal'

/* ─── 6 преимуществ с SVG-иконками ─── */
const advantages = [
  {
    title: 'Российское производство',
    description: 'Полный цикл разработки и сборки в России — независимость от импортных поставок',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10">
        <rect x="6" y="14" width="36" height="24" rx="2" />
        <path d="M6 22h36M6 30h36" />
        <path d="M24 6v8M20 8l4-2 4 2" />
      </svg>
    ),
  },
  {
    title: 'Точность ±2 мм',
    description: 'Высочайшая точность позиционирования в классе — на уровне лучших мировых аналогов',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10">
        <circle cx="24" cy="24" r="18" />
        <circle cx="24" cy="24" r="12" />
        <circle cx="24" cy="24" r="6" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Техподдержка 24/7',
    description: 'Русскоязычная техническая поддержка без языковых барьеров и часовых поясов',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10">
        <path d="M12 26V20a12 12 0 0124 0v6" />
        <rect x="6" y="26" width="6" height="12" rx="2" />
        <rect x="36" y="26" width="6" height="12" rx="2" />
        <path d="M42 38v2a4 4 0 01-4 4h-8" />
        <rect x="26" y="42" width="8" height="4" rx="2" />
      </svg>
    ),
  },
  {
    title: 'Быстрый монтаж',
    description: 'Установка за 30 минут без специального инструмента — минимальный простой техники',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10">
        <circle cx="24" cy="24" r="18" />
        <path d="M24 12v12l8 8" strokeLinecap="round" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Защита IP67/IP68',
    description: 'Работа в экстремальных условиях: пыль, вода, вибрация, температура от −40°C до +65°C',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10">
        <path d="M24 4L8 14v12c0 10 7 16 16 20 9-4 16-10 16-20V14L24 4z" />
        <path d="M18 24l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Совместимость',
    description: 'Универсальная установка на технику любых марок — CAT, Komatsu, Shantui, ЧЕТРА и др.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10">
        <rect x="4" y="18" width="12" height="12" rx="2" />
        <rect x="18" y="18" width="12" height="12" rx="2" />
        <rect x="32" y="18" width="12" height="12" rx="2" />
        <path d="M10 18v-6h28v6M24 12V8" />
      </svg>
    ),
  },
]

function AdvantageCard({ item, index }) {
  const { ref, isInView } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group p-6 lg:p-8 border border-border/60 hover:border-border bg-bg transition-colors duration-500"
    >
      {/* Icon */}
      <div className="text-text-secondary mb-5 transition-colors duration-500 group-hover:text-text">
        {item.icon}
      </div>

      {/* Text */}
      <h3 className="text-base font-medium mb-2 leading-snug whitespace-nowrap">{item.title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
    </motion.div>
  )
}

export default function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-36 bg-bg-alt">
      <div className="container-luxury">
        <SectionReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-20 gap-6">
            <div className="shrink-0">
              <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-4 whitespace-nowrap">
                Преимущества
              </p>
              <h2 className="font-light" style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3rem)' }}>
                Почему выбирают нас
              </h2>
            </div>
            <p className="text-sm text-text-secondary max-w-md leading-relaxed">
              Первые отечественные 3D системы нивелирования — разработаны инженерами,
              проверены на строительных площадках по всей России.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {advantages.map((item, i) => (
            <AdvantageCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
