# PROGRESS — Курс / 3D системы нивелирования

> Последнее обновление: 2026-04-07 (видео fluid.glass + логотипы ярче + разделитель + фикс заголовка)

---

## 1. Архитектура

**Вариант 3 — Hybrid** (React SPA с Vite)

| Технология | Версия | Назначение |
|---|---|---|
| React | 19.2 | UI-фреймворк |
| Vite | 8.0 | Сборщик |
| Tailwind CSS | 4.2 | Стили (через @tailwindcss/vite) |
| Framer Motion | 12.38 | Анимации |
| react-router-dom | 7.13 | Маршрутизация (SPA) |

---

## 2. Цветовая палитра — "Arctic Precision"

Ощущение: чистый, скандинавский, как сайт Rolex — спокойная уверенность.

### CSS Variables (src/styles/index.css)

```css
--color-bg: #F7F8FA;          /* Фон основной — почти белый с холодным оттенком */
--color-bg-alt: #EDEEF2;      /* Фон секций — светло-серый */
--color-bg-dark: #1A1D23;     /* Тёмный фон (hero, footer) — графит */
--color-text: #1A1D23;        /* Текст основной — графитовый */
--color-text-secondary: #6B7080; /* Текст вторичный — серый */
--color-text-light: #F7F8FA;  /* Текст на тёмном фоне */
--color-border: #D8DAE0;      /* Линии и разделители */
--color-bulldozer: #3B6B9C;   /* Акцент Бульдозер — стальной синий */
--color-excavator: #9C7B3B;   /* Акцент Экскаватор — тёмный янтарь */
--color-grader: #3B8C6E;      /* Акцент Грейдер — хвойный зелёный */
```

### Шрифт
- **Inter** (Google Fonts) — weights: 300 (заголовки), 400 (текст), 500 (акценты), 600 (лого)
- Заголовки: `font-weight: 300`, `letter-spacing: -0.02em`, `line-height: 1.1`

---

## 3. Структура страниц и ключевые решения

### Главная страница (/)

| # | Секция | Компонент | Решение |
|---|---|---|---|
| 1 | Шапка | `Header.jsx` | Логотип ГСИ слева, навигация: Бульдозер, Экскаватор, Грейдер, Галерея, Где купить. Телефон + CTA "Получить предложение". Мобильное бургер-меню. Фиксированная, blur при скролле. |
| 2 | Hero | `HeroHome.jsx` | **Fullscreen с оверлеем**. Видео на весь экран (заглушка пока нет файла), тёмный градиент поверх, заголовок "Первые отечественные 3D системы нивелирования", слоган, 2 кнопки (Получить предложение + Смотреть продукцию), логотипы Курс и Сделано в России. |
| 3 | Каталог | `ProductsPreview.jsx` | 3 карточки с реальными фото из `home/`. Hover: изображение чуть увеличивается, акцентная полоса снизу. Клик → страница машины. |
| 4 | Галерея | `GallerySection.jsx` | **Fullscreen-слайдер**. Большое фото + 6 миниатюр снизу. Автопроигрывание (5 сек), стрелки, счётчик 01/06. AnimatePresence для смены. |
| 5 | Где купить | `WhereToBuy.jsx` | Карточка головного офиса (Москва), список филиалов (СПб, Казань, Новосибирск, Краснодар), placeholder для Яндекс Карты. |
| 6 | Форма + Подвал | `Footer.jsx` | Форма "Оставьте заявку" (имя + телефон), навигация, копирайт "Курс". |

### Продуктовые страницы (/bulldozer, /excavator, /grader)

| # | Секция | Компонент | Решение |
|---|---|---|---|
| 1 | Шапка | `Header.jsx` | Та же шапка, что на главной |
| 2 | Hero → Схема | `HeroRingSection.jsx` | **Scroll-pinned секция (280vh)**. Desktop: машина из hero (слева, 25%) плавно перемещается в центр (50%) и уменьшается (scale 1→0.6). Текст hero исчезает, фон меняется, появляется заголовок "Схема расположения компонентов". Компоненты появляются вокруг по clockHour (часовая метафора) с SVG линиями. Hover на компоненты — увеличение. Mobile: hero без картинки, затем стандартная схема. |
| 3–4 | О системе → Компоненты | `DescriptionCardsSection.jsx` | **Горизонтальный скролл (200vh)**. Desktop: два full-width панели рядом. При вертикальном скролле секция пинится (sticky) и первая панель "О системе" уезжает влево, открывая панель "Компоненты системы" (сетка карточек + popup модалка). Mobile: обычный вертикальный стек. |
| 5 | Видео | `VideoSection.jsx` | **Fluid.glass стиль**. Контейнер 200vh, sticky видео. Текст «Система в действии» поверх — исчезает при зуме (opacity 1→0). Видео muted+loop автоматически. Кнопка «Смотреть видео» по центру — рестарт со звуком. Тёмный фон #111318 с градиентами сверху/снизу (не сливается с соседними блоками). Кнопка mute/close при просмотре. |
| 6 | Форма + Подвал | `Footer.jsx` | Тот же футер |

