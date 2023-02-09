import type { ProductItems } from '../../lib/types';
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import { getAllProducts } from '../../services/firebase-utils'
import { LoaderContext } from '../../context/LoaderProvider';
import { ProductTypeContext } from '../../context/ProductTypeProvider';
import { CartTotalContext } from '../../context/CartTotalProvider';
import { TotalPriceContext } from '../../context/TotalPriceProvider';
import CartProductCard from '../../components/cartproductcard/CartProductCard';
import styles from './CartPage.module.scss';
import Loader from '../loaderpage/Loader';

const CartPage = () => {
  const [products, setProducts] = useState<ProductItems[]>([]);
  const { totalPrice, setTotalPrice } = useContext(TotalPriceContext);
  const { cartNumber } = useContext(CartTotalContext);
  const { loader, setLoader } = useContext(LoaderContext);
  const { smallHeader, setSmallHeader } = useContext(HeaderToggleContext);
  const { setProductType } = useContext(ProductTypeContext);
  const gst = totalPrice * .1;
  const subTotal = totalPrice * .9;
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    setProductType("all");
    navigate("/products");
  }

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

    return () => {
      setTotalPrice(0);
    }
  }, [])

  return (
    <>
      {loader && <Loader />}
      <div className={styles.CartPage}>
        <header>
          <h2>Review Cart</h2>
          <button onClick={handleNavigateClick}>Back to products</button>
        </header>

        <div className={styles.ReviewCart}>
          {products.map((product, index) => (
            <CartProductCard
              key={product.id + index}
              product={product}
            />
          ))}
        </div>

        <div className={styles.CheckOut}>
            <span><h4>Total Items: </h4><h4>{cartNumber}</h4></span>
            <span><h4>Subtotal: </h4><h4>${subTotal.toFixed(2)}</h4></span>
            <span><h4>GST: </h4><h4>${gst.toFixed(2)}</h4></span>
            <span><h4>Grand Total: </h4><h4>${totalPrice.toFixed(2)}</h4></span>
            <span><button>Checkout</button></span>
        </div>
      </div>
    </>
  )
}

export default CartPage