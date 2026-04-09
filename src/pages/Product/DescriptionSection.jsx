import SectionReveal from '../../components/ui/SectionReveal'

export default function DescriptionSection({ product }) {
  return (
    <section className="py-24 lg:py-36 bg-bg">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <SectionReveal>
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-4">
              О системе
            </p>
            <h2 className="text-3xl lg:text-4xl font-light mb-8 leading-tight">
              Инженерное совершенство в каждой детали
            </h2>
            <p className="text-text-secondary leading-relaxed text-base mb-8">
              {product.description}
            </p>
            <div className="divider-accent" />
          </SectionReveal>

          {/* System image */}
          <SectionReveal delay={0.2}>
            <div className="aspect-[4/3] bg-bg-alt overflow-hidden flex items-center justify-center p-8">
              <img
                src={product.systemImage}
                alt={`Система ${product.name}`}
                className="w-full h-full object-contain"
              />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