### Акцентные цвета на продуктовых страницах
- **Бульдозер**: #3B6B9C (стальной синий) — вертикальная полоса, числа характеристик, линии схемы
- **Экскаватор**: #9C7B3B (тёмный янтарь)
- **Грейдер**: #3B8C6E (хвойный зелёный)

---

## 4. Компоненты по машинам

### Бульдозер — 8 точек на схеме, 6 уникальных карточек
1. Панель управления с ПО «Курс» (panel-bulldozer.png)
2. Призма режима ЛПС (опц.) (prism-lps.png)
3. ГНСС антенна (gnss-antenna.png)
4. Инерциальный датчик ×3 (inertial-sensor.png) — разные позиции
5. Контроллер гидравлики (hydraulic-controller.png)
6. Центральный контроллер (central-controller.png)

### Экскаватор — 7 точек на схеме, 4 уникальных карточки
1. Панель управления (panel-excavator.png)
2. ГНСС антенна
3. Инерциальный датчик ×4 (стрела, рукоять, ковш, корпус)
4. Центральный контроллер

### Грейдер — 7 точек на схеме, 7 уникальных карточек
1. Панель управления (panel-grader.png)
2. ГНСС антенна
3. Инерциальный датчик
4. Контроллер гидравлики
5. Центральный контроллер
6. Радио/GSM антенна (radio-antenna.png)
7. Радио/GSM модем (radio-modem.png)

---

## 5. Структура файлов проекта

```
KURS2.0/
├── index.html
├── package.json
├── vite.config.js
├── PROGRESS.md                          ← этот файл
│
├── src/
│   ├── main.jsx                         — точка входа, BrowserRouter
│   ├── App.jsx                          — scroll-to-top при смене маршрута
│   ├── router.jsx                       — Routes: /, /bulldozer, /excavator, /grader
│   │
│   ├── styles/
│   │   └── index.css                    — Tailwind @theme, палитра, base styles, утилиты
│   │
│   ├── data/
│   │   └── products.config.js           — конфиг всех 3 машин + импорты изображений
│   │
│   ├── hooks/
│   │   └── useScrollReveal.js           — framer-motion useInView хук
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx               — шапка с логотипом ГСИ, якорные ссылки
│   │   │   ├── ContactFormSection.jsx   — форма обратной связи (под Битрикс24)
│   │   │   ├── Footer.jsx               — подвал: логотипы + меню + контакты + соцсети
│   │   │   └── Layout.jsx               — обёртка Header + Outlet + ContactForm + Footer
│   │   └── ui/
│   │       ├── Button.jsx               — универсальная кнопка (4 варианта)
│   │       ├── AnimatedHeading.jsx      — заголовок с scroll reveal
│   │       ├── SectionReveal.jsx        — обёртка секции с fade+slide анимацией
│   │       └── RevealImage.jsx          — изображение с zoom-out появлением
│   │
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── HomePage.jsx             — сборка: Hero → Products → WhyChooseUs → Gallery → WhereToBuy
│   │   │   ├── HeroHome.jsx             — fullscreen видео-hero с оверлеем, логотипы справа вверху
│   │   │   ├── ProductsPreview.jsx      — 3 карточки продукции (grayscale→color hover)
│   │   │   ├── WhyChooseUs.jsx          — 6 карточек преимуществ с SVG-иконками
│   │   │   ├── GallerySection.jsx       — fullscreen слайдер с миниатюрами
│   │   │   └── WhereToBuy.jsx           — офисы + карта (placeholder)
│   │   └── Product/
│   │       ├── ProductPage.jsx          — сборка: HeroRing → DescriptionCards → Video
│   │       ├── HeroRingSection.jsx      — scroll-pinned hero→схема (280vh)
│   │       ├── DescriptionCardsSection.jsx — горизонтальный скролл О системе→Компоненты (200vh)
│   │       ├── VideoSection.jsx         — cinematic zoom видео при скролле
│   │       ├── HeroProduct.jsx          — (legacy, не используется)
│   │       ├── ComponentRing.jsx        — (legacy, не используется)
│   │       ├── DescriptionSection.jsx   — (legacy, не используется)
│   │       └── ComponentCards.jsx       — (legacy, не используется)
│   │
│   └── assets/
│       ├── images/
│       │   ├── logos/                   — logo-gsi.png, logo-kurs.png, logo-made-in-russia.png
│       │   ├── components/             — 10 PNG приборов (общая папка)
│       │   ├── home/                   — card-bulldozer/excavator/grader.png
│       │   ├── machines/               — bulldozer/excavator/grader-hero.png (без фона)
│       │   ├── systems/                — bulldozer/excavator/grader-system.png
│       │   └── gallery/                — gallery-1..6.JPG
│       └── videos/                     — (пока пусто, сюда положить видео)
│
└── public/
    ├── favicon.svg
    └── icons.svg
```

