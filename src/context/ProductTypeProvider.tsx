import { useState, createContext } from 'react';

interface ComponentProps {
    children: React.ReactNode,
}

interface ContextType {
    productType: string,
    setProductType: React.Dispatch<React.SetStateAction<string>>
}

const initialContext = {
    productType: "",
    setProductType: () => { }
}

export const ProductTypeContext = createContext<ContextType>(initialContext);

const ProductTypeProvider = ({ children }: ComponentProps) => {
    const [productType, setProductType] = useState("");
    
    const data = { productType, setProductType };

    return (
        <ProductTypeContext.Provider value={data}>{children}</ProductTypeContext.Provider>
    )
}

export default ProductTypeProvider