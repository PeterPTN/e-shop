import { addOneToCart, removeOneFromCart, removeProductFromCart } from '../../services/firebase-utils'
import { useState, useContext, useEffect } from 'react';
import { CartTotalContext } from '../../context/CartTotalProvider';
import { ProductItems } from '../../lib/types';
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
    const [withinCart, setWithinCart] = useState(0);
    const { setCartNumber } = useContext(CartTotalContext);
    const cancelModalStyles = showCancelModal ? [styles.showCancelModal] : [styles.hideCancelModal];
    const unavailableModalStyles = showUnavailableModal ? [styles.showUnavailableModal] : [styles.hideUnavailableModal];
    const productCardStyles = showProductCard ? [styles.CartProductCard] : [styles.CartProductCard, styles.FadeOut];
    const chosenSize = product.chosenSize as keyof Sizes;
    const sizesList: Sizes = product.sizes;
    const cartList: Sizes = product.inCart;

    const handleProductDecrementClick = () => {
        if (withinCart === 1) {
            setShowCancelModal(true);
            return;
        }
        removeOneFromCart(product.id, product.type, chosenSize);
        setCartNumber(current => current - 1);
        setWithinCart(current => current - 1);
        setAvailableProducts(current => current + 1);
    }

    const handleProductIncrementClick = () => {
        if (availableProducts === 0) {
            setShowUnavailableModal(true);
            // TO REMOVE CLASS BUT WAIT TILL ANIMATION IS OVER
            setTimeout(() => setShowUnavailableModal(false), 2000);
            return;
        }
        addOneToCart(product.id, product.type, chosenSize);
        setCartNumber(current => current + 1);
        setWithinCart(current => current + 1);
        setAvailableProducts(current => current - 1);
    }

    const handleCancelClick = () => {
        setShowCancelModal(false);
    }

    const handleProductRemoveClick = () => {
        removeProductFromCart(product.id, product.type, chosenSize, withinCart);
        setShowProductCard(false);
        setCartNumber(current => current - withinCart);
    }

    useEffect(() => {
        setWithinCart(cartList[chosenSize]);
        setAvailableProducts(sizesList[chosenSize]);
    }, [])


    return (
        <div className={productCardStyles.join(" ")}>
            <div>
                <p>{product.item}</p>
                <p>{product.chosenSize}</p>
            </div>

            <div className={styles.CartThings}>
                <p className={unavailableModalStyles.join("")}>Insufficient stock</p>

                <button onClick={handleProductDecrementClick} >-</button>
                <p>{withinCart}</p>
                <button onClick={handleProductIncrementClick} >+</button>
                <button onClick={handleProductRemoveClick} >insert bin image</button>

                <div className={cancelModalStyles.join("")}>
                    <p>Remove this item from cart?</p>
                    <button onClick={handleProductRemoveClick}>Remove</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default CartProductCard