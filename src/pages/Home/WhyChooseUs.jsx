import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import SectionReveal from '../../components/ui/SectionReveal'
import { Monitor, Puzzle, Brain, ShieldCheck, RussianRuble, House } from 'lucide-react'

const advantages = [
  {
    title: 'Удобный и понятный интерфейс',
    description: 'Интуитивно понятный интерфейс — оператор осваивает систему за минуты, а не дни',
    Icon: Monitor,
  },
  {
    title: 'Минимум кабелей, модульность',
    description: 'Модульная архитектура и минимальный набор кабелей — быстрый монтаж без лишних соединений',
    Icon: Puzzle,
  },
  {
    title: 'Интеллектуальные алгоритмы',
    description: 'Умные алгоритмы обработки сигналов обеспечивают высокую точность в реальном времени',
    Icon: Brain,
  },
  {
    title: 'Ударопрочные датчики',
    description: 'Высоконадёжные датчики выдерживают экстремальные вибрации, удары и температуры от −40 до +65°C',
    Icon: ShieldCheck,
  },
  {
    title: 'Разумная цена в рублях',
    description: 'Качество мирового уровня по конкурентной цене в рублях — без переплат за импорт и курсовых рисков',
    Icon: RussianRuble,
  },
  {
    title: 'Российское производство',
    description: 'Полный цикл разработки и сборки в России — независимость от импортных поставок',
    Icon: House,
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
      <div className="text-bulldozer mb-5">
        <item.Icon size={40} strokeWidth={1.5} />
      </div>
      <h3 className="text-base font-medium mb-2 leading-snug">{item.title}</h3>
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
