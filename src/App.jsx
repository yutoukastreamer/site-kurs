import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AppRouter from './router'

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return <AppRouter />
}
