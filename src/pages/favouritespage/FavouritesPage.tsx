import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import { ProductTypeContext } from '../../context/ProductTypeProvider';
import { LoaderContext } from '../../context/LoaderProvider';
import FavouritesDisplay from '../../containers/favouritesdisplay/FavouritesDisplay';
import styles from './FavouritesPage.module.scss';
import Loader from '../loaderpage/Loader';
import useGenerateFavourites from '../../hooks/useGenerateFavourites';

const FavouritesPage = () => {
    const { loader, setLoader } = useContext(LoaderContext);
    const { smallHeader, setSmallHeader } = useContext(HeaderToggleContext);
    const { setProductType } = useContext(ProductTypeContext)
    const navigate = useNavigate();
    const { favouriteProducts } = useGenerateFavourites();

    useEffect(() => {
        if (!smallHeader) setSmallHeader(true);
        setLoader(true);
        setTimeout(() => setLoader(false), 1000);
    }, [])

    const handleProductsClick = () => {
        setProductType("all");
        navigate("/products");
    }

    return (
        <>
            {loader && <Loader />}
            <div className={styles.FavouritesContainer}>
                <header>
                    <h2>Favourites</h2>
                    <button onClick={handleProductsClick} >Back to browsing</button>
                </header>

                <FavouritesDisplay favouriteProducts={favouriteProducts} />
            </div>
        </>
    )
}

export default FavouritesPage