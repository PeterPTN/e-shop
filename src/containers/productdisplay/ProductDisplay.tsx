import type { ProductsArray } from '../../lib/types';
import ProductCard from '../../components/productcard/ProductCard';
import styles from './ProductDisplay.module.scss';
import { useState } from 'react';
import FetchingDisplay from '../fetchingdisplay/FetchingDisplay';

interface Props {
  products: ProductsArray
}

const ProductDisplay = ({ products }: Props) => {
  const [render, setRender] = useState(false);
  if (products.length > 0) setTimeout(() => setRender(true), 500);

  return (
    <>
      {render ?
        <>
          <h3>{products.length} styles found.</h3>

          <div className={styles.ProductDisplay}>
            {products.length > 0
              ? products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))
              : <h4>Nothing to render</h4>}
          </div>
        </>
        :
        <FetchingDisplay />}
    </>
  )
}

export default ProductDisplay