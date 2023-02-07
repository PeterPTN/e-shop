import styles from './Featured.module.scss';
import { useNavigate } from 'react-router-dom'
import { ProductItems } from '../../lib/types';
import { useContext } from 'react';
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';

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
            <button onClick={handleClick} >{product.item}</button>
        </div>
    )
}

export default Featured