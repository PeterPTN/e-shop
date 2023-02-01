import React from 'react';
import styles from './Featured.module.scss';
import { Link } from 'react-router-dom'

const Featured = () => {
    return (
        <div className={styles.Featured}>
            <Link to=''>Shop TOP/BOTTOM/HATS</Link>
        </div>
    )
}

export default Featured