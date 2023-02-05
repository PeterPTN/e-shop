import { createContext, useState } from "react";
import { Children, ProductItems } from "../lib/types";

interface ContextType {
    cartItems: ProductItems[];
    setCartItems: React.Dispatch<React.SetStateAction<never[] | ProductItems[]>>
}

const initialContext = {
    cartItems: [],
    setCartItems: () => { }
}

export const CartItemsContext = createContext<ContextType>(initialContext);

const CartItemsProvider = ({ children }: Children) => {
    const [cartItems, setCartItems] = useState<ProductItems[]>([]);

    const data = {cartItems, setCartItems};

    return (
        <CartItemsContext.Provider value={data}>{children}</CartItemsContext.Provider>
    )
}

export default CartItemsProvider