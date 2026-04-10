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
import radioAntenna from '../assets/images/components/radio-antenna.png'
import radioModem from '../assets/images/components/radio-modem.png'

/* ─── Shared component definitions ─── */
const COMPONENTS = {
  panelBulldozer: {
    id: 'panel-bulldozer',
    name: 'Панель управления с ПО «Курс»',
    image: panelBulldozer,
    specs: [
      { label: 'Дисплей', value: '10.1" IPS сенсорный' },
      { label: 'Разрешение', value: '1280×800 px' },
      { label: 'Яркость', value: '1000 нит' },
      { label: 'Защита', value: 'IP67' },
      { label: 'Питание', value: '12/24 В DC' },
      { label: 'ОС', value: 'Linux (встроенная)' },
    ],
  },
  panelExcavator: {
    id: 'panel-excavator',
    name: 'Панель управления с ПО «Курс»',
    image: panelExcavator,
    specs: [
      { label: 'Дисплей', value: '10.1" IPS сенсорный' },
      { label: 'Разрешение', value: '1280×800 px' },
      { label: 'Яркость', value: '1000 нит' },
      { label: 'Защита', value: 'IP67' },
      { label: 'Питание', value: '12/24 В DC' },
      { label: 'ОС', value: 'Linux (встроенная)' },
    ],
  },
  panelGrader: {
    id: 'panel-grader',
    name: 'Панель управления с ПО «Курс»',
    image: panelGrader,
    specs: [
      { label: 'Дисплей', value: '12.1" IPS сенсорный' },
      { label: 'Разрешение', value: '1920×1080 px' },
      { label: 'Яркость', value: '1000 нит' },
      { label: 'Защита', value: 'IP67' },
      { label: 'Питание', value: '12/24 В DC' },
      { label: 'ОС', value: 'Linux (встроенная)' },
    ],
  },
  prismLps: {
    id: 'prism-lps',
    name: 'Призма режима ЛПС',
    image: prismLps,
    specs: [
      { label: 'Тип', value: '360° отражающая призма' },
      { label: 'Точность', value: '±1 мм' },
      { label: 'Материал', value: 'Оптическое стекло' },
      { label: 'Крепление', value: 'Магнитное' },
      { label: 'Защита', value: 'IP66' },
    ],
  },
  gnssAntenna: {
    id: 'gnss-antenna',
    name: 'ГНСС антенна',
    image: gnssAntenna,
    specs: [
      { label: 'Системы', value: 'GPS, ГЛОНАСС, BeiDou, Galileo' },
      { label: 'Каналы', value: 'L1/L2/L5' },
      { label: 'Точность RTK', value: '±8 мм + 1 ppm' },
      { label: 'Защита', value: 'IP67' },
      { label: 'Вес', value: '0.5 кг' },
    ],
  },
  inertialSensor: {
    id: 'inertial-sensor',
    name: 'Инерциальный датчик',
    image: inertialSensor,
    specs: [
      { label: 'Тип', value: 'MEMS IMU' },
      { label: 'Оси', value: '6 (3 акселерометра + 3 гироскопа)' },
      { label: 'Точность наклона', value: '±0.1°' },
      { label: 'Частота', value: '100 Гц' },
      { label: 'Защита', value: 'IP68' },
      { label: 'Рабочая температура', value: '−40°C … +85°C' },
    ],
  },
  hydraulicController: {
    id: 'hydraulic-controller',
    name: 'Контроллер гидравлики',
    image: hydraulicController,
    specs: [
      { label: 'Каналы управления', value: '2 / 4 (настраиваемые)' },
      { label: 'Ток клапана', value: 'до 3 А на канал' },
      { label: 'Интерфейс', value: 'CAN 2.0B' },
      { label: 'Защита', value: 'IP67' },
      { label: 'Питание', value: '12/24 В DC' },
    ],
  },
  centralController: {
    id: 'central-controller',
    name: 'Центральный контроллер',
    image: centralController,
    specs: [
      { label: 'Процессор', value: 'ARM Cortex-A53' },
      { label: 'Интерфейсы', value: 'CAN, RS-232, Ethernet, USB' },
      { label: 'Беспроводные', value: 'Wi-Fi, Bluetooth 5.0' },
      { label: 'Память', value: '4 ГБ RAM, 32 ГБ Flash' },
      { label: 'Защита', value: 'IP67' },
      { label: 'Рабочая температура', value: '−40°C … +65°C' },
    ],
  },
  radioAntenna: {
    id: 'radio-antenna',
    name: 'Радио/GSM антенна',
    image: radioAntenna,
    specs: [
      { label: 'Диапазон', value: '410–470 МГц / GSM 900/1800' },
      { label: 'Мощность', value: 'до 2 Вт' },
      { label: 'Дальность', value: 'до 10 км (прямая видимость)' },
      { label: 'Защита', value: 'IP66' },
    ],
  },
  radioModem: {
    id: 'radio-modem',
    name: 'Радио/GSM модем',
    image: radioModem,
    specs: [
      { label: 'Протоколы', value: 'NTRIP, TCP/IP, Serial' },
      { label: 'Частота', value: 'UHF 410–470 МГц' },
      { label: 'Скорость', value: 'до 19200 бод' },
      { label: 'Интерфейс', value: 'RS-232, USB' },
      { label: 'Защита', value: 'IP67' },
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
    // ringMachineScale не указан → будет 0.6 (default)
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
    /* 8 points on the diagram
       machinePoint: [x%, y%] — coordinates on the machine image (0-100)
       clockHour: position around the ring (1–12, like a clock face) */
    diagramComponents: [
      { ...COMPONENTS.panelBulldozer, x: 62, y: 35, machinePoint: [78, 22], clockHour: 1.5 },
      { ...COMPONENTS.prismLps, x: 15, y: 20, machinePoint: [8, 45], clockHour: 10.5 },
      { ...COMPONENTS.gnssAntenna, x: 50, y: 8, machinePoint: [55, 5], clockHour: 12 },
      { ...COMPONENTS.inertialSensor, x: 25, y: 50, label: 'Инерциальный датчик #1', machinePoint: [22, 58], clockHour: 9 },
      { ...COMPONENTS.inertialSensor, x: 45, y: 55, label: 'Инерциальный датчик #2', id: 'inertial-sensor-2', machinePoint: [42, 62], clockHour: 7.5 },
      { ...COMPONENTS.inertialSensor, x: 70, y: 52, label: 'Инерциальный датчик #3', id: 'inertial-sensor-3', machinePoint: [82, 58], clockHour: 4.5 },
      { ...COMPONENTS.hydraulicController, x: 55, y: 70, machinePoint: [50, 78], clockHour: 6 },
      { ...COMPONENTS.centralController, x: 40, y: 40, machinePoint: [60, 38], clockHour: 3 },
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
      { ...COMPONENTS.centralController, x: 45, y: 45, machinePoint: [58, 42], clockHour: 3 },
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
      { ...COMPONENTS.centralController, x: 55, y: 40, machinePoint: [58, 35], clockHour: 3 },
      { ...COMPONENTS.radioAntenna, x: 70, y: 10, machinePoint: [78, 8], clockHour: 12.5 },
      { ...COMPONENTS.radioModem, x: 65, y: 50, machinePoint: [72, 48], clockHour: 4.5 },
    ],
    componentCards: [
      COMPONENTS.panelGrader,
      COMPONENTS.gnssAntenna,
      COMPONENTS.inertialSensor,
      COMPONENTS.hydraulicController,
      COMPONENTS.centralController,
      COMPONENTS.radioAntenna,
      COMPONENTS.radioModem,
    ],
  },
}
