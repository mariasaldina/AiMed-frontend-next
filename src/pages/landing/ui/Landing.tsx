import { schemaOrg } from '@/shared/config/seo/schema';
import { Button, Center, Flex, Stack, Title } from '@mantine/core';
import { IconFocus2, IconSparklesFilled } from '@tabler/icons-react';
import Link from 'next/link';
import Script from 'next/script';

export async function Landing() {
    return (
        <>
            <Script
                id="schema-org-main"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaOrg).replace(/</g, '\\u003c'),
                }}
            />
            <Center
                h={'100dvh'}
                style={{
                    background:
                        'linear-gradient(0deg, var(--mantine-color-indigo-5) 0%, var(--mantine-color-indigo-9) 100%)',
                }}
            >
                <Stack>
                    <Flex align={'center'} gap={25}>
                        <IconFocus2
                            color="white"
                            style={{
                                width: 'clamp(60px, 6vw, 72px)',
                                height: 'clamp(60px, 6vw, 72px)',
                            }}
                        />
                        <Title
                            fz={{ base: 60, sm: 72 }}
                            fw={700}
                            c={'white'}
                            ff={'monospace'}
                        >
                            AiMed
                        </Title>
                    </Flex>
                    <Link href="/login" style={{ textDecoration: 'none' }}>
                        <Button
                            bg="white"
                            style={{ color: 'var(--mantine-color-indigo-9)' }}
                            size="xl"
                            bdrs={20}
                            rightSection={<IconSparklesFilled size={35} />}
                        >
                            Начать работу
                        </Button>
                    </Link>
                </Stack>
            </Center>
        </>
    );
}
