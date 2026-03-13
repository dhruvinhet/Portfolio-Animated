import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://dhruvinpatel.me'),
  title: 'Dhruvinkumar Patel | AI & Data Science Engineer Portfolio',
  description: 'Dhruvinkumar Patel is a Data Scientist and AI Engineer specializing in Computer Vision, Multi-Agent systems, and Python. View projects like DeepFake Detection and Synexor.',
  keywords: ['Dhruvin Patel', 'Dhruvinkumar Patel', 'AI Engineer', 'Data Scientist', 'Python Developer', 'Machine Learning', 'Computer Vision Portfolio'],
  authors: [{ name: 'Dhruvinkumar Patel', url: 'https://dhruvinpatel.me' }],
  creator: 'Dhruvinkumar Patel',
  openGraph: {
    title: 'Dhruvinkumar Patel | AI & Data Science Engineer',
    description: 'Explore the dark-mode interactive portfolio of Dhruvinkumar Patel, an AI & Data Science Engineer building intelligent web & ML systems.',
    url: 'https://dhruvinpatel.me',
    siteName: 'Dhruvinkumar Patel Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhruvinkumar Patel | AI Engineer',
    description: 'Data Scientist & AI Engineer specializing in Computer Vision and Python.',
  },
  alternates: {
    canonical: 'https://dhruvinpatel.me',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Google Knowledge Graph SEO Scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify({
               "@context": "https://schema.org",
               "@type": "Person",
               "name": "Dhruvinkumar Patel",
               "alternateName": ["Dhruvin", "Dhruvin Patel", "Dhruvin Het"],
               "url": "https://dhruvinpatel.me",
               "jobTitle": ["AI Engineer", "Data Scientist", "Software Engineer"],
               "description": "Dhruvinkumar Patel is an AI Engineer and Data Scientist specializing in neural networks, computer vision, and building massive scalable software systems.",
               "sameAs": [
                 "https://github.com/dhruvinhet",
                 "https://linkedin.com/in/dhruvinkumarpatel"
               ],
               "knowsAbout": [
                 "Artificial Intelligence", "Data Science", "Machine Learning", 
                 "Computer Vision", "Python", "Deep Learning", "React", "Next.js", 
                 "YOLOv8", "TensorFlow", "PyTorch", "C++"
               ]
             })
          }}
        />
      </head>
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased selection:bg-white/30 selection:text-white`}>
        {children}
      </body>
    </html>
  )
}
