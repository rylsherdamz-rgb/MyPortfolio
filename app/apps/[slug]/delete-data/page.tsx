import type { Metadata } from "next"
import { notFound } from "next/navigation"
import LegalPage from "@/components/apps/LegalPage"
import { apps, getApp } from "@/constants/apps"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return apps.map((a) => ({ slug: a.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApp((await params).slug)
  if (!app) return {}
  return {
    title: `Delete your ${app.name} data`,
    description: `How to delete all data stored by ${app.name}.`,
    alternates: { canonical: `/apps/${app.slug}/delete-data` },
  }
}

export default async function DeleteDataPage({ params }: Props) {
  const app = getApp((await params).slug)
  if (!app) notFound()

  return (
    <LegalPage
      app={app}
      eyebrow="Data deletion"
      title={`Delete your ${app.name} data`}
      intro={`${app.name} keeps your data on your device. Here's how to remove all of it.`}
      sections={[
        { heading: "Delete everything in the app", bullets: app.deletion.steps },
        { heading: "Good to know", bullets: app.deletion.notes },
      ]}
    />
  )
}
