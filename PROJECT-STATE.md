# PROJECT-STATE — Курс / 3D системы нивелирования

> Постоянная справка по проекту. Читать в начале каждого чата.

---

## 1. О проекте

**NIVEL 3D** — премиальный сайт-каталог первых отечественных 3D систем нивелирования для спецтехники.
Бренд: **Курс** (ГСИ — Группа Строительных Инноваций).

### Философия дизайна
- **Quiet luxury + high-tech** — спокойная уверенность, как Rolex
- Минимализм, много воздуха, точная типографика
- Без кричащих элементов — premium через сдержанность

### Референсы
| Сайт | Что берём |
|---|---|
| **Rolex** | Ощущение премиальности, типографика, тёмные hero-секции |
| **Scalvini Marmi** | Композиция, пропорции, работа с пространством |
| **Fluid.glass** | Анимации, плавность, cinematic-подход |

---

## 2. Архитектура

**Вариант 3 — Hybrid** (React SPA с Vite)

| Технология | Версия | Назначение |
|---|---|---|
| React | 19.2 | UI-фреймворк |
| Vite | 8.0 | Сборщик |
| Tailwind CSS | 4.2 | Стили (через @tailwindcss/vite) |
| Framer Motion | 12.38 | Анимации |
| react-router-dom | 7.13 | Маршрутизация (SPA) |

---

## 3. Цветовая палитра — "Arctic Precision"

Ощущение: чистый, скандинавский, холодный минимализм.

### Основные цвета

| Переменная | Значение | Назначение |
|---|---|---|
| `--color-bg` | `#F7F8FA` | Фон основной — почти белый с холодным оттенком |
| `--color-bg-alt` | `#EDEEF2` | Фон секций — светло-серый |
| `--color-bg-dark` | `#1A1D23` | Тёмный фон (hero, footer) — графит |
| `--color-text` | `#1A1D23` | Текст основной — графитовый |
| `--color-text-secondary` | `#6B7080` | Текст вторичный — серый |
| `--color-text-light` | `#F7F8FA` | Текст на тёмном фоне |
| `--color-border` | `#D8DAE0` | Линии и разделители |

### Акцентные цвета по машинам

| Машина | Цвет | HEX | Где используется |
|---|---|---|---|
| **Бульдозер** | Стальной синий | `#3B6B9C` | Вертикальная полоса hero, числа характеристик, SVG линии схемы |
| **Экскаватор** | Тёмный янтарь | `#9C7B3B` | То же самое |
| **Грейдер** | Хвойный зелёный | `#3B8C6E` | То же самое |

### Шрифт
- **Inter** (Google Fonts) — weights: 300, 400, 500, 600
- Заголовки: `font-weight: 300`, `letter-spacing: -0.02em`, `line-height: 1.1`

---

## 4. Структура страниц

### Главная страница (/)

| # | Секция | Компонент | Описание |
|---|---|---|---|
| 1 | Шапка | `Header.jsx` | Логотип ГСИ, навигация (lg+): Бульдозер, Экскаватор, Грейдер, Новости, Галерея, Где купить. Телефон, CTA, фиксированная с blur. На главной до скролла — светлая тема. На десктопе исчезает при попадании подвала в viewport. Ссылки "Галерея" и "Где купить" ведут на главную с прокруткой к якорям |
| 2 | Hero | `HeroHome.jsx` | Fullscreen видео + тёмный оверлей + заголовок «Инновационные отечественные...» + 2 кнопки. Логотипы Курс и Россия (белые, brightness-0 invert) — в правом верхнем углу |
| 3 | Каталог | `ProductsPreview.jsx` | 3 карточки. Hover: zoom 1.08 + grayscale→color + акцентная полоса. Поддержка `cardImageColor` |
| 4 | Почему мы | `WhyChooseUs.jsx` | 6 карточек преимуществ с SVG-иконками (3×2 сетка) |
| 5 | Галерея | `GallerySection.jsx` | Fullscreen-слайдер, 6 миниатюр, автопроигрывание 5 сек |
| 6 | Где купить | `WhereToBuy.jsx` | Кликабельный список филиалов + Яндекс Карта (конструктор iframe) |

### Страница новостей (/news)

