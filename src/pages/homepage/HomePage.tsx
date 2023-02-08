import { useContext, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom'
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import { ProductTypeContext } from '../../context/ProductTypeProvider';
import { LoaderContext } from '../../context/LoaderProvider';
import styles from './HomePage.module.scss';
import ShopThis from '../../components/shopthis/ShopThis';
import Loader from '../loaderpage/Loader';
import FeatureDisplay from '../../containers/featuredisplay/FeatureDisplay';

const HomePage = () => {
    const { loader, setLoader } = useContext(LoaderContext);
    const { smallHeader, setSmallHeader } = useContext(HeaderToggleContext);
    const { setProductType } = useContext(ProductTypeContext);
    const navigate = useNavigate();

    const handleShopClick = () => {
        setProductType("all");
        navigate("/products");
    }

    useEffect(() => {
        if (smallHeader) setSmallHeader(false);
        setLoader(true);
        setTimeout(() => setLoader(false), 1000);
    }, []);

    return (
        <>
            {loader && <Loader />}
            <div className={styles.HomePage}>
                <div className={styles.Hero}>
                    <div className={styles.Tag}>
                        <h2>menswear simplified</h2>
                    </div>

                    <button onClick={handleShopClick} >shop classics</button>
                </div>

                <ShopThis />

                <FeatureDisplay />
            </div>
        </>
    )
}

export default HomePage