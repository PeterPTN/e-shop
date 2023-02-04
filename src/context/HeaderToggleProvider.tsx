import { useState, createContext } from 'react';
import type { Children } from '../lib/types';

interface ContextType {
    smallHeader: boolean,
    setSmallHeader: React.Dispatch<React.SetStateAction<boolean>>
}

const initialContext = {
    smallHeader: false,
    setSmallHeader: () => { }
}

export const HeaderToggleContext = createContext<ContextType>(initialContext);

const HeaderToggleProvider = ({ children }: Children) => {
    const [smallHeader, setSmallHeader] = useState(false);
    
    const data = { smallHeader, setSmallHeader };

    return (
        <HeaderToggleContext.Provider value={data}>{children}</HeaderToggleContext.Provider>
    )
}

export default HeaderToggleProvider