import { useState, createContext } from 'react';
import type { Children } from '../lib/types';

interface ContextType {
    productType: string,
    setProductType: React.Dispatch<React.SetStateAction<string>>
}

const initialContext = {
    productType: "all",
    setProductType: () => { }
}

export const ProductTypeContext = createContext<ContextType>(initialContext);

const ProductTypeProvider = ({ children }: Children) => {
    const [productType, setProductType] = useState("all");
    
    const data = { productType, setProductType };

    return (
        <ProductTypeContext.Provider value={data}>{children}</ProductTypeContext.Provider>
    )
}

export default ProductTypeProvider