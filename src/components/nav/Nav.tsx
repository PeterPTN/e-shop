import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Nav.module.scss';


const Nav = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/products");
        // Get all favourited items
    }

    return (
        // Placeholders add images
        <nav className={styles.Nav}>
            <NavLink to="/">Cart</NavLink>
            <NavLink to="">Account</NavLink>
            <button onClick={handleClick} >Favourited</button>
        </nav>
    )
}

export default Nav