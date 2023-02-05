import { useState, useEffect } from 'react';
import { ProductsArray } from '../lib/types';
import { getAllProducts } from '../services/firebase-utils';

const useGenerateFavourites = () => {
  const [favouriteProducts, setFavouriteProducts] = useState<ProductsArray>([]);

  const getFavouritedProducts = async () => {
    const allProducts = await getAllProducts();
    const allFavourited = allProducts.filter(product => product.favourite);
    setFavouriteProducts(allFavourited);
  }

  useEffect(() => {
    getFavouritedProducts();
  }, [])

  return { favouriteProducts }
}

export default useGenerateFavourites