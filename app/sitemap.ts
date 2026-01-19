import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cadena-r0q16lnqy-rylsherdamzs-projects.vercel.app/' 


  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`, // Your "Get Started" / Onboarding path
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/techstack`, // Fiscal Protocol / National Budget
      lastModified: new Date(),
      changeFrequency: 'always', // Since this is a "live" ledger
      priority: 0.9,
    },
   ]
}
