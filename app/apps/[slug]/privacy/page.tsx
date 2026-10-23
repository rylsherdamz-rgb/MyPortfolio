import type { Metadata } from "next"
import { notFound } from "next/navigation"
import LegalPage from "@/components/apps/LegalPage"
import { apps, getApp, pageMetadata } from "@/constants/apps"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return apps.map((a) => ({ slug: a.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApp((await params).slug)
  if (!app) return {}
  return pageMetadata(`${app.name} Privacy Policy`, `How ${app.name} handles your data.`, `/apps/${app.slug}/privacy`)
}

export default async function PrivacyPage({ params }: Props) {
  const app = getApp((await params).slug)
  if (!app) notFound()

  return (
    <LegalPage
      app={app}
      eyebrow="Privacy policy"
      title={`${app.name} Privacy Policy`}
      intro={`This policy explains what data ${app.name} (${app.packageName}) uses, where it goes and how you control it.`}
      sections={app.privacy}
    />
  )
}
