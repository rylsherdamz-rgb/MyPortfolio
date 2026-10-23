import type { ReactNode } from "react"
import NavigationBar from "@/components/NavigationBar"
import Footer from "@/components/Footer"

// Chrome for the /apps pages: same nav and footer as the home page.
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <div className="sticky top-0 z-50">
        <NavigationBar />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
