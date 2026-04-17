import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AppRouter from './router'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      // Target section may not be mounted yet after route change — retry briefly.
      let attempts = 0
      const tryScroll = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else if (attempts++ < 15) {
          setTimeout(tryScroll, 50)
        }
      }
      tryScroll()
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.key])

  return <AppRouter />
}
