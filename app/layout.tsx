import type { Metadata } from "next"
import {
  Geist,
  Geist_Mono,
  Roboto,
  Anton,
  Roboto_Slab
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

export const metadata: Metadata = {
  title: "Richie Christian De Guzman",
  description:
    "Hi I'm Richie Christian De Guzman. Full-stack web developer with 3 years of experience designing, developing, and deploying scalable web and mobile applications...",
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${roboto.variable}
          ${anton.variable}
          ${robotoSlab.variable}
          antialiased
        bg-white
        `}
      >
        {children}
      </body>
    </html>
  )
}

