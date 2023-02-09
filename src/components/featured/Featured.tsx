import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import { ProductItems } from '../../lib/types';
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import styles from './Featured.module.scss';

interface Prop {
    product: ProductItems
}

const Featured = ({ product }: Prop) => {
    const navigate = useNavigate();
    const { setSmallHeader } = useContext(HeaderToggleContext);

    const handleClick = () => {
        setSmallHeader(true);
        navigate(`/products/${product.type}_${product.id}`)
    }

    return (
        <div className={styles.FeaturedCard}>
            <img src={product.img[0]}  />
            <button className={styles.featuredButton} onClick={handleClick} >{product.item}</button>
        </div>
    )
}

export default Featured