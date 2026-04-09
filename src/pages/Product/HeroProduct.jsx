import { motion } from 'framer-motion'
import logoKurs from '../../assets/images/logos/logo-kurs.png'
import logoRussia from '../../assets/images/logos/logo-made-in-russia.png'
import Button from '../../components/ui/Button'

const accentBorder = {
  bulldozer: 'border-l-bulldozer',
  excavator: 'border-l-excavator',
  grader: 'border-l-grader',
}

export default function HeroProduct({ product }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg">
      <div className="container-luxury relative z-10 pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Left — Machine image */}
          <motion.div
            className="flex items-center justify-center order-2 lg:order-1"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img
              src={product.heroImage}
              alt={product.name}
              className="w-full max-w-lg h-auto object-contain"
            />
          </motion.div>

          {/* Right — Text */}
          <div className={`order-1 lg:order-2 border-l-2 ${accentBorder[product.accentColor]} pl-8`}>
            <motion.p
              className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {product.name}
            </motion.p>

            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {product.heroTitle.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </motion.h1>

            <motion.p
              className="text-sm text-text-secondary leading-relaxed max-w-md mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              {product.heroSubtitle}
            </motion.p>

            {/* Quick specs */}
            <motion.div
              className="flex gap-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {product.features.slice(0, 3).map((f) => (
                <div key={f.title}>
                  <span className={`text-2xl font-light text-${product.accentColor}`}>{f.value}</span>
                  <span className="text-xs text-text-secondary ml-1">{f.unit}</span>
                  <p className="text-[10px] text-text-secondary tracking-wide uppercase mt-1">{f.title}</p>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button href="#" variant="primary">Скачать буклет PDF</Button>
              <Button href="#contact" variant="outline">Получить предложение</Button>
            </motion.div>

            {/* Logos */}
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <img src={logoKurs} alt="Курс" className="h-7 w-auto opacity-30" />
              <img src={logoRussia} alt="Сделано в России" className="h-7 w-auto opacity-30" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
