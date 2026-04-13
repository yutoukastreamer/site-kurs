import { Link } from 'react-router-dom'
import logoGsi from '../../assets/images/logos/logo-gsi.png'
import logoKurs from '../../assets/images/logos/logo-kurs.png'
import logoRussia from '../../assets/images/logos/logo-made-in-russia.png'

/* ─── Social links ─── */
const socials = [
  {
    name: 'Rutube',
    url: 'https://rutube.ru/channel/31795058/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.2 14.4H8V7.6h5.6c1.76 0 3.2 1.12 3.2 2.8 0 1.28-.8 2.24-1.92 2.64L17.2 16.4h-2.56l-2.08-3.04H10.4v3.04H8.8V9.2h4c.88 0 1.6.56 1.6 1.2s-.72 1.2-1.6 1.2h-2.4v1.6h2.08l2.72 3.2z" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    url: 'https://t.me/gsi_ru',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.492-1.302.48-.428-.013-1.252-.242-1.865-.44-.751-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: 'OK (Max)',
    url: 'https://max.ru/clubgsi',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4.8c1.76 0 3.2 1.44 3.2 3.2s-1.44 3.2-3.2 3.2-3.2-1.44-3.2-3.2S10.24 6.8 12 6.8zm0 1.6c-.88 0-1.6.72-1.6 1.6s.72 1.6 1.6 1.6 1.6-.72 1.6-1.6-.72-1.6-1.6-1.6zm3.04 6.64c-.48.4-1.04.72-1.68.88l1.84 1.84c.32.32.32.8 0 1.12-.16.16-.36.24-.56.24s-.4-.08-.56-.24L12 16.8l-2.08 2.08c-.16.16-.36.24-.56.24s-.4-.08-.56-.24a.794.794 0 010-1.12l1.84-1.84c-.64-.16-1.2-.48-1.68-.88a.806.806 0 01-.08-1.12c.28-.36.8-.4 1.12-.08.64.56 1.44.88 2 .88s1.36-.32 2-.88c.32-.28.84-.24 1.12.08.28.36.24.84-.08 1.12z" />
      </svg>
    ),
  },
  {
    name: 'VK',
    url: 'https://vk.com/clubgsi',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.96 13.2h-1.28c-.48 0-.64-.4-1.52-1.28-.76-.72-1.08-.84-1.28-.84-.24 0-.32.08-.32.44v1.16c0 .32-.08.48-1 .48-1.48 0-3.12-.88-4.28-2.56C5.84 10.56 5.4 8.96 5.4 8.6c0-.2.08-.36.44-.36h1.28c.32 0 .44.16.56.52.64 1.8 1.68 3.36 2.12 3.36.16 0 .24-.08.24-.48V10.2c-.04-.88-.52-.96-.52-1.28 0-.16.12-.32.36-.32h2c.28 0 .36.16.36.48v2.36c0 .28.12.36.2.36.16 0 .32-.08.6-.4.96-1.08 1.64-2.72 1.64-2.72.08-.2.28-.36.56-.36h1.28c.36 0 .44.2.36.48-.16.84-1.8 3.08-1.8 3.08-.12.24-.2.32 0 .56.12.16.56.56.84.88.56.6.96 1.08 1.08 1.44.08.32-.08.48-.44.48z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@GSI-Company',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.68 14.28c-.16.6-.6 1.04-1.2 1.2C15.36 17.8 12 17.8 12 17.8s-3.36 0-4.48-.32c-.6-.16-1.04-.6-1.2-1.2C6 15.16 6 12 6 12s0-3.16.32-4.28c.16-.6.6-1.04 1.2-1.2C8.64 6.2 12 6.2 12 6.2s3.36 0 4.48.32c.6.16 1.04.6 1.2 1.2.32 1.12.32 4.28.32 4.28s0 3.16-.32 4.28zM10.4 14.4L14.8 12l-4.4-2.4v4.8z" />
      </svg>
    ),
  },
]

const menuLinks = [
  { to: '/', label: 'Главная' },
  { to: '/bulldozer', label: 'Бульдозер' },
  { to: '/excavator', label: 'Экскаватор' },
  { to: '/grader', label: 'Грейдер' },
  { to: '/#gallery', label: 'Галерея' },
  { to: '/#where-to-buy', label: 'Где купить' },
]

export default function Footer() {
  return (
    <footer id="main-footer" className="bg-bg-dark text-text-light">
      <div className="container-luxury py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* ── Left column: Logo + slogan + brand logos ── */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-5">
              <img src={logoGsi} alt="ГСИ" className="h-10 w-auto brightness-0 invert opacity-80" />
            </Link>
            <p className="text-white/35 text-sm leading-relaxed mb-6 max-w-xs">
              Группа Строительных Инноваций — первые отечественные 3D системы нивелирования для спецтехники
            </p>
            <div className="flex items-center gap-4">
              <img src={logoKurs} alt="Курс" className="h-7 w-auto brightness-0 invert opacity-70" />
              <img src={logoRussia} alt="Сделано в России" className="h-7 w-auto opacity-50" />
            </div>
          </div>

          {/* ── Middle column: Menu ── */}
          <div className="lg:col-span-3">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 mb-5">
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
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 mb-5">
              Контакты
            </p>
            <div className="flex flex-col gap-3 mb-8">
              <a
                href="tel:+78001234567"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                8 800 777 57 14
              </a>
              <a
                href="mailto:info@kurs3d.ru"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                zao@gsi.ru
              </a>
              <p className="text-sm text-white/35">
                г. Москва, ул. Малая Семеновская, 9, стр. 6
              </p>
            </div>

            {/* Socials */}
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 mb-4">
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
                  {s.icon}
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
