import { createContext, useState } from 'react';
import type { Children } from '../lib/types';

interface ContextType {
    cartNumber: number
    setCartNumber: React.Dispatch<React.SetStateAction<number>>
}

const initialContext = {
    cartNumber: 0,
    setCartNumber: () => { }
}

export const CartTotalContext = createContext<ContextType>(initialContext);

const CartTotalProvider = ({ children }: Children) => {
    const [cartNumber, setCartNumber] = useState(0);

    const data = { cartNumber, setCartNumber };

    return (
        <CartTotalContext.Provider value={data}>{children}</CartTotalContext.Provider>
    )
}

export default CartTotalProvider