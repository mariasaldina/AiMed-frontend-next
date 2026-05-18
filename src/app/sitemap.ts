import { SEO_CONSTANTS } from '@/shared/config/seo/constants';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: SEO_CONSTANTS.baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1.0,
        },
    ];
}
