import { getAllProducts } from '../../services/firebase-utils';
import { useEffect, useState, useContext } from 'react';
import { CartTotalContext } from '../../context/CartTotalProvider';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';

const Nav = () => {
    const { cartNumber, setCartNumber } = useContext(CartTotalContext);
    const { smallHeader } = useContext(HeaderToggleContext);
    const NavStyles = smallHeader ? [styles.Nav, styles.SmallNav] : [styles.Nav];
    const CartStyles = cartNumber > 0 ? [styles.CartNumber] : [];

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
        <nav className={NavStyles.join(" ")}>
            <NavLink className={CartStyles.join("")} to="/cart">{cartNumber > 0 && cartNumber} cart</NavLink>
            <NavLink to="/favourites">favourites</NavLink>
        </nav>
    )
}

export default Nav