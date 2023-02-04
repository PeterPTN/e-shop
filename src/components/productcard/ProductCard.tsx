import { Link } from 'react-router-dom';
import { determineAvailability } from '../../services/data-utils';
import type { ProductItems } from '../../lib/types'
import styles from './ProductCard.module.scss';

interface Props {
    product: ProductItems
}

const ProductCard = ({ product }: Props) => {
    let sizeArray = determineAvailability(product);

    return (
        <Link to="/products" className={styles.ProductCard}>
            <img src="" />

            <div>
                <p>{product.item}</p>
                <p>available sizes: {sizeArray}</p>
                <p>${product.price.toFixed(2)}</p>
            </div>
        </Link>
    )
}

export default ProductCard