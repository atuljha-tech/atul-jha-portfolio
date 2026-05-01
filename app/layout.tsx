import './globals.css'
import type { Metadata } from 'next'
import { Inter, Dancing_Script } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

// Load fonts via next/font — zero layout shift, self-hosted, no external request
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  weight: ['700'],
  display: 'swap',
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://atuljhaportfoliosite.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Atul Jha | Full Stack Developer',
    template: '%s | Atul Jha',
  },
  description:
    'Full Stack Developer & CS Student specializing in Blockchain, IoT & Cybersecurity. Building scalable web applications with React, Next.js, and Node.js.',
  keywords: ['Atul Jha', 'Full Stack Developer', 'Blockchain Developer', 'React', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Atul Jha' }],
  creator: 'Atul Jha',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    title: 'Atul Jha | Full Stack Developer',
    description: 'Full Stack Developer & CS Student specializing in Blockchain, IoT & Cybersecurity.',
    siteName: 'Atul Jha Portfolio',
    images: [{ url: '/atuljha.jpeg', width: 1200, height: 630, alt: 'Atul Jha' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atul Jha | Full Stack Developer',
    description: 'Full Stack Developer & CS Student specializing in Blockchain, IoT & Cybersecurity.',
    images: ['/atuljha.jpeg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dancingScript.variable}`}>
      <body className="bg-[#0A0F1C] text-slate-200 antialiased selection:bg-purple-600 selection:text-white">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0D1424',
              color: '#e2e8f0',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '0.75rem',
            },
            success: { iconTheme: { primary: '#8b5cf6', secondary: '#0D1424' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#0D1424' } },
          }}
        />
      </body>
    </html>
  )
}