---

## 6. Анимации (Framer Motion)

| Эффект | Где | Реализация |
|---|---|---|
| Fade + slide up | Все секции | `SectionReveal` — opacity 0→1, y 60→0, duration 0.9s |
| Scroll reveal | Карточки, элементы | `useScrollReveal` (useInView, once: true, margin -100px) |
| Zoom-out | Изображения | `RevealImage` — scale 1.15→1, duration 1.2s |
| Staggered appear | Герой-элементы | Последовательные delay 0.2, 0.4, 0.6... |
| Burger → X | Мобильное меню | rotate + opacity линий |
| Pulse scroll line | Scroll indicator | scaleY [0,1,0] repeat infinite |
| Slide gallery | Фото галереи | AnimatePresence, x: ±100%, popLayout |
| Cinematic zoom (fluid.glass) | Видео на продуктовых | 200vh sticky, useMotionValue + manual scroll. scale 0.55→1→0.55, borderRadius 24→0→24. Текст fade (progress 0.15→0.4). Кнопка «Смотреть видео» — рестарт со звуком |
| **Hero→Ring scroll pin** | Продуктовые hero→схема | sticky 280vh, useMotionValue + manual scroll listener, машина left:25%→50%, top:46%→56%, scale 1→0.6. Три вложенных div: outer (left/top), middle (CSS centering), inner (FM scale) |
| Hero text fade | При scroll-переходе | opacity 1→0 (progress 0.18→0.38) |
| Ring title + bg | Заголовок схемы | opacity 0→1 (progress 0.42→0.58), bg opacity (0.35→0.50) |
| Ring stagger | Компоненты схемы | Staggered opacity по scroll, каждый с задержкой index*0.015 |
| SVG line draw | Линии-указатели | pathLength 0→1, staggered по scroll |
| Component hover | Компонент схемы | CSS scale 1→1.1, duration 300ms, без кружков фона |
| **Horizontal scroll** | О системе → Компоненты | sticky 200vh, translateX: 0→-100vw по scroll progress |
| Modal | Popup компонента | AnimatePresence, opacity + y + scale (в DescriptionCardsSection) |

Общий ease curve: `[0.25, 0.1, 0.25, 1]` (cubic bezier — плавный premium-feel)

---

## 7. Текущий прогресс

### Готово
- [x] Инфраструктура (Vite + React + Tailwind + Framer Motion)
- [x] Палитра Arctic Precision в CSS
- [x] Шрифт Inter подключён
- [x] Роутинг (4 маршрута)
- [x] Header с логотипом ГСИ и полной навигацией
- [x] Footer с формой обратного звонка
- [x] Layout обёртка
- [x] UI-компоненты (Button, AnimatedHeading, SectionReveal, RevealImage)
- [x] Главная: Hero (fullscreen, заглушка под видео)
- [x] Главная: Каталог (3 карточки с реальными фото)
- [x] Главная: Галерея (fullscreen слайдер, 6 фото, миниатюры)
- [x] Главная: Где купить (офис + филиалы + placeholder карты)
- [x] Продуктовые: Hero (машина + текст + характеристики + кнопки + логотипы)
- [x] Продуктовые: Схема компонентов (кольцо + SVG линии)
- [x] Продуктовые: **Scroll-pinned анимация Hero→Ring** (HeroRingSection.jsx)
  - Desktop: машина плавно перемещается из hero (слева) в центр схемы при скролле
  - Текст hero плавно исчезает, фон меняется, появляется заголовок схемы
  - Компоненты появляются по кругу с staggered-эффектом, SVG линии рисуются
  - Hover на компоненты — увеличение + тень
  - Mobile: hero без картинки, затем стандартная схема с машиной в центре
  - Работает на всех 3 страницах (бульдозер, экскаватор, грейдер)
  - Config: clockHour (позиция по часам) + machinePoint (точка на машине)
