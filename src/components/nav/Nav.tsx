import { useEffect, useContext } from 'react';
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import { CartTotalContext } from '../../context/CartTotalProvider';
import { getAllProducts } from '../../services/firebase-utils';
import { ProductTypeContext } from '../../context/ProductTypeProvider';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';

const Nav = () => {
    const { cartNumber, setCartNumber } = useContext(CartTotalContext);
    const { smallHeader } = useContext(HeaderToggleContext);
    const { setProductType } = useContext(ProductTypeContext);
    const NavStyles = smallHeader ? [styles.Nav, styles.SmallNav] : [styles.Nav];
    const CartStyles = cartNumber > 0 ? [styles.CartNumber] : [];
    const navigate = useNavigate();

    const handleClick = () => {
        setProductType("all");
        navigate("/products");
    }

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
            <p onClick={handleClick}>products</p>
            <NavLink to="/favourites">favourites</NavLink>
        </nav>
    )
}

export default Nav