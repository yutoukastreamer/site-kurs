import { products } from '../../data/products.config'
import Seo from '../../components/Seo'
import HeroRingSection from './HeroRingSection'
import DescriptionCardsSection from './DescriptionCardsSection'
import VideoSection from './VideoSection'

export default function ProductPage({ productKey }) {
  const product = products[productKey]

  if (!product) return null

  return (
    <>
      <Seo
        title={product.seo.title}
        description={product.seo.description}
        keywords={product.seo.keywords}
        path={`/${product.slug}`}
      />
      <HeroRingSection product={product} />
      <DescriptionCardsSection product={product} />
      <VideoSection product={product} />
    </>
  )
}
