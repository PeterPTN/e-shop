import type { ProductItems } from '../../lib/types';
import { useState, useEffect, useContext } from 'react'
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import { getAllProducts } from '../../services/firebase-utils'
import { LoaderContext } from '../../context/LoaderProvider';
import CartProductCard from '../../components/cartproductcard/CartProductCard';
import styles from './CartPage.module.scss';
import Loader from '../loaderpage/Loader';

const CartPage = () => {
  const [products, setProducts] = useState<ProductItems[]>([]);
  const { loader, setLoader } = useContext(LoaderContext);
  const { smallHeader, setSmallHeader } = useContext(HeaderToggleContext);

  useEffect(() => {
    const generateProducts = async () => {
      const allProducts = await getAllProducts();
      const cartItems = allProducts
        .reduce((array: ProductItems[], item) => {
          const cartData = Object.entries(item.inCart);
          cartData.map((sizeArray) => {
            if (sizeArray[1]) array.push({ ...item, chosenSize: sizeArray[0] })
          })
          return array;
        }, [])
        .sort((a, b) => (a.chosenSize > b.chosenSize) ? 1 : ((b.chosenSize > a.chosenSize) ? -1 : 0));
      setProducts(cartItems);
    }

    generateProducts();
  }, [])

  useEffect(() => {
    if (!smallHeader) setSmallHeader(true);
    setLoader(true);
    setTimeout(() => setLoader(false), 1000);
  }, [])

  return (
    <>
      {loader && <Loader />}
      <div className={styles.CartPage}>
        <header>
          <h2>Review Cart</h2>
        </header>

        <div className={styles.ReviewCart}>
          {products.map((product, index) => (
            <CartProductCard
              key={product.id + index}
              product={product}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default CartPage