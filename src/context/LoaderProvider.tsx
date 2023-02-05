import { createContext, useState } from 'react'
import { Children } from '../lib/types';

interface ContextType {
    loader: boolean;
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

const initialContext = {
    loader: true,
    setLoader: () => {}
}

export const LoaderContext = createContext<ContextType>(initialContext);

const LoaderProvider = ({ children }: Children) => {
    const [loader, setLoader] = useState(true);

    const data = { loader, setLoader };

    return (
        <LoaderContext.Provider value={data}>{children}</LoaderContext.Provider>
    )
}

export default LoaderProvider