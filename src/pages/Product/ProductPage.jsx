import { products } from '../../data/products.config'
import HeroRingSection from './HeroRingSection'
import DescriptionCardsSection from './DescriptionCardsSection'
import VideoSection from './VideoSection'

export default function ProductPage({ productKey }) {
  const product = products[productKey]

  if (!product) return null

  return (
    <>
      <HeroRingSection product={product} />
      <DescriptionCardsSection product={product} />
      <VideoSection product={product} />
    </>
  )
}