| # | Секция | Компонент | Описание |
|---|---|---|---|
| 1 | Шапка | `Header.jsx` | Общая шапка, ссылка «Новости» в навигации |
| 2 | Заголовок + Тикер | `NewsPage.jsx` | Заголовок «Новости», подзаголовок, бегущая строка заголовков (CSS animation, пауза при hover) |
| 3 | Сетка новостей | `NewsPage.jsx` | 3 колонки (desktop), карточки с изображением, датой, превью. Hover: zoom + «Читать далее →» |
| 4 | Pop-up модалка | `NewsPage.jsx` | Полный текст новости. Закрытие: overlay-click / кнопка X / Escape. Body scroll lock |

### Общие блоки на ВСЕХ страницах (через Layout.jsx)

| # | Секция | Компонент | Описание |
|---|---|---|---|
| — | Форма | `ContactFormSection.jsx` | Слева заголовок + описание, справа форма (placeholder под Битрикс24). Тёмный фон, на всех страницах |
| — | Разделитель | `Layout.jsx` | Горизонтальная черта (h-px bg-white/10) между формой и подвалом |
| — | Подвал | `Footer.jsx` | Слева: логотип ГСИ + слоган + логотипы Курс (белый, brightness-0 invert) и Россия. Два столбца: навигация + контакты. Иконки соцсетей: Rutube, Telegram, Max, VK, YouTube |

### Продуктовые страницы (/bulldozer, /excavator, /grader)

| # | Секция | Компонент | Описание |
|---|---|---|---|
| 1 | Шапка | `Header.jsx` | Общая шапка |
| 2 | Hero → Схема | `HeroRingSection.jsx` | Scroll-pinned (280vh): машина из hero (слева) плавно перемещается в центр схемы при скролле, компоненты появляются вокруг с SVG линиями. Заголовок «Схема» — top-32/36 от шапки |
| 3–4 | О системе → Компоненты | `DescriptionCardsSection.jsx` | Горизонтальный скролл (200vh): блок "О системе" скроллится вправо на "Компоненты системы", затем вертикальный скролл продолжается |
| 5 | Видео | `VideoSection.jsx` | **Desktop**: 200vh sticky, фон = акцентный цвет машины. Scroll-zoom: scale 0.55→1 (60%), текст слева/справа. Play → fixed overlay (z-200) поверх всего контента с отдельным видео, кастомными контролами (play/pause + seek + время), крестик закрытия, body scroll lock, Escape для выхода. Scroll-анимация секции не затрагивается. **Mobile**: статичный плеер + fullscreen-оверлей |

---

## 5. Компоненты по машинам

### Бульдозер — 8 точек на схеме, 6 уникальных карточек
1. Панель управления с ПО «Курс»
2. Призма режима ЛПС (опц.)
3. ГНСС антенна
4. Инерциальный датчик ×3 (разные позиции)
5. Контроллер гидравлики
6. Центральный контроллер

### Экскаватор — 7 точек на схеме, 4 уникальных карточки
1. Панель управления
2. ГНСС антенна
3. Инерциальный датчик ×4 (стрела, рукоять, ковш, корпус)
4. Центральный контроллер

### Грейдер — 7 точек на схеме, 7 уникальных карточек
1. Панель управления
2. ГНСС антенна
3. Инерциальный датчик
4. Контроллер гидравлики
5. Центральный контроллер
6. Радио/GSM антенна
7. Радио/GSM модем

---

## 6. Ключевые анимации (Framer Motion)

