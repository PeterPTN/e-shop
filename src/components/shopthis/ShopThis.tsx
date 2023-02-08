import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductTypeContext } from '../../context/ProductTypeProvider';
import styles from './ShopThis.module.scss';

const ShopThis = () => {
    const navigate = useNavigate();
    const { setProductType } = useContext(ProductTypeContext);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        const filterType = target.innerText.split(" ")[1].toLowerCase();
        setProductType(filterType);
        navigate("/products");
    }

    return (
        <div className={styles.ShopThis}>
            <div><button onClick={handleClick}>shop tops</button></div>
            <div><button onClick={handleClick}>shop bottoms</button></div>
        </div>
    )
}

export default ShopThis