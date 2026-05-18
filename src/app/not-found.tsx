'use client';

import { Button, Stack, Title } from '@mantine/core';
import Link from 'next/link';
import { useStores } from './providers/StoreProvider';

export default function NotFoundLayout() {
    const rootStore = useStores();
    const { user } = rootStore.userStore.state;

    return (
        <Stack justify={'center'} align={'center'} h={'100dvh'} gap={20}>
            <Title size="96px" c={'#333'} fw={600}>
                404
            </Title>
            <Title size="20px" c={'#666'}>
                Страница не найдена
            </Title>
            <Link href={user ? '/home' : '/'}>
                <Button type="button">Вернуться на главную</Button>
            </Link>
        </Stack>
    );
}
