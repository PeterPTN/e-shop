import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import { useContext, useEffect } from 'react'
import styles from './ProductsPage.module.scss';

const ProductsPage = () => {
  const { smallHeader, setSmallHeader } = useContext(HeaderToggleContext);

  useEffect(() => {
    if (!smallHeader) setSmallHeader(true);
  }, [])


  return (
    <div className={styles.Products}>
      ProductsPage
    </div>
  )
}

export default ProductsPage