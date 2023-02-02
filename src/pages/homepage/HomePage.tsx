import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import Featured from '../../components/featured/Featured';
import styles from './HomePage.module.scss';
import ShopThis from '../../components/shopthis/ShopThis';
import Loader from '../loaderpage/Loader';

const HomePage = () => {
    const [loader, setLoader] = useState(true);
    const { smallHeader, setSmallHeader } = useContext(HeaderToggleContext);
    const navigate = useNavigate();

    const handleClick = () => {
        setSmallHeader(true);
        navigate("/products");
    }

    useEffect(() => {
        if (smallHeader) setSmallHeader(false);
        setTimeout(() => setLoader(false), 405);
    }, [])

    return (
        <>
            {loader && <Loader />}
            <div className={styles.HomePage}>
                <div className={styles.Hero}>
                    <div className={styles.Tag}>
                        <h2>All Manner of Mens wear</h2>
                    </div>

                    {/* Toggle nav flag to change  */}
                    <button onClick={handleClick} >Shop Classics</button>
                </div>

                {/* Iterate over featured */}
                {/* Blocks of 3 */}
                {/* Carousel  */}
                <div className={styles.Featured}>
                    <Featured />
                    <Featured />
                    <Featured />
                </div>

                <ShopThis />
            </div>
        </>
    )
}

export default HomePage