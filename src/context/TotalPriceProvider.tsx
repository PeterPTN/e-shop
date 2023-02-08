import { createContext, useState } from "react";
import type { Children } from "../lib/types";

interface ContextType {
    totalPrice: number;
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>
}

const initialContext = {
    totalPrice: 0,
    setTotalPrice: () => { }
}

export const TotalPriceContext = createContext<ContextType>(initialContext);

const TotalPriceProvider = ({ children }: Children) => {
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const data = { totalPrice, setTotalPrice };

    return (
        <TotalPriceContext.Provider value={data}>{children}</TotalPriceContext.Provider>
    )
}

export default TotalPriceProvider