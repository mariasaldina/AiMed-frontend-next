import { Button, Stack, Title } from '@mantine/core';
import Link from 'next/link';

export default function NotFoundLayout() {
    return (
        <Stack justify={'center'} align={'center'} h={'100dvh'} gap={20}>
            <Title size="96px" c={'#333'} fw={600}>
                404
            </Title>
            <Title size="20px" c={'#666'}>
                Страница не найдена
            </Title>
            <Link href="/">
                <Button type="button">Вернуться на главную</Button>
            </Link>
        </Stack>
    );
}
