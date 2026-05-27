'use client';

import { useStores } from '@/shared/hooks/use-stores';
import { Center, Flex, Text, Title } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';

function Home() {
    const rootStore = useStores();
    const { user } = rootStore.userStore.state;

    return (
        <Center h={'100dvh'}>
            <Flex
                direction={'column'}
                align={'flex-end'}
                gap="30"
                px={{ base: 40 }}
            >
                <Title
                    fz={{ base: 56, sm: 70 }}
                    fw={700}
                    c="indigo.9"
                    ff={'monospace'}
                    w={{ base: '100%', sm: '70%' }}
                    ta="right"
                >
                    Добро пожаловать в AiMed!
                </Title>
                <Text ff="monospace" fz={{ base: 24, sm: 32 }}>
                    {user?.role === 'PATIENT' ? (
                        <>
                            Начните{' '}
                            <Link
                                href="/chats"
                                style={{
                                    color: 'var(--mantine-color-indigo-6)',
                                    fontFamily: 'monospace',
                                    textUnderlineOffset: 5,
                                }}
                            >
                                чат с помощником
                            </Link>
                        </>
                    ) : (
                        <>
                            Просмотрите{' '}
                            <Link
                                href="/invitations"
                                style={{
                                    color: 'var(--mantine-color-indigo-6)',
                                    fontFamily: 'monospace',
                                    textUnderlineOffset: 5,
                                }}
                            >
                                заявки от пациентов
                            </Link>
                        </>
                    )}
                </Text>
            </Flex>
        </Center>
    );
}

export const HomePage = observer(Home);
