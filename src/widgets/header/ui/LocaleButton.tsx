'use client';

import { usePathname, useRouter } from '@/shared/config/i18n/navigation';
import { ActionIcon } from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';

export default function LocaleButton() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const params = useParams();

    console.log(locale);

    return (
        <ActionIcon
            h="100%"
            w={60}
            bdrs={0}
            bg="none"
            c="indigo.7"
            onClick={() => {
                router.replace(
                    // @ts-expect-error
                    { pathname, params },
                    {
                        locale: locale === 'ru' ? 'en' : 'ru',
                    },
                );
            }}
        >
            <IconLanguage />
        </ActionIcon>
    );
}
