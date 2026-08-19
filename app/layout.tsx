import type { Metadata } from "next"
import {
  Geist,
  Geist_Mono,
  Roboto,
  Anton,
  Roboto_Slab,
  Roboto_Flex
} from "next/font/google"
import "./globals.css"

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

export const metadata: Metadata = {
  title: "Richie Christian De Guzman — Full-Stack Developer, Data Analyst & Blockchain Developer",
  description:
    "I'm Richie Christian De Guzman, a Full-Stack Developer, Data Analyst, and Blockchain Developer based in Antipolo, Philippines. I build beautiful, scalable web apps and decentralized systems.",
  keywords: [
    "Richie Christian De Guzman",
    "Full-Stack Developer",
    "Blockchain Developer",
    "Data Analyst",
    "Web Developer",
    "React",
    "Stellar",
    "Soroban",
    "Philippines",
  ],
  openGraph: {
    title: "Richie Christian De Guzman — Full-Stack, Data & Blockchain Developer",
    description:
      "Full-Stack Developer, Data Analyst, and Blockchain Developer building beautiful, scalable products.",
    type: "website",
    locale: "en_US",
  },
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
        {children}
      </body>
    </html>
  )
}

