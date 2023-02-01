import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import Featured from '../../components/featured/Featured';
import styles from './HomePage.module.scss';

const HomePage = () => {
    const { smallHeader, setSmallHeader } = useContext(HeaderToggleContext);
    const navigate = useNavigate();

    const handleClick = () => {
        setSmallHeader(true);
        navigate("/products");
    }

    useEffect(() => {
        if (smallHeader) setSmallHeader(false);
    }, [])

    return (
        <div className={styles.HomePage}>
            <div className={styles.HomePage__hero}>
                <div className={styles.HomePage__hero_tag}>
                    <h2>All Manner of Mens wear</h2>
                </div>

                {/* Toggle nav flag to change  */}
                <button onClick={handleClick} >Shop Classics</button>
            </div>

            <div className={styles.HomePage__featured}>
                <Featured />
                <Featured />
                <Featured />
            </div>
        </div>
    )
}

export default HomePage