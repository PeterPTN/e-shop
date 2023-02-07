import type { ProductItems } from '../../lib/types';
import { getAllProducts } from '../../services/firebase-utils';
import { useEffect, useState, useContext } from 'react';
import { CartTotalContext } from '../../context/CartTotalProvider';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';

const Nav = () => {
    const { cartNumber, setCartNumber } = useContext(CartTotalContext);

    // Reload on product update
    useEffect(() => {
        const generateProducts = async () => {
            const allProducts = await getAllProducts();
            const amountInCart = allProducts.reduce((total, item) => {
                Object.values(item.inCart).forEach(value => total += value)
                return total
            }, 0)
            setCartNumber(amountInCart);
        }
        generateProducts();
    }, [])

    return (
        // Placeholders add images
        <nav className={styles.Nav}>
            <NavLink to="/cart">{cartNumber > 0 && cartNumber} Cart</NavLink>
            <NavLink to="/favourites" >Favourites</NavLink>
        </nav>
    )
}

export default Nav