'use client';

import { RootStore } from '@/shared/stores';
import { createContext, useContext } from 'react';

export const StoresContext = createContext<RootStore | null>(null);

export const useStores = () => {
    const store = useContext(StoresContext);

    if (!store) {
        throw new Error('No Root Store');
    }

    return store;
};
