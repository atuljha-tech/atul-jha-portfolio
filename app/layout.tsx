import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Atul Jha | Full Stack Developer &Backend Systems Engineer",
  description:
    "Designing real world systems and building scalable backend services. Experienced in Node.js, Python, and Blockchain. Passionate about open source and cloud technologies.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0f172a] text-slate-200 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  )
}