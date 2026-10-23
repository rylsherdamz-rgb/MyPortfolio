import type { Metadata, Viewport } from "next"
import { socials } from "@/constants/socials"
import {
  Geist,
  Geist_Mono,
  Roboto,
  Anton,
  Roboto_Slab,
  Roboto_Flex
} from "next/font/google"
import "./scrollcraft.css"
import "./globals.css"
import ScrollCraftLoader from "@/components/ScrollCraftLoader"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
})

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
})

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-roboto-flex",
})

const siteUrl = "https://rylsher.dev"
const siteName = "Richie Christian De Guzman"
const siteTitle =
  "Richie Christian De Guzman — Full-Stack Developer, Data Analyst & Blockchain Developer"
const siteDescription =
  "Richie Christian De Guzman is a Full-Stack Developer, Data Analyst, and Blockchain Developer from Antipolo, Philippines. AWS hackathon champion, Google Cloud Arcade Facilitator, and part of PH100 2026, building scalable web apps and decentralized systems."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  keywords: [
    "Richie Christian De Guzman",
    "Richie De Guzman",
    "PH100 2026",
    "PH100",
    "Full-Stack Developer",
    "Full-Stack Developer Philippines",
    "Blockchain Developer",
    "Blockchain Developer Philippines",
    "Data Analyst",
    "Web Developer",
    "Next.js Developer",
    "React",
    "TypeScript",
    "Stellar",
    "Soroban",
    "Web3",
    "Hackathon Champion",
    "Google Cloud Arcade Facilitator",
    "Antipolo",
    "Philippines",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: "profile",
    firstName: "Richie Christian",
    lastName: "De Guzman",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@ChichiCode0",
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#101013" },
  ],
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  url: siteUrl,
  jobTitle: "Full-Stack Developer, Data Analyst & Blockchain Developer",
  description: siteDescription,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Antipolo",
    addressCountry: "PH",
  },
  award: [
    "PH100 2026",
    "Champion: AWS Agentic Football Hackathon 2026",
    "Blue Team Champion: SEEN 2026 Cyber Rumble CTF",
    "Google Cloud Arcade Facilitator 2026",
  ],
  knowsAbout: [
    "Full-Stack Development",
    "Data Analysis",
    "Blockchain",
    "Smart Contracts",
    "Next.js",
    "React",
    "TypeScript",
    "Stellar",
    "Soroban",
  ],
  sameAs: socials.map((s) => s.url),
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="apb_P3D--8M4e_6IHv6eB5ZLlxNbBaTvcP66dJdsKnc" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='dark')document.documentElement.dataset.theme='dark'}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${roboto.variable}
          ${anton.variable}
          ${robotoSlab.variable}
          ${robotoFlex.variable}
          antialiased
        bg-white
        `}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <noscript>
          <style>{`[data-sc-cue],[data-sc-in],[data-sc-stagger]>*{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
        <ScrollCraftLoader />
      </body>
    </html>
  )
}

