import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import SectionReveal from '../../components/ui/SectionReveal'
import { products } from '../../data/products.config'

const machines = Object.values(products).map((p) => ({
  slug: p.slug,
  name: p.name,
  system: p.systemName,
  image: p.cardImage,
  imageColor: p.cardImageColor || p.cardImage, // цветная версия (или та же)
  accent: `bg-${p.accentColor}`,
  accentText: `text-${p.accentColor}`,
  feature: p.features[0]?.title === 'Точность'
    ? `${p.features[0].value} ${p.features[0].unit}`
    : p.features[1]
      ? `${p.features[1].value} ${p.features[1].unit}`
      : '',
}))

function ProductCard({ machine, index }) {
  const { ref, isInView } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link to={`/${machine.slug}`} className="group block">
        {/* Image — grayscale → color + zoom on hover */}
        <div className="relative aspect-[4/3] bg-bg-alt mb-6 overflow-hidden">
          {/* B&W layer (default) */}
          <img
            src={machine.image}
            alt={machine.name}
            className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.08]"
          />
          {/* Color layer (appears on hover) */}
          <img
            src={machine.imageColor}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.08]"
          />
          {/* Accent bar on hover */}
          <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full ${machine.accent} transition-all duration-700 z-10`} />
        </div>

        {/* Text */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-light mb-1">{machine.system}</h3>
            <p className="text-[12px] text-text-secondary tracking-wide uppercase">
              {machine.name}
            </p>
          </div>
        </div>

        {/* Arrow */}
        <div className="mt-4 flex items-center gap-2 text-text-secondary group-hover:text-text transition-colors">
          <span className="text-[11px] tracking-[0.15em] uppercase font-medium">Подробнее</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ProductsPreview() {
  return (
    <section id="products" className="py-24 lg:py-36 bg-bg">
      <div className="container-luxury">
        <SectionReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-20 gap-6">
            <div>
              <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-4">
                Продукция
              </p>
              <h2 className="text-3xl lg:text-5xl font-light">
                3D системы нивелирования
              </h2>
            </div>
            <p className="text-sm text-text-secondary max-w-md leading-relaxed">
              Три специализированных решения для основных типов землеройной техники.
              Каждая система спроектирована под уникальные задачи машины.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {machines.map((machine, i) => (
            <ProductCard key={machine.slug} machine={machine} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
