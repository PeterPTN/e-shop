import { createContext, useState } from "react";
import type { Children } from "../lib/types";

interface ContextType {
    colorFilter: string[];
    setColorFilter: React.Dispatch<React.SetStateAction<never[] | string[]>>
}

const initialContext = {
    colorFilter: [],
    setColorFilter: () => { }
}

export const ColorFilterContext = createContext<ContextType>(initialContext);

const ColorFilterProvider = ({ children }: Children) => {
    // state either never or string array
    const [colorFilter, setColorFilter] = useState<string[]>([]);

    const data = { colorFilter, setColorFilter };

    return (
        <ColorFilterContext.Provider value={data}>{children}</ColorFilterContext.Provider>
    )
}

export default ColorFilterProvider