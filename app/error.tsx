'use client';

import { Button, Title, Stack } from '@mantine/core';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
    return (
        <Stack justify={'center'} align={'center'} h={'100dvh'} gap={20}>
            <Title size="96px" c={'#333'} fw={600} style={{ lineHeight: 1 }}>
                Упс!
            </Title>

            <Title size="20px" c={'#666'} fw={500} ta="center" px="md">
                Что-то пошло не так
            </Title>

            <Button
                type="button"
                variant="filled"
                onClick={() => window.location.reload()}
            >
                Обновить страницу
            </Button>
        </Stack>
    );
}
