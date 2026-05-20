import Seo from '../../components/Seo'
import HeroHome from './HeroHome'
import ProductsPreview from './ProductsPreview'
import WhyChooseUs from './WhyChooseUs'
import GallerySection from './GallerySection'
import WhereToBuy from './WhereToBuy'

export default function HomePage() {
  return (
    <>
      <Seo
        title="КУРС — отечественные 3D системы нивелирования для спецтехники"
        description="КУРС — российские 3D системы нивелирования для бульдозеров, экскаваторов и грейдеров. Повышают точность и производительность земляных работ."
        keywords="3D нивелирование, системы нивелирования, нивелирование спецтехники, КУРС, ГСИ"
        path="/"
      />
      <HeroHome />
      <ProductsPreview />
      <WhyChooseUs />
      <GallerySection />
      <WhereToBuy />
    </>
  )
}
