import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import { useContext, useEffect, useState } from 'react'
import { ProductTypeContext } from '../../context/ProductTypeProvider';
import styles from './ProductsPage.module.scss';
import ProductFilter from '../../components/productfilter/ProductFilter';
import Loader from '../loaderpage/Loader';
import ProductDisplay from '../../containers/productdisplay/ProductDisplay';

const ProductsPage = () => {
  const [loader, setLoader] = useState(true);
  const { smallHeader, setSmallHeader } = useContext(HeaderToggleContext);
  const { productType } = useContext(ProductTypeContext);

  const heading = productType === "all"
    ? "All Products"
    : productType === "tops"
      ? "Men's Tops" :
      "Mens Bottoms"

  useEffect(() => {
    if (!smallHeader) setSmallHeader(true);

    setTimeout(() => setLoader(false), 405);
  }, [])

  return (
    <>
      {loader && <Loader />}

      <div className={styles.Products}>
        <header>
          {/* Dynamic title based on filter */}
          <h2>{heading}</h2>

          <ProductFilter />
        </header>

        <ProductDisplay />
      </div>
    </>
  )
}

export default ProductsPage