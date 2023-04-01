import { useState, useEffect } from 'react';
import { ProductsArray } from '../lib/types';
import { getAllProducts } from '../services/firebase-utils';

const useGenerateFavourites = () => {
  const [favouriteProducts, setFavouriteProductsArray] = useState<ProductsArray>([]);
  const [error, setError] = useState<string | null>(null);

  const getFavouritedProducts = async () => {
    try {
      const allProducts = await getAllProducts();
      const allFavourited = allProducts.filter(product => product.favourite);
      setFavouriteProductsArray(allFavourited);
    } catch (error) {
      setError("Error getting favourites");
    }
  }

  useEffect(() => {
    getFavouritedProducts();
  }, [])

  return { favouriteProducts, error }
}

export default useGenerateFavourites