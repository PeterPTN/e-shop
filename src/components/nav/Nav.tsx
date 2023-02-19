import { useEffect, useContext, useState } from 'react';
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import { CartTotalContext } from '../../context/CartTotalProvider';
import { getAllProducts } from '../../services/firebase-utils';
import { ProductTypeContext } from '../../context/ProductTypeProvider';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';
import burger from '../../assets/svgs/burger.svg';

const Nav = () => {
    const [navStyles, setNavStyles] = useState([styles.Nav]);
    const [burgerStyles, setBurgerStyles] = useState([styles.Burger]);
    const { cartNumber, setCartNumber } = useContext(CartTotalContext);
    const { smallHeader } = useContext(HeaderToggleContext);
    const CartStyles = cartNumber > 0 ? [styles.CartNumber] : [];

    const handleBurgerClick = () => {
        if (smallHeader) {
            setNavStyles(current => [...current, styles.SmallNavFlyIn])
            setBurgerStyles(current => [...current, styles.SmallBurgerFlyOut]);
        }
        else {
            setNavStyles(current => [...current, styles.NavFlyIn])
            setBurgerStyles(current => [...current, styles.BurgerFlyOut]);
        };
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

    useEffect(() => {
        if (smallHeader) {
            setNavStyles([styles.Nav, styles.SmallNav]);
            setBurgerStyles([styles.Burger, styles.SmallBurger]);
        } else {
            setBurgerStyles([styles.Burger]);
            setNavStyles([styles.Nav]);
        }
    }, [smallHeader])

    useEffect(() => {
        if (navStyles.length === 2 && !smallHeader || navStyles.length === 3) {
            const handleClick = (e: any) => {
                const target = e.target as HTMLElement;
                // Hamburger icon parent is header - header has nav and burger
                if (target.parentElement && target.parentElement.localName === "header") return;
                if (smallHeader) {
                    setNavStyles([styles.Nav, styles.SmallNav]);
                    setBurgerStyles([styles.Burger, styles.SmallBurger]);
                } else {
                    setNavStyles([styles.Nav])
                    setBurgerStyles([styles.Burger]);
                };
            }

            document.addEventListener("click", handleClick);

            return () => document.removeEventListener("click", handleClick);
        }
    }, [navStyles])

    return (
        <>
            <nav className={navStyles.join(" ")}>
                <NavLink className={CartStyles.join("")} to="/cart">{cartNumber > 0 && cartNumber} cart</NavLink>
                <NavLink to="/favourites">favourites</NavLink>
            </nav>

            <img src={burger} alt="burger menu" className={burgerStyles.join(" ")} onClick={handleBurgerClick} />
        </>
    )
}

export default Nav