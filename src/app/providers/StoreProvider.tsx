'use client';

import { StoresContext } from '@/shared/hooks/use-stores';
import { RootStore } from '@/shared/stores';
import { useState } from 'react';

export function StoreProvider({ children }: { children: React.ReactNode }) {
    const [store] = useState(() => new RootStore());

    return (
        <StoresContext.Provider value={store}>
            {children}
        </StoresContext.Provider>
    );
}
