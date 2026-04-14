import SectionReveal from '../../components/ui/SectionReveal'
import officeImg from '../../assets/images/office-gsi.jpg'

export default function WhereToBuy() {
  return (
    <section id="where-to-buy" className="py-24 lg:py-36 bg-bg-alt overflow-x-hidden">
      <div className="container-luxury">
        {/* Header */}
        <SectionReveal>
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-4">
            Где купить
          </p>
          <h2 className="text-3xl lg:text-5xl font-light mb-10">
            Центральный офис
          </h2>
        </SectionReveal>

        {/* Office card — accent bar left */}
        <SectionReveal delay={0.2}>
          <div className="w-full bg-bg rounded-sm border border-border border-l-4 border-l-bulldozer px-8 py-8 lg:px-10 lg:py-9 mb-20 flex items-center gap-6 lg:gap-8">
            <div className="shrink-0">
              <div className="w-[88px] h-[88px] lg:w-24 lg:h-24 rounded-full overflow-hidden shadow-md">
                <img
                  src={officeImg}
                  alt="Офис ГСИ"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-base lg:text-lg leading-relaxed text-text">
                г.&nbsp;Москва, ул.&nbsp;Малая Семеновская, д.&nbsp;9, стр.&nbsp;1
              </p>
              <p className="text-base lg:text-lg leading-relaxed text-text-secondary mt-1.5">
                Телефон:{' '}
                <a
                  href="tel:88007775714"
                  className="font-medium text-text underline underline-offset-4 decoration-border hover:decoration-text transition-colors"
                >
                  8 800 777 57 14
                </a>
              </p>
            </div>
          </div>
        </SectionReveal>

        {/* Branches */}
        <SectionReveal delay={0.3}>
          <h3 className="text-2xl lg:text-3xl font-light mb-8">
            Наши филиалы
          </h3>
        </SectionReveal>

        {/* Yandex Map */}
        <SectionReveal delay={0.4}>
          <div className="w-full border border-border overflow-hidden rounded-sm">
            <iframe
              title="Карта филиалов"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A83c7553878eeecd3cc812e6cc62157b9de612009a204140b6bd220bf5f4b015c&amp;source=constructor"
              width="100%"
              height="357"
              frameBorder="0"
              style={{ display: 'block' }}
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
