import { MetadataRoute } from "next"
import { apps } from "@/constants/apps"

const baseUrl = "https://rylsher.dev"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/apps`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...apps.flatMap((app) => [
      {
        url: `${baseUrl}/apps/${app.slug}`,
        lastModified: new Date(app.policyUpdated),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
      ...["privacy", "terms", "delete-data"].map((page) => ({
        url: `${baseUrl}/apps/${app.slug}/${page}`,
        lastModified: new Date(app.policyUpdated),
        changeFrequency: "yearly" as const,
        priority: 0.4,
      })),
    ]),
  ]
}
