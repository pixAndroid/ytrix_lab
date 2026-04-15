import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yantrixlab.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/refund-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const [blogsRes, servicesRes, productsRes] = await Promise.all([
      fetch(`${BASE_URL}/api/blogs?limit=200`),
      fetch(`${BASE_URL}/api/services?limit=50`),
      fetch(`${BASE_URL}/api/products?limit=200`),
    ]);

    const [blogsData, servicesData, productsData] = await Promise.all([
      blogsRes.json(),
      servicesRes.json(),
      productsRes.json(),
    ]);

    if (blogsData.success) {
      for (const blog of blogsData.data) {
        dynamicRoutes.push({
          url: `${BASE_URL}/blog/${blog.slug}`,
          lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    }

    if (servicesData.success) {
      for (const service of servicesData.data) {
        dynamicRoutes.push({
          url: `${BASE_URL}/services/${service.slug}`,
          lastModified: service.updatedAt ? new Date(service.updatedAt) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      }
    }

    if (productsData.success) {
      for (const product of productsData.data) {
        dynamicRoutes.push({
          url: `${BASE_URL}/products/${product.slug}`,
          lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }
  } catch {
    // Return static routes on error
  }

  return [...staticRoutes, ...dynamicRoutes];
}
