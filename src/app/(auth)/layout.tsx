'use client';

import { useRouter } from 'next/navigation';
import { useStores } from '../providers/StoreProvider';
import { ReactNode, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Metadata } from 'next';

export const authMetadata: Metadata = {
    robots: { index: false, follow: true },
};

function ReverseAuthGuard({ children }: { children: ReactNode }) {
    const rootStore = useStores();
    const { user } = rootStore.userStore.state;
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace('/');
        }
    }, [user, router]);

    return children;
}

export default observer(ReverseAuthGuard);
