import React from 'react';
import styles from './Featured.module.scss';
import { Link } from 'react-router-dom'

const Featured = () => {
    // pass in ID for item

    return (
        <div className={styles.Featured}>
            <Link to='products/'>Classic Tee</Link>
        </div>
    )
}

export default Featured