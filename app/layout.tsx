import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://skanilantechsmg.vercel.app'),
  title: {
    template: '%s | Skanilan Tech',
    default: 'Skanilan Tech - Technology Solution in Semarang',
  },
  description: "Skanilan Tech is Semarang's premier student-led tech agency from SMKN 9. We specialize in custom web development, IoT services, and digital solutions.",
  keywords: ['Web Development Semarang', 'IoT Services Semarang', 'Jasa Pembuatan Website Semarang', 'SMKN 9 Semarang tech agency', 'Student-led digital agency', 'Jasa IoT Semarang', 'Jasa Fotografi Semarang'],
  icons: {
    icon: 'https://ik.imagekit.io/skanilantech/Web%20Component/logo_skanilantech?updatedAt=1774763237161',
    apple: 'https://ik.imagekit.io/skanilantech/Web%20Component/logo_skanilantech?updatedAt=1774763237161',
  },
  openGraph: {
    title: 'Skanilan Tech - Technology Solution in Semarang',
    description: "Skanilan Tech is Semarang's premier student-led tech agency from SMKN 9. We specialize in custom web development, IoT services, and digital solutions.",
    url: 'https://skanilantechsmg.vercel.app',
    siteName: 'Skanilan Tech',
    images: [
      {
        url: 'https://ik.imagekit.io/skanilantech/Web%20Component/logo_skanilantech?updatedAt=1774763237161',
        width: 800,
        height: 600,
        alt: 'Skanilan Tech Logo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skanilan Tech - Technology Solution in Semarang',
    description: "Skanilan Tech is Semarang's premier student-led tech agency from SMKN 9. We specialize in custom web development, IoT services, and digital solutions.",
    images: ['https://ik.imagekit.io/skanilantech/Web%20Component/logo_skanilantech?updatedAt=1774763237161'],
  },
  verification: {
    google: 'HcEcP0LxIt4YJpPwwop1nDnMYKg-u-gkM5lgb4lXPg8',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Skanilan Tech",
    "image": "https://ik.imagekit.io/skanilantech/Web%20Component/logo_skanilantech?updatedAt=1774763237161",
    "description": "A student-led tech agency from SMKN 9 Semarang specializing in Web Development, IoT Services, and Mobile Applications.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Semarang",
      "addressRegion": "Jawa Tengah",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-7.0082",
      "longitude": "110.4287"
    },
    "url": "https://skanilantechsmg.vercel.app",
    "telephone": "+62-800-0000-0000",
    "priceRange": "$$"
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="font-sans antialiased text-slate-900 bg-white flex flex-col min-h-screen" suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
