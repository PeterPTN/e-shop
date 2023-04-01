import type { ProductsArray } from '../lib/types';
import { useState, useEffect, useContext } from 'react';
import { getBottoms, getTops, getAllProducts } from '../services/firebase-utils';
import { ProductTypeContext } from '../context/ProductTypeProvider';
import { PriceFilterContext } from '../context/PriceFilterProvider';
import { ColorFilterContext } from '../context/ColorFilterProvider';
import { SizeFilterContext } from '../context/SizeFilterProvider';

const useGenerateProducts = () => {
    const [products, setProducts] = useState<ProductsArray>([]);
    const [error, setError] = useState<string | null>(null);
    const { productType } = useContext(ProductTypeContext);
    const { priceFilter } = useContext(PriceFilterContext);
    const { colorFilter } = useContext(ColorFilterContext);
    const { sizeFilter } = useContext(SizeFilterContext);

    const getProductTops = async () => {
        try {
            const tops = await getTops();
            setProducts(tops);
        } catch (error) {
            setError("Error getting products");
        }
    }

    const getProductBottoms = async () => {
        try {
            const bottoms = await getBottoms();
            setProducts(bottoms);
        } catch (error) {
            setError("Error getting bottoms");
        }
    }

    const getDefaultProducts = async () => {
        try {
            const allProducts = await getAllProducts();
            setProducts(allProducts);
        } catch (error) {
            setError("Error getting tops");
        }
    }

    const filterPrice = (filter: string) => {
        if (filter.charAt(0) === "l") setProducts(product => product.slice(0).sort((a, b) => a.price - b.price));
        else if (filter.charAt(0) === "h") setProducts(product => product.slice(0).sort((a, b) => b.price - a.price));
    }

    const filterByColor = (filter: string) => {
        setProducts((current) => current.slice().filter(product => filter.includes(product.color)));
    }

    const filterBysize = (filter: string) => {
        setProducts((current) => current.slice().reduce((array: ProductsArray, product) => {
            Object.entries(product.sizes).forEach(([key, value]) => {
                if (filter.includes(key) && value > 0 && (!array.includes(product))) array.push(product);
            });
            return array;
        }, []))
    }

    useEffect(() => {
        const generateProducts = async () => {
            // Get products
            if (productType === "tops") await getProductTops();
            else if (productType === "bottoms") await getProductBottoms();
            else if (productType === "all") await getDefaultProducts();
            // Sort by price
            if (priceFilter) await filterPrice(priceFilter);
            // Filter by color
            if (colorFilter.length > 0) await filterByColor(colorFilter);
            // Filter by size
            if (sizeFilter.length > 0) await filterBysize(sizeFilter);
        }

        generateProducts();
    }, [productType, priceFilter, colorFilter, sizeFilter])

    return { products, error };
}

export default useGenerateProducts