| Эффект | Где | Реализация |
|---|---|---|
| Fade + slide up | Все секции | `SectionReveal` — opacity 0→1, y 60→0, 0.9s |
| Scroll reveal | Карточки | `useScrollReveal` (useInView, once: true) |
| Zoom-out | Изображения | `RevealImage` — scale 1.15→1, 1.2s |
| Staggered appear | Hero-элементы | delay 0.2, 0.4, 0.6... |
| Cinematic zoom (fluid.glass) | Видео продуктовых (desktop) | 200vh sticky, useMotionValue (scroll-driven). scale 0.55→1 (до 60% scroll, держится на 1), borderRadius 24→0. Текст слева/справа всегда видим при скролле. Play → fixed overlay (z-200) с отдельным video-элементом, кастомные контролы (play/pause + seek slider + время), крестик (top-right) + Escape для закрытия, body scroll lock. Секционное видео muted+loop, overlay видео unmuted. Авто-пауза секционного видео при скролле вне viewport (IntersectionObserver) |
| Header hide at footer | Все страницы (desktop) | IntersectionObserver на `#main-footer`, при `isIntersecting` шапка получает `lg:-translate-y-full lg:opacity-0 lg:pointer-events-none` |
| **Hero→Ring scroll pin** | Продуктовые hero→схема | sticky 280vh, useMotionValue + manual scroll, машина left:25%→50%, scale 1→ringMachineScale (0.6 default / 0.75 экскаватор), компоненты stagger. Размер в hero: heroImgVW (32vw default / 44vw бульдозер+грейдер) |
| **Horizontal scroll** | О системе → Компоненты | sticky 200vh, vertical scroll → horizontal translateX -100vw |
| Ring appear | Компоненты схемы | Staggered opacity + scale по scroll progress |
| SVG line draw | Линии-указатели | pathLength 0→1, staggered |
| Component hover | Компонент схемы | CSS scale 1→1.1, duration 300ms |
| Modal popup | Карточка компонента | AnimatePresence, opacity + y + scale |
| Slide gallery | Смена фото | AnimatePresence, x: ±100% |
| Burger → X | Мобильное меню | rotate + opacity |
| Pulse scroll | Scroll indicator | scaleY [0,1,0] infinite |
| News ticker | Бегущая строка заголовков | CSS translateX(-50%) 35s linear infinite, пауза при hover |
| News modal | Pop-up новости | AnimatePresence, opacity + y + scale |

**Общий ease:** `[0.25, 0.1, 0.25, 1]` — плавный premium-feel

---

## 7. Структура файлов

```
KURS2.0/
├── index.html
├── package.json
├── vite.config.js
├── Dockerfile
├── nginx/nginx.conf
├── PROJECT-STATE.md          ← этот файл (постоянная справка)
├── PROGRESS.md               ← прогресс и TODO
│
├── src/
│   ├── main.jsx              — точка входа, BrowserRouter
│   ├── App.jsx               — scroll-to-top при смене маршрута
│   ├── router.jsx            — Routes: /, /bulldozer, /excavator, /grader, /news
│   ├── styles/index.css      — Tailwind @theme, палитра, утилиты
│   ├── data/products.config.js — конфиг всех 3 машин
│   ├── data/newsData.js      — массив новостей (6 шт.)
│   ├── hooks/useScrollReveal.js
│   ├── components/
│   │   ├── layout/ (Header, Footer, Layout)
│   │   └── ui/ (Button, AnimatedHeading, SectionReveal, RevealImage)
│   ├── pages/
│   │   ├── Home/ (HomePage, HeroHome, ProductsPreview, GallerySection, WhereToBuy)
│   │   ├── News/ (NewsPage — тикер + карточки + pop-up)
│   │   └── Product/ (ProductPage, HeroRingSection, DescriptionCardsSection, VideoSection)
│   └── assets/
│       ├── images/ (logos/, components/, home/, machines/, systems/, gallery/)
│       └── videos/ (пока пусто)
│
├── dist/                     — собранная версия для production
└── public/
    ├── favicon.svg
    ├── icons.svg
    └── assets/images/news/   — сюда класть фото новостей (1.jpg, 2.jpg, ...)
```

---

## 8. Важные технические решения

| Проблема | Решение |
|---|---|
| `overflow-x: hidden` на body ломает `position: sticky` | Использовать `overflow-x: clip` — не создаёт scroll-контейнер |
| Бургер-меню на десктопе | Брейкпоинт `lg` (1024px): `hidden lg:flex` для nav, `lg:hidden` для бургера |
| Размер машины в hero и схеме | Конфиг: `heroImgVW` (vw) + `ringMachineScale` в `products.config.js` |
| SVG линии схемы при разных размерах машины | `machineVW` и `machineVH` вычисляются динамически: `heroImgVW × ringMachineScale` |
| Карта на мобиле выходит за края | `aspect-square` + `min-h` расширяет ширину → заменить на `h-64 w-full` |
| Горизонтальный скролл блока 4 | Панель 2: `items-start pt-20` (не `items-center`) чтобы заголовок был виден |

## 9. Docker (деплой)

```bash
# Сборка образа
docker build -t kurs .

# Запуск
docker run -d -p 8080:80 --name kurs-site kurs

# Сайт: http://localhost:8080
```