- [x] Продуктовые: **Горизонтальный скролл О системе → Компоненты** (DescriptionCardsSection.jsx)
  - Desktop: sticky 200vh, два панели w-screen, translateX 0→-100vw
  - Первая панель: текст + изображение системы
  - Вторая панель: сетка карточек + popup модалка
  - Mobile: обычный вертикальный стек
  - Работает на всех 3 страницах
- [x] Продуктовые: Cinematic zoom видео (fluid.glass стиль: 200vh sticky, текст fade, кнопка «Смотреть видео» со звуком)
- [x] Бульдозер/Грейдер: увеличены изображения в hero (44vw) и в центре схемы
- [x] Экскаватор: увеличено изображение в центре схемы (ringMachineScale 0.75)
- [x] Карточки компонентов (блок 4): оптимальный размер (h-36 lg:h-40, p-4 lg:p-5), заголовок всегда виден
- [x] Панель "Компоненты системы": items-start pt-20, заголовок виден при горизонтальном скролле
- [x] Шапка: полная навигация с lg (1024px+), бургер только на мобиле (<1024px)
- [x] Мобильная главная: нет горизонтального overflow (overflow-x: clip на html/body)
- [x] Карта "Где купить": фиксированная высота h-64 на мобиле вместо aspect-square (не выходит за края)
- [x] products.config.js — полная конфигурация с характеристиками компонентов
- [x] Все ассеты подключены к компонентам
- [x] **Главная: блок «Почему выбирают нас»** (WhyChooseUs.jsx) — 6 карточек преимуществ с SVG-иконками, расположен между каталогом и галереей
- [x] **Шапка: навигация с якорными ссылками** — "Галерея" и "Где купить" ведут на главную с плавной прокруткой, работает и со страниц продуктов (useNavigate + setTimeout scrollIntoView)
- [x] **Карточки техники: hover grayscale→color + zoom** — два слоя изображений (grayscale по умолчанию, цветное появляется при наведении). Поддержка `cardImageColor` в конфиге для отдельных цветных файлов
- [x] **Hero: логотипы Курс/Россия в правом верхнем углу** — увеличены (h-14 lg), opacity-70, с разделителем
- [x] **Цветные фото карточек подключены** — card-bulldozer-color.png, card-excavator-color.png, card-grader-color.png → `cardImageColor` в products.config.js
- [x] **Видео hero подключено** — hero-video.mp4 играет фоном на главной (autoplay, muted, loop)
- [x] **Видео продуктовых страниц** — VideoSection показывает реальное видео (fallback на hero-video.mp4 пока нет отдельных)
- [x] **Заголовок «Схема расположения»** — сдвинут ниже от шапки (top-32 lg:top-36 вместо top-20)
- [x] **Форма обратной связи** — отдельный `ContactFormSection.jsx` (в Layout, на всех страницах). Подготовлена под Битрикс24: слева заголовок+текст, справа форма с placeholder-полями
- [x] **Новый подвал** — логотип ГСИ + слоган + Курс/Россия слева, навигация + контакты в столбцах, соцсети: Rutube, Telegram, Max, VK, YouTube с реальными ссылками
- [x] **Заголовок «Компоненты системы» не наезжает на изображение** — увеличен pt-28 и mb-8 на панели 2
- [x] **VideoSection в стиле fluid.glass** — 200vh sticky, текст «Система в действии» исчезает при зуме, кнопка «Смотреть видео» рестартит со звуком, тёмный фон с градиентами
- [x] **Разделительная черта между формой и подвалом** — h-px bg-white/10 в Layout.jsx
- [x] **Логотипы Курс/Россия ярче в hero техники** — opacity-30 → opacity-70

### Нужно от заказчика
- [x] ~~Видео: hero-video.mp4~~ — добавлено!
- [ ] Видео для продуктовых: bulldozer-video.mp4, excavator-video.mp4, grader-video.mp4 → в `src/assets/videos/`
- [ ] PDF буклеты для кнопки "Скачать буклет"
- [ ] Реальные адреса и телефоны филиалов
- [ ] API-ключ Яндекс Карт (developer.tech.yandex.ru)
- [ ] Скрипт встраивания формы Битрикс24 (CRM → Формы → Код встраивания)
- [ ] Выбор слогана (текущий: "Точность, которой доверяют...")
- [ ] Координаты компонентов на реальных PNG машин (для уточнения схемы)

### Техническое TODO
- [ ] Подключить скрипт Битрикс-формы (заменить placeholder в ContactFormSection)
- [ ] Подключить Яндекс Карту
- [ ] Проверить responsive на всех размерах
- [ ] Мета-теги, Open Graph, SEO
- [ ] Favicon и PWA-манифест
