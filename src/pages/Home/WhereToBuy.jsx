import { useState } from 'react'
import SectionReveal from '../../components/ui/SectionReveal'

const branches = [
  { city: 'Москва', address: 'ул. Примерная, 1, стр. 2, оф. 100', phone: '+7 (800) 123-45-67', isHQ: true },
  { city: 'Санкт-Петербург', address: 'Невский пр-т, 100, оф. 12', phone: '+7 (812) 123-45-67' },
  { city: 'Казань', address: 'ул. Баумана, 50, оф. 3', phone: '+7 (843) 234-56-78' },
  { city: 'Новосибирск', address: 'Красный пр-т, 75, оф. 8', phone: '+7 (383) 345-67-89' },
  { city: 'Краснодар', address: 'ул. Красная, 120, оф. 5', phone: '+7 (861) 456-78-90' },
]

export default function WhereToBuy() {
  const [activeCity, setActiveCity] = useState(null)

  return (
    <section id="where-to-buy" className="py-24 lg:py-36 bg-bg-alt overflow-x-hidden">
      <div className="container-luxury">
        <SectionReveal>
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-4">
            Где купить
          </p>
          <h2 className="text-3xl lg:text-5xl font-light mb-16">
            Наши офисы
          </h2>
        </SectionReveal>

        {/* Branches + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Branches list */}
          <SectionReveal delay={0.2}>
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-text-secondary mb-6">
              Филиалы
            </p>
            <div className="flex flex-col">
              {branches.map((b) => (
                <button
                  key={b.city}
                  type="button"
                  onClick={() => setActiveCity(activeCity === b.city ? null : b.city)}
                  className={`border-t border-border pt-5 pb-5 text-left transition-colors duration-300 cursor-pointer ${
                    activeCity === b.city ? 'bg-bg -mx-4 px-4' : 'hover:bg-bg/50 -mx-4 px-4'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`text-base font-medium transition-colors ${
                      activeCity === b.city ? 'text-text' : ''
                    }`}>
                      {b.city}
                    </h4>
                    {b.isHQ && (
                      <span className="text-[9px] font-medium tracking-[0.15em] uppercase text-text-secondary border border-border px-1.5 py-0.5">
                        Офис
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary mb-1">{b.address}</p>
                  <span className="text-sm text-text-secondary">{b.phone}</span>
                </button>
              ))}
            </div>
          </SectionReveal>

          {/* Yandex Map — constructor embed */}
          <SectionReveal delay={0.3}>
            <div className="h-80 w-full lg:h-full lg:min-h-[500px] border border-border overflow-hidden">
              <iframe
                title="Карта филиалов"
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A83c7553878eeecd3cc812e6cc62157b9de612009a204140b6bd220bf5f4b015c&amp;source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                style={{ display: 'block' }}
              />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
