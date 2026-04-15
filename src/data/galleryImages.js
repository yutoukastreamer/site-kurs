/**
 * ════════════════════════════════════════════════
 *  GALLERY IMAGES — добавляйте новые фото сюда!
 * ════════════════════════════════════════════════
 *
 *  Как добавить новое фото:
 *  1. Положите файл в папку  src/assets/images/gallery/
 *  2. Добавьте import ниже (следуя шаблону)
 *  3. Добавьте объект в массив galleryImages
 *
 *  Формат объекта:
 *  {
 *    src: importedImage,       // импортированная переменная
 *    alt: 'Описание фото',    // для доступности и SEO
 *  }
 */

import gallery1 from '../assets/images/gallery/gallery-1.JPG'
import gallery2 from '../assets/images/gallery/gallery-2.JPG'
import gallery3 from '../assets/images/gallery/gallery-3.JPG'
import gallery4 from '../assets/images/gallery/gallery-4.JPG'
import gallery5 from '../assets/images/gallery/gallery-5.JPG'
import gallery6 from '../assets/images/gallery/gallery-6.JPG'
import gallery7 from '../assets/images/gallery/gallery-7.jpg'
import gallery8 from '../assets/images/gallery/gallery-8.jpg'
import gallery9 from '../assets/images/gallery/gallery-9.jpg'

const galleryImages = [
  { src: gallery1, alt: 'На объекте — фото 1' },
  { src: gallery2, alt: 'На объекте — фото 2' },
  { src: gallery3, alt: 'На объекте — фото 3' },
  { src: gallery4, alt: 'На объекте — фото 4' },
  { src: gallery5, alt: 'На объекте — фото 5' },
  { src: gallery6, alt: 'На объекте — фото 6' },
  { src: gallery7, alt: 'На объекте — фото 7' },
  { src: gallery8, alt: 'На объекте — фото 8' },
  { src: gallery9, alt: 'На объекте — фото 9' },
]

export default galleryImages
