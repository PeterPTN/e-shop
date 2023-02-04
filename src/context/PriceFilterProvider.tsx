import { createContext, useState } from "react";
import type { Children } from "../lib/types";

interface ContextType {
    priceFilter: string;
    setPriceFilter: React.Dispatch<React.SetStateAction<string>>
}

const initialContext = {
    priceFilter: "",
    setPriceFilter: () => { }
}

export const PriceFilterContext = createContext<ContextType>(initialContext);

const PriceFilterProvider = ({ children }: Children) => {
    const [priceFilter, setPriceFilter] = useState("");

    const data = { priceFilter, setPriceFilter };

    return (
        <PriceFilterContext.Provider value={data} >{children}</PriceFilterContext.Provider>
    )
}

export default PriceFilterProvider