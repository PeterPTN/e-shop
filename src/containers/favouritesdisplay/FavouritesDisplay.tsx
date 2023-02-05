import { ProductsArray } from '../../lib/types';
import { useState } from 'react'
import ProductCard from '../../components/productcard/ProductCard';
import FetchingDisplay from '../fetchingdisplay/FetchingDisplay';
import styles from './FavouritesDisplay.module.scss';

interface Props {
    favouriteProducts: ProductsArray
}

const FavouritesDisplay = ({ favouriteProducts }: Props) => {
    const [render, setRender] = useState(false);
    const isFavourited = true;
    if (favouriteProducts.length > 0) setTimeout(() => setRender(true), 300);

    return (
        <>
            {render
                ?
                <div className={styles.FavouritesDisplay}>
                    {favouriteProducts.map(product => <ProductCard
                        product={product}
                        isFavourited={isFavourited} />)}
                </div>
                :
                <FetchingDisplay />
            }
        </>
    )
}

export default FavouritesDisplay