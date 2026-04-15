/* ─── Image imports ─── */
import bulldozerHero from '../assets/images/machines/bulldozer-hero.png'
import excavatorHero from '../assets/images/machines/excavator-hero.png'
import graderHero from '../assets/images/machines/grader-hero.png'

import bulldozerSystem from '../assets/images/systems/bulldozer-system.png'
import excavatorSystem from '../assets/images/systems/excavator-system.png'
import graderSystem from '../assets/images/systems/grader-system.png'

import cardBulldozer from '../assets/images/home/card-bulldozer.png'
import cardExcavator from '../assets/images/home/card-excavator.png'
import cardGrader from '../assets/images/home/card-grader.png'
import cardBulldozerColor from '../assets/images/home/card-bulldozer-color.png'
import cardExcavatorColor from '../assets/images/home/card-excavator-color.png'
import cardGraderColor from '../assets/images/home/card-grader-color.png'

import panelBulldozer from '../assets/images/components/panel-bulldozer.png'
import panelExcavator from '../assets/images/components/panel-excavator.png'
import panelGrader from '../assets/images/components/panel-grader.png'
import prismLps from '../assets/images/components/prism-lps.png'
import gnssAntenna from '../assets/images/components/gnss-antenna.png'
import inertialSensor from '../assets/images/components/inertial-sensor.png'
import hydraulicController from '../assets/images/components/hydraulic-controller.png'
import centralController from '../assets/images/components/central-controller.png'

