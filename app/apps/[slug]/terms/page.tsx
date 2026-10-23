import type { Metadata } from "next"
import { notFound } from "next/navigation"
import LegalPage from "@/components/apps/LegalPage"
import { apps, baseTerms, baseTermsUpdated, getApp, pageMetadata } from "@/constants/apps"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return apps.map((a) => ({ slug: a.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApp((await params).slug)
  if (!app) return {}
  return pageMetadata(`${app.name} Terms of Use`, `Terms for using ${app.name}.`, `/apps/${app.slug}/terms`)
}

export default async function TermsPage({ params }: Props) {
  const app = getApp((await params).slug)
  if (!app) notFound()

  return (
    <LegalPage
      app={app}
      eyebrow="Terms of use"
      title={`${app.name} Terms of Use`}
      sections={baseTerms(app)}
      // ISO dates compare correctly as strings
      updated={[app.policyUpdated, baseTermsUpdated].sort().at(-1)}
    />
  )
}
