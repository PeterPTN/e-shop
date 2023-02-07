import type { ProductsArray } from '../../lib/types'
import { useState, useContext, useEffect, } from 'react';
import { getAllProducts } from '../../services/firebase-utils';
import { useNavigate } from 'react-router-dom'
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import { ProductTypeContext } from '../../context/ProductTypeProvider';
import { LoaderContext } from '../../context/LoaderProvider';
import Featured from '../../components/featured/Featured';
import styles from './HomePage.module.scss';
import ShopThis from '../../components/shopthis/ShopThis';
import Loader from '../loaderpage/Loader';

const HomePage = () => {
    const { loader, setLoader } = useContext(LoaderContext);
    const [products, setProducts] = useState<ProductsArray>([]);
    const [indexes, setIndexes] = useState({ start: 0, end: 3 });
    const [featuredStyles, setFeaturedStyles] = useState([styles.FeaturedContainer])
    const { smallHeader, setSmallHeader } = useContext(HeaderToggleContext);
    const { setProductType } = useContext(ProductTypeContext);
    const navigate = useNavigate();

    const handleShopClick = () => {
        setProductType("all");
        navigate("/products");
    }

    const handleAddLeftToRightClass = (number: number) => {
        if (indexes.end + 3 > products.length && number === 3) setIndexes({ start: 0, end: 3 });
        else setIndexes(current => ({ start: current.start + number, end: current.end + number }))
        setFeaturedStyles([styles.FeaturedContainer, styles.LeftToRightAnimation]);
    }

    const handleAddRightToLeftClass = (number: number) => {
        if (indexes.start - 3 <= 0 && number === -3) setIndexes({ start: products.length - 3, end: products.length });
        else setIndexes(current => ({ start: current.start + number, end: current.end + number }))
        setFeaturedStyles([styles.FeaturedContainer, styles.RightToLeftAnimation]);
    }

    useEffect(() => {
        if (smallHeader) setSmallHeader(false);
        setLoader(true);
        setTimeout(() => setLoader(false), 1000);
    }, []);

    useEffect(() => {
        const generateProducts = async () => {
            const allProducts = await getAllProducts();
            setProducts(allProducts);
        }
        generateProducts();
    }, [])

    const carouselArray = products.slice(indexes.start, indexes.end);

    return (
        <>
            {loader && <Loader />}
            <div className={styles.HomePage}>
                <div className={styles.Hero}>
                    <div className={styles.Tag}>
                        <h2>Menswear simplified</h2>
                    </div>

                    <button onClick={handleShopClick} >Shop Classics</button>
                </div>

                <div className={featuredStyles.join(" ")}>
                    <button className={styles.Arrows} onClick={() => handleAddRightToLeftClass(-3)}>&#8249;</button>
                    {carouselArray.length > 0 && carouselArray.map((product) => (
                        <Featured key={product.id} product={product} />
                    ))}
                    <button className={styles.Arrows} onClick={() => handleAddLeftToRightClass(3)}>&#8250;</button>
                </div>

                <ShopThis />
            </div>
        </>
    )
}

export default HomePage