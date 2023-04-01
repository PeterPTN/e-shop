import { ProductsArray } from '../../lib/types';
import { useState } from 'react'
import FetchingDisplay from '../fetchingdisplay/FetchingDisplay';
import ProductCard from '../../components/productcard/ProductCard';
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
                        key={product.id}
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