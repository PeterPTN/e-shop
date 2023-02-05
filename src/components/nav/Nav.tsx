import { NavLink } from 'react-router-dom'
import styles from './Nav.module.scss';


const Nav = () => {
    return (
        // Placeholders add images
        <nav className={styles.Nav}>
            <NavLink to="/cart">Cart</NavLink>
            <NavLink to="/favourites" >Favourites</NavLink>
        </nav>
    )
}

export default Nav