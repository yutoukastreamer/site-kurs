import { useEffect } from 'react'

/* ─────────────────────────────────────────────────────────────
   SEO — пер-страничные мета-теги.
   Обновляет <title>, description, keywords, canonical и
   Open Graph / Twitter теги при переходе между страницами.
   Теги не дублируются: компонент находит уже существующие
   (в т.ч. из index.html) и обновляет их.
   ───────────────────────────────────────────────────────────── */

const SITE_URL = 'https://www.kurs-gsi.ru'
const SITE_NAME = 'КУРС — ГСИ'
const OG_IMAGE = `${SITE_URL}/og-image.png`

function upsert(selector, create) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  return el
}

function setMetaName(name, content) {
  if (content == null) return
  upsert(`meta[name="${name}"]`, () => {
    const m = document.createElement('meta')
    m.setAttribute('name', name)
    return m
  }).setAttribute('content', content)
}

function setMetaProp(property, content) {
  if (content == null) return
  upsert(`meta[property="${property}"]`, () => {
    const m = document.createElement('meta')
    m.setAttribute('property', property)
    return m
  }).setAttribute('content', content)
}

function setCanonical(href) {
  upsert('link[rel="canonical"]', () => {
    const l = document.createElement('link')
    l.setAttribute('rel', 'canonical')
    return l
  }).setAttribute('href', href)
}

export default function Seo({ title, description, keywords, path = '/' }) {
  useEffect(() => {
    const url = SITE_URL + path

    if (title) document.title = title
    setMetaName('description', description)
    setMetaName('keywords', keywords)
    setCanonical(url)

    setMetaProp('og:type', 'website')
    setMetaProp('og:site_name', SITE_NAME)
    setMetaProp('og:locale', 'ru_RU')
    setMetaProp('og:title', title)
    setMetaProp('og:description', description)
    setMetaProp('og:url', url)
    setMetaProp('og:image', OG_IMAGE)

    setMetaName('twitter:card', 'summary_large_image')
    setMetaName('twitter:title', title)
    setMetaName('twitter:description', description)
    setMetaName('twitter:image', OG_IMAGE)
  }, [title, description, keywords, path])

  return null
}
