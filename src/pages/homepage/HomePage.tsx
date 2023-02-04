import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import { ProductTypeContext } from '../../context/ProductTypeProvider';
import Featured from '../../components/featured/Featured';
import styles from './HomePage.module.scss';
import ShopThis from '../../components/shopthis/ShopThis';
import Loader from '../loaderpage/Loader';

const HomePage = () => {
    const [loader, setLoader] = useState(true);
    const { smallHeader, setSmallHeader } = useContext(HeaderToggleContext);
    const {setProductType} = useContext(ProductTypeContext);
    const navigate = useNavigate();

    const handleClick = () => {
        setSmallHeader(true);
        setProductType("all");
        navigate("/products");
    }

    useEffect(() => {
        if (smallHeader) setSmallHeader(false);
        setTimeout(() => setLoader(false), 405);
    }, []);

    // Call all products
    // onclick that slices in chunks
    // animation delay based on ul:nth-childs
    
    useEffect(() => {

    })

    return (
        <>
            {loader && <Loader />}
            <div className={styles.HomePage}>
                <div className={styles.Hero}>
                    <div className={styles.Tag}>
                        <h2>Menswear simplified</h2>
                    </div>

                    <button onClick={handleClick} >Shop Classics</button>
                </div>

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