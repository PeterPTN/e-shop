import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import { useContext, useEffect } from 'react'
import { ProductTypeContext } from '../../context/ProductTypeProvider';
import styles from './ProductsPage.module.scss';
import ProductFilter from '../../components/productfilter/ProductFilter';
import ProductDisplay from '../../containers/productdisplay/ProductDisplay';
import useGenerateProducts from '../../hooks/useGenerateProducts';

const ProductsPage = () => {
  const { smallHeader, setSmallHeader } = useContext(HeaderToggleContext);
  const { productType } = useContext(ProductTypeContext);
  const { products } = useGenerateProducts();

  const heading = productType === "all"
    ? "All Products"
    : productType === "tops"
      ? "Men's Tops" :
      "Mens Bottoms"

  useEffect(() => {
    if (!smallHeader) setSmallHeader(true);
  }, [])

  return (
    <>
      
      <div className={styles.Products}>
        <header>
          <h2>{heading}</h2>

          <ProductFilter />
        </header>

        <ProductDisplay products={products} />
      </div>
    </>
  )
}

export default ProductsPage