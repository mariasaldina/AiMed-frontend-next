'use client';

import { useStores } from '@/shared/hooks/use-stores';
import {
    Button,
    Center,
    Flex,
    Loader,
    Modal,
    Stack,
    Text,
} from '@mantine/core';
import { IconMoodSadFilled } from '@tabler/icons-react';
import { type ReactNode } from 'react';

export function CommonSettings({ children }: { children: ReactNode }) {
    const rootStore = useStores();
    const { loading, errorModal } = rootStore.settingsStore.state;

    const onClose = () => {
        rootStore.settingsStore.sync.clearError();
    };

    return (
        <>
            {loading['user/getUser'] && (
                <Center h={'100dvh'}>
                    <Loader />
                </Center>
            )}
            <Modal
                opened={!!errorModal.open}
                onClose={onClose}
                title={
                    <Flex gap={10}>
                        <Text fw="600">Ошибка</Text>
                        <IconMoodSadFilled />
                    </Flex>
                }
                centered
            >
                <Stack>
                    <Text>{errorModal.message}</Text>
                    <Button onClick={onClose} bg={'gray'}>
                        Закрыть
                    </Button>
                </Stack>
            </Modal>
            {children}
        </>
    );
}