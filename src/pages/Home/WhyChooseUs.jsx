import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import SectionReveal from '../../components/ui/SectionReveal'

const advantages = [
  {
    title: 'Инерциальные датчики с заводской калибровкой, термокомпенсацией и широким динамическим диапазоном',
    description: 'Стабильность работы в разных условиях.',
  },
  {
    title: 'Модульный принцип при разработке системы',
    description: 'Гибкость конфигурирования и взаимозаменяемость компонентов системы для разных типов машин.',
  },
  {
    title: 'ПО для управления системой нивелирования КУРС внесено в Реестр Российского программного обеспечения',
    description: 'Запись №28186 от 19 мая 2025 г.',
  },
  {
    title: 'Управление при помощи ГНСС приемника и/или роботизированного тахеометра',
    description: 'Система может работать в условиях подавления спутниковых сигналов.',
  },
]

function AdvantageCard({ item, index }) {
  const { ref, isInView } = useScrollReveal()
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group p-8 lg:p-10 border border-border/60 hover:border-border bg-bg transition-colors duration-500"
    >
      <span
        className="block font-light leading-none text-bulldozer"
        style={{ fontSize: 'clamp(2.75rem, 4vw, 3.75rem)' }}
      >
        {number}
      </span>
      <span className="block w-10 h-px bg-bulldozer/40 mt-3 mb-6" />
      <h3 className="text-base lg:text-lg font-medium mb-3 leading-snug">{item.title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
    </motion.div>
  )
}

export default function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-36 bg-bg-alt">
      <div className="container-luxury">
        <SectionReveal>
          <div className="mb-16 lg:mb-20">
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-4 whitespace-nowrap">
              Преимущества
            </p>
            <h2 className="font-light" style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3rem)' }}>
              Почему выбирают нас
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {advantages.map((item, i) => (
            <AdvantageCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
