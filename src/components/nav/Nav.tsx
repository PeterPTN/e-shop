import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import styles from './Nav.module.scss';


const Nav = () => {

    return (
        // Placeholders add images
        <nav className={styles.Nav}>
            <NavLink to="/">Cart</NavLink>
            <NavLink to="">Account</NavLink>
        </nav>
    )
}

export default Nav