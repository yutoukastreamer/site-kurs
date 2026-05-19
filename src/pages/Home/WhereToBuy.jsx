import SectionReveal from '../../components/ui/SectionReveal'
import officeImg from '../../assets/images/office-gsi.jpg'

export default function WhereToBuy() {
  return (
    <section id="where-to-buy" className="py-24 lg:py-36 bg-bg-alt overflow-x-hidden">
      <div className="container-luxury">
        {/* Header */}
        <SectionReveal>
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-text-secondary mb-4 whitespace-nowrap">
            Где купить
          </p>
          <h2 className="font-light mb-10" style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3rem)' }}>
            Центральный офис
          </h2>
        </SectionReveal>

        {/* Office card — accent bar left */}
        <SectionReveal delay={0.2}>
          <div className="w-full bg-bg rounded-sm border border-border border-l-4 border-l-bulldozer px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-9 mb-20 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
            <div className="shrink-0">
              <div className="w-16 h-16 sm:w-[88px] sm:h-[88px] lg:w-24 lg:h-24 rounded-full overflow-hidden shadow-md">
                <img
                  src={officeImg}
                  alt="Офис ГСИ"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="min-w-0 text-center sm:text-left">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-text">
                Москва, ул.&nbsp;Малая Семеновская, д.&nbsp;9, стр.&nbsp;1
              </p>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-text-secondary mt-1.5">
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
          <h3 className="font-light mb-8" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)' }}>
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