/* ─── Shared component definitions ─── */
const COMPONENTS = {
  panelBulldozer: {
    id: 'panel-bulldozer',
    name: 'Панель управления с ПО «Курс»',
    image: panelBulldozer,
    specs: [
      { label: 'Дисплей', value: '10.1" IPS сенсорный' },
      { label: 'Разрешение', value: '1280×800 px' },
      { label: 'Яркость', value: '600 нит' },
      { label: 'Защита', value: 'IP67' },
      { label: 'Процессор', value: 'Qualcomm 64 bit ARM' },
      { label: 'ОС', value: 'Android' },
      { label: 'Оперативная память', value: '2 ГБ' },
      { label: 'Разъемы', value: 'Lemo, USB' },
      { label: 'Питание', value: '5-16 В' },
      { label: 'Подключения', value: 'Bluetooth, WIFI' },
      { label: 'Рабочая температура', value: '−20°C … +70°C' },
    ],
  },
  panelExcavator: {
    id: 'panel-excavator',
    name: 'Панель управления с ПО «Курс»',
    image: panelExcavator,
    specs: [
      { label: 'Дисплей', value: '10.1" IPS сенсорный' },
      { label: 'Разрешение', value: '1280×800 px' },
      { label: 'Яркость', value: '600 нит' },
      { label: 'Защита', value: 'IP67' },
      { label: 'Процессор', value: 'Qualcomm 64 bit ARM' },
      { label: 'ОС', value: 'Android' },
      { label: 'Оперативная память', value: '2 ГБ' },
      { label: 'Разъемы', value: 'Lemo, USB' },
      { label: 'Питание', value: '5-16 В' },
      { label: 'Подключения', value: 'Bluetooth, WIFI' },
      { label: 'Рабочая температура', value: '−20°C … +70°C' },
    ],
  },
  panelGrader: {
    id: 'panel-grader',
    name: 'Панель управления с ПО «Курс»',
    image: panelGrader,
    specs: [
      { label: 'Дисплей', value: '10.1" IPS сенсорный' },
      { label: 'Разрешение', value: '1280×800 px' },
      { label: 'Яркость', value: '600 нит' },
      { label: 'Защита', value: 'IP67' },
      { label: 'Процессор', value: 'Qualcomm 64 bit ARM' },
      { label: 'ОС', value: 'Android' },
      { label: 'Оперативная память', value: '2 ГБ' },
      { label: 'Разъемы', value: 'Lemo, USB' },
      { label: 'Питание', value: '5-16 В' },
      { label: 'Подключения', value: 'Bluetooth, WIFI' },
      { label: 'Рабочая температура', value: '−20°C … +70°C' },
    ],
  },
  prismLps: {
    id: 'prism-lps',
    name: 'Призма режима ЛПС',
    image: prismLps,
    specs: [
      { label: 'Угол видимости', value: '360°' },
      { label: 'Виброустойчивое исполнение', value: 'Да' },
      { label: 'Материал', value: 'Оптическое стекло' },
      { label: 'Крепление', value: 'Резьбовое' },
    ],
  },
  gnssAntenna: {
    id: 'gnss-antenna',
    name: 'ГНСС антенны',
    image: gnssAntenna,
    specs: [
      { label: 'Системы', value: 'GPS, ГЛОНАСС, BeiDou, Galileo' },
      { label: 'Каналы', value: 'L1/L2/L5' },
      { label: 'Защита', value: 'IP68' },
    ],
  },
  inertialSensor: {
    id: 'inertial-sensor',
    name: 'Инерциальный датчик',
    image: inertialSensor,
    specs: [
      { label: 'Размер', value: '146 х 116 х 45 мм' },
      { label: 'Акселеометр', value: '3 - осевой' },
      { label: 'Диапазон ускорений', value: '±6 g' },
      { label: 'Диапазон угловых скоростей', value: '±125 °/с' },
      { label: 'Защита', value: 'IP67' },
      { label: 'Интерфейс', value: 'CAN' },
      { label: 'Питание', value: '5,5-8 В' },
      { label: 'Вес', value: '820 г' },
      { label: 'Разъемы', value: 'М12 с двух сторон' },
      { label: 'Корпус', value: 'Алюминий с защитным покрытием' },
    ],
  },
  hydraulicController: {
    id: 'hydraulic-controller',
    name: 'Контроллер гидравлики',
    image: hydraulicController,
    specs: [
      { label: 'Каналы управления', value: '4 канала' },
      { label: 'Ток клапана', value: 'до 3 А на канал' },
      { label: 'Интерфейс', value: 'CAN' },
      { label: 'Защита', value: 'IP67' },
      { label: 'Питание', value: '18 - 30 В' },
      { label: 'Защите от смены полярности питания', value: 'Есть' },
      { label: 'Вес', value: '920 г' },
      { label: 'Разъемы', value: 'М12, М8' },
      { label: 'Размер', value: '170 х 67 х 70 мм' },
      { label: 'Корпус', value: 'Алюминий с защитным покрытием' },
    ],
  },
  centralController: {
    id: 'central-controller',
    name: 'Центральный контроллер',
    image: centralController,
    specs: [
      { label: 'Каналы', value: '965' },
      { label: 'Частота измерений', value: '10 Гц' },
      { label: 'Погрешность позиционирования в RTK режиме (CKO)', value: '8 mm + 1 ppm в горизонтальной плоскости, 15mm + 1 ppm по высоте' },
      { label: 'Защита от повышенного напряжения', value: '50 В' },
      { label: 'Защита от смены полярности питания', value: 'Есть' },
      { label: 'Максимальная потребляемая мощность', value: '70 Вт' },
      { label: 'ГЛОНАСС', value: 'ГЛОНАСС: L1 C/A, L1P, L2 C/A, L2P' },
      { label: 'GPS', value: 'L1 C/A, L2P, L2C, L5' },
      { label: 'GALILEO', value: 'E1, E5a, E5b, E6' },
      { label: 'BeiDou', value: 'B1, B2, B3' },
      { label: 'SBAS', value: 'WAAS, EGNOS, MSAS, GAGAN, SDCM' },
      { label: 'QZSS', value: 'L1, L2C, L5' },
      { label: 'Вес', value: 'не более 2кг' },
      { label: 'Размер', value: '45 х 145 х 240 мм' },
      { label: 'Корпус', value: 'Алюминий с защитным покрытием' },
    ],
  },
}

