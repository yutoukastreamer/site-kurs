import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/Home/HomePage'
import ProductPage from './pages/Product/ProductPage'
import NewsPage from './pages/News/NewsPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/bulldozer" element={<ProductPage productKey="bulldozer" />} />
        <Route path="/excavator" element={<ProductPage productKey="excavator" />} />
        <Route path="/grader" element={<ProductPage productKey="grader" />} />
        <Route path="/news" element={<NewsPage />} />
      </Route>

      {/* 404 — вне Layout, открывается на весь экран без Header / Footer */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
