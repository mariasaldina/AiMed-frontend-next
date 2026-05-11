'use client';

import { RootStore } from '@/stores';
import { createContext, useContext, useState } from 'react';

export const StoresContext = createContext<RootStore | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
    const [store] = useState(() => new RootStore());

    return (
        <StoresContext.Provider value={store}>
            {children}
        </StoresContext.Provider>
    );
}

export const useStores = () => useContext(StoresContext);
