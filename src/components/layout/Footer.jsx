import { Link } from 'react-router-dom'
import { FaPlay, FaMessage } from 'react-icons/fa6'
import { SiTelegram, SiVk, SiYoutube } from 'react-icons/si'
import logoGsi from '../../assets/images/logos/logo-gsi-white.png'
import logoKurs from '../../assets/images/logos/logo-kurs-white.png'
import logoRussia from '../../assets/images/logos/logo-made-in-russia.png'

/* ─── Social links ─── */
const socials = [
  { name: 'Rutube',   url: 'https://rutube.ru/channel/31795058/', Icon: FaPlay },
  { name: 'Telegram', url: 'https://t.me/gsi_ru',                Icon: SiTelegram },
  { name: 'Max',      url: 'https://max.ru/clubgsi',             Icon: FaMessage },
  { name: 'VK',       url: 'https://vk.com/clubgsi',             Icon: SiVk },
  { name: 'YouTube',  url: 'https://www.youtube.com/@GSI-Company', Icon: SiYoutube },
]

const menuLinks = [
  { to: '/', label: 'Главная' },
  { to: '/bulldozer', label: 'Бульдозер' },
  { to: '/excavator', label: 'Экскаватор' },
  { to: '/grader', label: 'Грейдер' },
  { to: '/#gallery', label: 'Галерея' },
  { to: '/#where-to-buy', label: 'Где купить' },
  { to: '/news', label: 'Новости' },
]

export default function Footer() {
  return (
    <footer id="main-footer" className="bg-bg-dark text-text-light">
      <div className="container-luxury py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* ── Left column: Logo + slogan + brand logos ── */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-5">
              <img src={logoGsi} alt="ГСИ" className="h-10 w-auto" />
            </Link>
            <p className="text-white/35 text-sm leading-relaxed mb-6 max-w-xs">
              Группа Строительных Инноваций — первые отечественные 3D системы нивелирования для спецтехники
            </p>
            <div className="flex items-center gap-4">
              <img src={logoKurs} alt="Курс" className="h-7 w-auto" />
              <img src={logoRussia} alt="Сделано в России" className="h-7 w-auto" />
            </div>
          </div>

          {/* ── Middle column: Menu ── */}
          <div className="lg:col-span-3">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 mb-5 whitespace-nowrap">
              Навигация
            </p>
            <nav className="flex flex-col gap-3">
              {menuLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Right column: Contacts ── */}
          <div className="lg:col-span-5">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 mb-5 whitespace-nowrap">
              Контакты
            </p>
            <div className="flex flex-col gap-3 mb-8">
              <a
                href="tel:+78001234567"
                className="text-sm text-white/50 hover:text-white transition-colors whitespace-nowrap"
              >
                8 800 777 57 14
              </a>
              <a
                href="mailto:info@kurs3d.ru"
                className="text-sm text-white/50 hover:text-white transition-colors whitespace-nowrap"
              >
                zao@gsi.ru
              </a>
              <p className="text-sm text-white/35">
                Москва, ул. Малая Семеновская, 9, стр. 6
              </p>
              <p className="text-sm text-white/35">
                ООО «ГЕОСТРОЙИЗЫСКАНИЯ»
              </p>
              <p className="text-sm text-white/35">
                ИНН 9718053358
              </p>
            </div>

            {/* Socials */}
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 mb-4 whitespace-nowrap">
              Мы в соцсетях
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
                >
                  <s.Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-luxury py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/20 text-[11px] tracking-wider">
          <p>&copy; {new Date().getFullYear()} ГСИ — Группа Строительных Инноваций. Все права защищены.</p>
          <p>Сделано с точностью ±2 мм</p>
        </div>
      </div>
    </footer>
  )
}
