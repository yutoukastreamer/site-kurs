import { Outlet } from 'react-router-dom'
import Header from './Header'
import ContactFormSection from './ContactFormSection'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <ContactFormSection />
      {/* Разделительная черта между формой и подвалом */}
      <div className="bg-bg-dark">
        <div className="container-luxury">
          <div className="h-px bg-white/10" />
        </div>
      </div>
      <Footer />
    </div>
  )
}