import './globals.css'
import type { Metadata } from 'next'
import { Inter, Dancing_Script } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  weight: ['700'],
  display: 'swap',
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://atul-jha-portfolio.vercel.app'

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
      <body className="bg-[#07050E] text-slate-100 antialiased selection:bg-purple-600/40 selection:text-amber-300">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0E0B19',
              color: '#F8FAFC',
              border: '1px solid rgba(147, 51, 234, 0.3)',
              borderRadius: '1rem',
              fontSize: '0.875rem',
            },
            success: { iconTheme: { primary: '#F59E0B', secondary: '#0E0B19' } },
            error:   { iconTheme: { primary: '#EF4444', secondary: '#0E0B19' } },
          }}
        />
      </body>
    </html>
  )
}
