import SectionReveal from '../../components/ui/SectionReveal'

const branches = [
  { city: 'Санкт-Петербург', address: 'Невский пр-т, 100, оф. 12', phone: '+7 (812) 123-45-67' },
  { city: 'Казань', address: 'ул. Баумана, 50, оф. 3', phone: '+7 (843) 234-56-78' },
  { city: 'Новосибирск', address: 'Красный пр-т, 75, оф. 8', phone: '+7 (383) 345-67-89' },
  { city: 'Краснодар', address: 'ул. Красная, 120, оф. 5', phone: '+7 (861) 456-78-90' },
]

export default function WhereToBuy() {
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

        {/* Main office card */}
        <SectionReveal delay={0.1}>
          <div className="bg-bg p-8 lg:p-12 mb-12 border border-border">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-text-secondary mb-3">
                  Головной офис
                </p>
                <h3 className="text-2xl font-light mb-2">Москва</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  ул. Примерная, 1, стр. 2, оф. 100<br />
                  Бизнес-центр «Технопарк»
                </p>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <a href="tel:+78001234567" className="text-text hover:text-text-secondary transition-colors">
                  8 800 123-45-67
                </a>
                <a href="mailto:info@kurs3d.ru" className="text-text-secondary hover:text-text transition-colors">
                  info@kurs3d.ru
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Branches + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Branches list */}
          <SectionReveal delay={0.2}>
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-text-secondary mb-6">
              Филиалы
            </p>
            <div className="flex flex-col gap-6">
              {branches.map((b) => (
                <div key={b.city} className="border-t border-border pt-5">
                  <h4 className="text-base font-medium mb-1">{b.city}</h4>
                  <p className="text-sm text-text-secondary mb-1">{b.address}</p>
                  <a href={`tel:${b.phone.replace(/[^\d+]/g, '')}`} className="text-sm text-text-secondary hover:text-text transition-colors">
                    {b.phone}
                  </a>
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* Map placeholder */}
          <SectionReveal delay={0.3}>
            <div className="h-64 w-full lg:aspect-auto lg:h-full lg:min-h-[400px] bg-bg border border-border flex items-center justify-center">
              {/*
                Чтобы подключить Яндекс Карту:
                1. Зарегистрируйтесь на developer.tech.yandex.ru
                2. Создайте проект, получите API-ключ
                3. Добавьте в index.html:
                   <script src="https://api-maps.yandex.ru/v3/?apikey=ВАШ_КЛЮЧ&lang=ru_RU"></script>
                4. Замените этот блок на компонент с картой
              */}
              <div className="text-center p-8">
                <div className="w-12 h-12 mx-auto mb-4 border border-border rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2C6.69 2 4 4.69 4 8c0 5.25 6 10 6 10s6-4.75 6-10c0-3.31-2.69-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1"/>
                  </svg>
                </div>
                <p className="text-sm text-text-secondary mb-2">Яндекс Карта</p>
                <p className="text-[11px] text-text-secondary/60">Подключите API-ключ для отображения карты</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
