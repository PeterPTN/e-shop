import type { ProductItems } from '../../lib/types'
import { useContext, useEffect, useState } from 'react';
import { determineAvailability } from '../../services/data-utils';
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import { setFavouriteProduct } from '../../services/firebase-utils';
import { useNavigate } from 'react-router-dom';
import star from '../../assets/svgs/star.svg';
import styles from './ProductCard.module.scss';

interface Props {
    product: ProductItems,
    isFavourited?: boolean
}

const ProductCard = ({ product, isFavourited }: Props) => {
    const [starStyles, setStarStyles] = useState<string[]>([styles.StarFalse])
    const [productCardStyles, setProductCardStyles] = useState<string[]>([styles.ProductCard]);
    const { setSmallHeader } = useContext(HeaderToggleContext);
    const navigate = useNavigate();
    let sizeArray = determineAvailability(product);

    const handleProductViewClick = () => {
        setSmallHeader(true);
        navigate(`/products/${product.type}_${product.id}`)
    }

    const handleFavouriteClick = (e: React.MouseEvent<HTMLElement>) => {
        // Prevent click bubbling to parent click event
        e.stopPropagation();
        setFavouriteProduct(product.id, product.type, product.favourite);

        const className = starStyles.toString().match(/[a-zA-Z]+/);
        if (className) className[0] === "StarTrue" ? setStarStyles([styles.StarFalse]) : setStarStyles([styles.StarTrue]);
        // Makes card disappear if from favouriteDisplay
        if (isFavourited) setProductCardStyles([styles.ProductCard, styles.ProductCardGone])
    }

    useEffect(() => {
        product.favourite ? setStarStyles([styles.StarTrue]) : setStarStyles([styles.StarFalse]);
    }, [])

    return (
        <div className={productCardStyles.join(" ")}>
            <div
                className={styles.StarContainer}
                onClick={handleFavouriteClick}>
                <img className={starStyles.join(" ")} src={star} />
            </div>

            <img onClick={handleProductViewClick} className={styles.ProductImage} src={product.img[0]} />

            <div className={styles.Info}>
                <p>{product.item}</p>
                <p>available sizes: {sizeArray}</p>
                <p>${product.price.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default ProductCard