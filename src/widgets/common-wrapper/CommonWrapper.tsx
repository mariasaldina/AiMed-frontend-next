'use client';

import { useStores } from '@/app/providers/StoreProvider';
import ErrorAlert from '@/shared/ui/ErrorAlert';
import { Center, Loader } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { type ReactNode } from 'react';

function CommonWrapper({ children }: { children: ReactNode }) {
    const rootStore = useStores();
    const { loading, errorModal } = rootStore.settingsStore.state;

    return (
        <>
            {loading['user/getUser'] && (
                <Center h={'100dvh'}>
                    <Loader />
                </Center>
            )}
            <ErrorAlert
                errorMessage={errorModal.message}
                onClose={() => rootStore.settingsStore.sync.clearError}
            />
            {children}
        </>
    );
}

export default observer(CommonWrapper);
