import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import { useContext, useEffect, useState } from 'react'
import styles from './ProductsPage.module.scss';
import ProductFilter from '../../components/productfilter/ProductFilter';
import Loader from '../loaderpage/Loader';

const ProductsPage = () => {
  const [loader, setLoader] = useState(true);
  const { smallHeader, setSmallHeader } = useContext(HeaderToggleContext);

  useEffect(() => {
    if (!smallHeader) setSmallHeader(true);

    setTimeout(() => setLoader(false), 405);
  }, [])

  // useEffect for TOP BOTTOM or ACCESSORIES filters

  const handleFilterClick = () => {

  }

  return (
    <>
      {loader && <Loader />}

      <div className={styles.Products}>
        <header>
          {/* Dynamic title based on filter */}
          <h2>All products</h2>

          <ProductFilter />
        </header>

      </div>
    </>
  )
}

export default ProductsPage