/* ─── Products ─── */
export const products = {
  bulldozer: {
    slug: 'bulldozer',
    name: 'Бульдозер',
    systemName: 'Безмачтовая 3D система нивелирования',
    heroImgVW: 44,        // ширина машины в hero (vw), default 32
    ringMachineScale: 0.7, // машина крупнее в центре схемы
    heroTitle: 'Безмачтовая\n3D система\nнивелирования',
    heroSubtitle: 'Точность планировки без компромиссов',
    accentColor: 'bulldozer',
    heroImage: bulldozerHero,
    systemImage: bulldozerSystem,
    cardImage: cardBulldozer,
    cardImageColor: cardBulldozerColor,
    description:
      'Первая отечественная безмачтовая 3D-система нивелирования для бульдозеров. Инновационная технология без использования мачт обеспечивает непревзойдённую точность и надёжность в любых условиях эксплуатации на строительных площадках России.',
    features: [
      { title: 'Без мачт', value: '0', unit: 'мачт', description: 'Полностью безмачтовая конструкция — ничего лишнего' },
      { title: 'Точность', value: '±3', unit: 'мм', description: 'Планировка с миллиметровой точностью по всей площади' },
      { title: 'Установка', value: '30', unit: 'мин', description: 'Быстрый монтаж без специального инструмента' },
      { title: 'Защита', value: 'IP67', unit: '', description: 'Работа в экстремальных погодных условиях' },
    ],
    specs: [
      { label: 'Тип системы', value: 'Безмачтовая 3D' },
      { label: 'Точность вертикали', value: '±3 мм' },
      { label: 'Рабочий диапазон', value: 'до 300 м' },
      { label: 'Класс защиты', value: 'IP67' },
      { label: 'Питание', value: '12/24 В DC' },
      { label: 'Дисплей', value: '10.1" IPS сенсорный' },
      { label: 'Интерфейсы', value: 'CAN, RS-232, Bluetooth' },
      { label: 'Рабочая температура', value: '−40°C … +65°C' },
    ],
    /* 8 points on the diagram — positioned to match the reference schematic
       ringPos: { left, top } — explicit viewport % for component label/image
       machinePoint: [x%, y%] — coordinates on the machine image (0-100)
       clockHour: fallback position for ring layout */
    diagramComponents: [
      /* Top row */
      { ...COMPONENTS.gnssAntenna,         label: 'ГНСС антенны',                                    ringPos: { left: 15, top: 18 },  machinePoint: [32, 10],  clockHour: 11 },
      { ...COMPONENTS.panelBulldozer,      label: '10.1" консоль\nс ПО "КУРС"',                      ringPos: { left: 38, top: 3 },   machinePoint: [42, 15],  clockHour: 12 },
      { ...COMPONENTS.prismLps,            label: 'Призма режима ЛПС\n(опционально)',                 ringPos: { left: 68, top: 5 },   machinePoint: [55, 10],  clockHour: 1, imageScale: 0.45 },
      /* Middle row */
      { ...COMPONENTS.hydraulicController, label: 'Контроллер\nгидравлики',                           ringPos: { left: 10, top: 46 },  machinePoint: [32, 42],  clockHour: 9 },
      { ...COMPONENTS.inertialSensor,      label: 'Инерциальный датчик\nна отвале', id: 'inertial-blade', ringPos: { left: 84, top: 38 }, machinePoint: [80, 40], clockHour: 3 },
      /* Bottom row */
      { ...COMPONENTS.inertialSensor,      label: 'Инерциальный датчик\nв кабине',  id: 'inertial-cabin', ringPos: { left: 12, top: 68 }, machinePoint: [35, 52], clockHour: 8 },
      { ...COMPONENTS.centralController,   label: 'Центральный\nконтроллер',                          ringPos: { left: 40, top: 87 },  machinePoint: [48, 72],  clockHour: 6, imageScale: 1.45 },
      { ...COMPONENTS.inertialSensor,      label: 'Инерциальный датчик\nна штанге отвала\n(опционально)', id: 'inertial-arm', ringPos: { left: 76, top: 73 }, machinePoint: [68, 58], clockHour: 4 },
    ],
    /* Cards section — unique components only */
    componentCards: [
      COMPONENTS.panelBulldozer,
      COMPONENTS.prismLps,
      COMPONENTS.gnssAntenna,
      COMPONENTS.inertialSensor,
      COMPONENTS.hydraulicController,
      COMPONENTS.centralController,
    ],
  },

  excavator: {
    slug: 'excavator',
    name: 'Экскаватор',
    systemName: 'Индикаторная 3D система нивелирования',
    ringMachineScale: 0.75, // машина крупнее в центре схемы (default 0.6)
    heroTitle: 'Индикаторная\n3D система\nнивелирования',
    heroSubtitle: 'Контроль глубины в реальном времени',
    accentColor: 'excavator',
    heroImage: excavatorHero,
    systemImage: excavatorSystem,
    cardImage: cardExcavator,
    cardImageColor: cardExcavatorColor,
    description:
      'Индикаторная 3D-система для экскаваторов обеспечивает оператору полный контроль положения ковша относительно проектной поверхности. Интуитивная индикация делает работу простой и эффективной даже для начинающих операторов.',
    features: [
      { title: 'Точность', value: '±5', unit: 'мм', description: 'Контроль глубины с высочайшей точностью' },
      { title: 'Датчики', value: '4', unit: 'шт', description: 'Многоосевая система инерциальных датчиков' },
      { title: 'Экран', value: '10.1', unit: '"', description: 'Яркий IPS-дисплей читаемый на солнце' },
      { title: 'Защита', value: 'IP67', unit: '', description: 'Для самых суровых условий эксплуатации' },
    ],
    specs: [
      { label: 'Тип системы', value: 'Индикаторная 3D' },
      { label: 'Точность вертикали', value: '±5 мм' },
      { label: 'Количество датчиков', value: '4 инерциальных' },
      { label: 'Класс защиты', value: 'IP67' },
      { label: 'Питание', value: '12/24 В DC' },
      { label: 'Дисплей', value: '10.1" IPS сенсорный' },
      { label: 'Интерфейсы', value: 'CAN, RS-232, Wi-Fi' },
      { label: 'Рабочая температура', value: '−40°C … +65°C' },
    ],
    diagramComponents: [
      { ...COMPONENTS.panelExcavator, x: 55, y: 30, machinePoint: [72, 22], clockHour: 1 },
      { ...COMPONENTS.gnssAntenna, x: 48, y: 8, machinePoint: [55, 5], clockHour: 12 },
      { ...COMPONENTS.inertialSensor, x: 20, y: 25, label: 'Инерциальный датчик (стрела)', machinePoint: [28, 18], clockHour: 10.5 },
      { ...COMPONENTS.inertialSensor, x: 12, y: 45, label: 'Инерциальный датчик (рукоять)', id: 'inertial-sensor-2', machinePoint: [15, 42], clockHour: 9 },
      { ...COMPONENTS.inertialSensor, x: 8, y: 62, label: 'Инерциальный датчик (ковш)', id: 'inertial-sensor-3', machinePoint: [8, 68], clockHour: 7.5 },
      { ...COMPONENTS.inertialSensor, x: 35, y: 50, label: 'Инерциальный датчик (корпус)', id: 'inertial-sensor-4', machinePoint: [48, 52], clockHour: 5 },
      { ...COMPONENTS.centralController, x: 45, y: 45, machinePoint: [58, 42], clockHour: 3, imageScale: 1.45 },
    ],
    componentCards: [
      COMPONENTS.panelExcavator,
      COMPONENTS.gnssAntenna,
      COMPONENTS.inertialSensor,
      COMPONENTS.centralController,
    ],
  },

  grader: {
    slug: 'grader',
    name: 'Грейдер',
    systemName: 'Двухмачтовая 3D система нивелирования',
    heroImgVW: 44,        // ширина машины в hero (vw), default 32
    ringMachineScale: 0.75, // машина крупнее в центре схемы (default 0.6)
    heroTitle: 'Двухмачтовая\n3D система\nнивелирования',
    heroSubtitle: 'Абсолютная точность в каждом проходе',
    accentColor: 'grader',
    heroImage: graderHero,
    systemImage: graderSystem,
    cardImage: cardGrader,
    cardImageColor: cardGraderColor,
    description:
      'Двухмачтовая 3D-система для автогрейдеров — флагманское решение для высокоточного профилирования дорог. Две мачты обеспечивают непрерывный контроль положения отвала по всем осям одновременно.',
    features: [
      { title: 'Мачты', value: '2', unit: 'шт', description: 'Двойная мачтовая система для максимальной точности' },
      { title: 'Точность', value: '±2', unit: 'мм', description: 'Наивысшая точность профилирования в классе' },
      { title: 'Оси', value: '3', unit: 'оси', description: 'Полный контроль по X, Y и Z осям' },
      { title: 'Защита', value: 'IP68', unit: '', description: 'Максимальный класс защиты от пыли и воды' },
    ],
    specs: [
      { label: 'Тип системы', value: 'Двухмачтовая 3D' },
      { label: 'Точность вертикали', value: '±2 мм' },
      { label: 'Количество мачт', value: '2' },
      { label: 'Класс защиты', value: 'IP68' },
      { label: 'Питание', value: '12/24 В DC' },
      { label: 'Дисплей', value: '12.1" IPS сенсорный' },
      { label: 'Интерфейсы', value: 'CAN, RS-232, Wi-Fi, Bluetooth' },
      { label: 'Рабочая температура', value: '−40°C … +65°C' },
    ],
    diagramComponents: [
      { ...COMPONENTS.panelGrader, x: 60, y: 25, machinePoint: [68, 18], clockHour: 1 },
      { ...COMPONENTS.gnssAntenna, x: 30, y: 5, machinePoint: [25, 5], clockHour: 11 },
      { ...COMPONENTS.inertialSensor, x: 35, y: 55, machinePoint: [32, 55], clockHour: 8 },
      { ...COMPONENTS.hydraulicController, x: 50, y: 65, machinePoint: [48, 72], clockHour: 6 },
      { ...COMPONENTS.centralController, x: 55, y: 40, machinePoint: [58, 35], clockHour: 3, imageScale: 1.45 },
    ],
    componentCards: [
      COMPONENTS.panelGrader,
      COMPONENTS.gnssAntenna,
      COMPONENTS.inertialSensor,
      COMPONENTS.hydraulicController,
      COMPONENTS.centralController,
    ],
  },
}
