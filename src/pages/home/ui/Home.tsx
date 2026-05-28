'use client';

import { useStores } from '@/shared/hooks/use-stores';
import { Center, Flex, Text, Title } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useTranslations } from 'next-intl';
import { Link } from '@/shared/config/i18n/navigation';

function Home() {
    const rootStore = useStores();
    const { user } = rootStore.userStore.state;
    const t = useTranslations('HomePage');

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
                    {t('title')}
                </Title>
                <Text ff="monospace" fz={{ base: 24, sm: 32 }}>
                    {user?.role === 'PATIENT' ? (
                        <>
                            {t('patient.subtitle')}{' '}
                            <Link
                                href="/chats"
                                style={{
                                    color: 'var(--mantine-color-indigo-6)',
                                    fontFamily: 'monospace',
                                    textUnderlineOffset: 5,
                                }}
                            >
                                {t('patient.link')}
                            </Link>
                        </>
                    ) : (
                        <>
                            {t('doctor.subtitle')}{' '}
                            <Link
                                href="/invitations"
                                style={{
                                    color: 'var(--mantine-color-indigo-6)',
                                    fontFamily: 'monospace',
                                    textUnderlineOffset: 5,
                                }}
                            >
                                {t('doctor.link')}
                            </Link>
                        </>
                    )}
                </Text>
            </Flex>
        </Center>
    );
}

export const HomePage = observer(Home);
