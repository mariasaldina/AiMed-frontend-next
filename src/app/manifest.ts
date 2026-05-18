import { SEO_CONSTANTS } from '@/shared/config/seo/constants';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: SEO_CONSTANTS.name,
        short_name: SEO_CONSTANTS.shortName,
        description:
            'Приложение для первичного анализа симптомов и подбора специалистов',

        start_url: '/',
        scope: '/',

        display: 'standalone',
        orientation: 'portrait',

        background_color: SEO_CONSTANTS.background,
        theme_color: SEO_CONSTANTS.themeColor,

        lang: 'ru',
        dir: 'ltr',

        icons: [
            {
                src: SEO_CONSTANTS.favicon,
                sizes: 'any',
                type: 'image/svg+xml',
            },
        ],
    };
}
