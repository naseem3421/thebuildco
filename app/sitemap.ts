import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { localitiesConfig } from "@/config/localities";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thebuildcompany.in";
  const currentDate = new Date();

  // 1. Core Primary Pages
  const coreRoutes = [
    { url: `${baseUrl}`, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/calculator-pro`, priority: 0.95, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/calculator-pro-2`, priority: 0.95, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/calculator-pro-3`, priority: 0.95, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/packages`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/calculator`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/projects`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/process`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/about`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/testimonials`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/faq`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/contact`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/locations`, priority: 0.8, changeFrequency: "weekly" as const },
  ];

  // 2. Dynamic Project Pages
  const projectRoutes = siteConfig.projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 3. Dynamic Locality Landing Pages
  const localityRoutes = Object.keys(localitiesConfig).map((slug) => ({
    url: `${baseUrl}/locations/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...coreRoutes.map((r) => ({
      ...r,
      lastModified: currentDate,
    })),
    ...projectRoutes,
    ...localityRoutes,
  ];
}
