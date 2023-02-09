import { addOneToCart, removeOneFromCart, removeProductFromCart } from '../../services/firebase-utils'
import { useState, useContext, useEffect, useRef } from 'react';
import { TotalPriceContext } from '../../context/TotalPriceProvider';
import { CartTotalContext } from '../../context/CartTotalProvider';
import { ProductItems } from '../../lib/types';
import { useNavigate } from 'react-router-dom';
import styles from './CartProductCard.module.scss';

interface Props {
    product: ProductItems
}

interface Sizes {
    xs: number
    s: number
    m: number
    l: number
    xl: number
}

const CartProductCard = ({ product }: Props) => {
    const [showUnavailableModal, setShowUnavailableModal] = useState<boolean>(false);
    const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
    const [showProductCard, setShowProductCard] = useState<boolean>(true);
    const [availableProducts, setAvailableProducts] = useState<number>(0);
    const [linePrice, setLinePrice] = useState(0);
    const [initialLinePrice, setInitialLinePrice] = useState(0);
    const { setTotalPrice } = useContext(TotalPriceContext);
    const { setCartNumber } = useContext(CartTotalContext);
    const cancelModalStyles = showCancelModal ? [styles.showCancelModal] : [styles.hideCancelModal];
    const unavailableModalStyles = showUnavailableModal ? [styles.showUnavailableModal] : [styles.hideUnavailableModal];
    const productCardStyles = showProductCard ? [styles.CartProductCard] : [styles.CartProductCard, styles.FadeOut];
    const chosenSize = product.chosenSize as keyof Sizes;
    const sizesList: Sizes = product.sizes;
    const cartList: Sizes = product.inCart;
    const navigate = useNavigate()
    let withinCart = useRef(0);

    const handleProductDecrementClick = () => {
        if (withinCart.current === 1) {
            setShowCancelModal(true);
            return;
        }
        removeOneFromCart(product.id, product.type, chosenSize);
        setCartNumber(current => current - 1);
        withinCart.current--
        setAvailableProducts(current => current + 1);
        setTotalPrice(current => current - product.price);
    }

    const handleProductIncrementClick = () => {
        if (availableProducts === 0) {
            setShowUnavailableModal(true);
            setTimeout(() => setShowUnavailableModal(false), 2000);
            return;
        }
        addOneToCart(product.id, product.type, chosenSize);
        setCartNumber(current => current + 1);
        withinCart.current++
        setAvailableProducts(current => current - 1);
        setTotalPrice(current => current + product.price);
    }

    const handleCancelClick = () => {
        setShowCancelModal(false);
    }

    const handleProductRemoveClick = () => {
        removeProductFromCart(product.id, product.type, chosenSize, withinCart.current);
        setShowProductCard(false);
        setCartNumber(current => current - withinCart.current);
    }

    const handleProductNavigateClick = () => {
        setTotalPrice(0);
        navigate(`/products/${product.type}_${product.id}`);
    }

    useEffect(() => {
        withinCart.current = cartList[chosenSize];
        setInitialLinePrice(withinCart.current * product.price)
        setAvailableProducts(sizesList[chosenSize]);
    }, [])

    useEffect(() => {
        // Set initial total price
        setTotalPrice(current => current + initialLinePrice);
    }, [initialLinePrice])

    useEffect(() => {
        setLinePrice(withinCart.current * product.price);
    }, [withinCart.current])

    // Atomise all this 
    return (
        <div className={productCardStyles.join(" ")}>
            <div className={styles.CartInfo}>
                <div className={styles.Image}>
                    <img src={product.img[0]} alt={product.item} onClick={handleProductNavigateClick} />
                </div>

                <div className={styles.Info}>
                    <h3>{product.item}</h3>
                    <p>Size: {product.chosenSize}</p>
                    <p>Colour: {product.color}</p>
                </div>
            </div>

            <div className={styles.CartChanger}>
                <div className={cancelModalStyles.join("")}>
                    <p>Remove this item from cart?</p>
                    <div>
                        <button onClick={handleCancelClick}>Cancel</button>
                        <button onClick={handleProductRemoveClick}>Remove</button>
                    </div>
                </div>

                <div className={styles.Quantity}>
                    <h3>Quantity</h3>
                    <button onClick={handleProductIncrementClick} >+</button>
                    <p>{withinCart.current}</p>
                    <button onClick={handleProductDecrementClick} >-</button>
                    <p className={unavailableModalStyles.join("")}>Insufficient stock</p>
                </div>

                <div className={styles.UnitPrice}>
                    <h3>Unit Price</h3>
                    <p>${product.price.toFixed(2)}</p>
                </div>


                <div className={styles.LinePrice}>
                    <h3>Line Total</h3>
                    <p>${linePrice.toFixed(2)}</p>
                </div>

                <div className={styles.Remove}>
                    <h3>Remove Item</h3>
                    <button onClick={handleProductRemoveClick}>&#10005;</button>
                </div>
            </div>
        </div>
    )
}

export default CartProductCard