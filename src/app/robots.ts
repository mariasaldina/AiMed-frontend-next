import { SEO_CONSTANTS } from '@/shared/config/seo/constants';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/login',
                '/sign-up',
                '/chats',
                '/profile',
                '/home',
                '/invitations',
                '/notifications',
            ],
        },
        sitemap: `${SEO_CONSTANTS.baseUrl}/sitemap.xml`,
    };
}
