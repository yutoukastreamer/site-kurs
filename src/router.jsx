import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/Home/HomePage'
import ProductPage from './pages/Product/ProductPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/bulldozer" element={<ProductPage productKey="bulldozer" />} />
        <Route path="/excavator" element={<ProductPage productKey="excavator" />} />
        <Route path="/grader" element={<ProductPage productKey="grader" />} />
      </Route>
    </Routes>
  )
}
