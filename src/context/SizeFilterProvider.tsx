import { createContext, useState } from "react";
import type { Children } from "../lib/types";

interface ContextType {
    sizeFilter: string;
    setSizeFilter: React.Dispatch<React.SetStateAction<string>>
}

const initialContext = {
    sizeFilter: "",
    setSizeFilter: () => { }
}

export const SizeFilterContext = createContext<ContextType>(initialContext);

const SizeFilterProvider = ({ children }: Children) => {
    const [sizeFilter, setSizeFilter] = useState<string>("");

    const data = { sizeFilter, setSizeFilter };

    return (
        <SizeFilterContext.Provider value={data}>{children}</SizeFilterContext.Provider>
    )
}

export default SizeFilterProvider