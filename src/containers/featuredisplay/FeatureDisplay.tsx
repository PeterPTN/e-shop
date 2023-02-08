import type { ProductsArray } from '../../lib/types'
import { useState, useEffect } from 'react'
import { getAllProducts } from '../../services/firebase-utils';
import Featured from '../../components/featured/Featured';
import styles from './FeatureDisplay.module.scss';

const FeatureDisplay = () => {
  const [products, setProducts] = useState<ProductsArray>([]);
  const [featuredStyles, setFeaturedStyles] = useState([styles.FeatureDisplay]);
  const [indexes, setIndexes] = useState({ start: 0, end: 3 });
  const carouselArray = products.slice(indexes.start, indexes.end);

  const handleAddLeftToRightClass = (number: number) => {
    if (indexes.end + 3 > products.length && number === 3) setIndexes({ start: 0, end: 3 });
    else setIndexes(current => ({ start: current.start + number, end: current.end + number }))
    setFeaturedStyles([styles.FeatureDisplay, styles.LeftToRightAnimation]);
  }

  const handleAddRightToLeftClass = (number: number) => {
    if (indexes.start - 3 <= 0 && number === -3) setIndexes({ start: products.length - 3, end: products.length });
    else setIndexes(current => ({ start: current.start + number, end: current.end + number }))
    setFeaturedStyles([styles.FeatureDisplay, styles.RightToLeftAnimation]);
  }

  useEffect(() => {
    const generateProducts = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    }
    generateProducts();
  }, [])

  return (
    <>
      <div style={{position: "relative"}}>
        <h2 className={styles.Featured}>Featured Products</h2>
        <div className={featuredStyles.join(" ")}>
          <button className={styles.Arrows} onClick={() => handleAddRightToLeftClass(-3)}>&#8249;</button>
          {carouselArray.length > 0 && carouselArray.map((product) => (
            <Featured key={product.id} product={product} />
          ))}
          <button className={styles.Arrows} onClick={() => handleAddLeftToRightClass(3)}>&#8250;</button>
        </div>
      </div>
    </>
  )
}

export default FeatureDisplay