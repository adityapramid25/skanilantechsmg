import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Hapus garis miring di akhir baseUrl
  const baseUrl = 'https://skanilan.tech';

  return [
    {
      url: `${baseUrl}`, // Hasil: https://skanilan.tech
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/product`, // Hasil: https://skanilan.tech/product
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, 
    },
    {
      url: `${baseUrl}/about`, // Hasil: https://skanilan.tech/about
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`, // Hasil: https://skanilan.tech/contact
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ];
}
