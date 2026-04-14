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
  metadataBase: new URL('https://skanilan.tech'), // Ubah ke https://skanilantech.my.id jika sudah siap
  title: {
    template: '%s | Skanilan Tech',
    default: 'Skanilan Tech - Technology Solution in Semarang',
  },
  description: "Skanilan Tech is Semarang's premier student-led tech agency from SMKN 9. We specialize in custom web development, IoT services, and digital solutions.",
  keywords: ['Web Development Semarang', 'IoT Services Semarang', 'Jasa Pembuatan Website Semarang', 'SMKN 9 Semarang tech agency', 'Student-led digital agency', 'Jasa IoT Semarang', 'Jasa Fotografi Semarang'],
  icons: {
    icon: '/skanilantech.png', // Perbaikan: hilangkan '/public'
  },
  verification: {
    google: 'G4adT8q5pPfGne42Yn-3gTBiJjpIYINx0dHrq3zWWYA',
  },
  // --- BAGIAN OPEN GRAPH & TWITTER CARD ---
  openGraph: {
    title: 'Skanilan Tech - Technology Solution in Semarang',
    description: "Skanilan Tech is Semarang's premier student-led tech agency from SMKN 9. We specialize in custom web development, IoT services, and digital solutions.",
    url: 'https://skanilan.tech',
    siteName: 'Skanilan Tech',
    images: [
      {
        url: '/skanilantechbanner.png', // Sangat disarankan membuat gambar khusus ukuran 1200x630px
        width: 800, // Sesuaikan dengan dimensi asli gambar logo kamu saat ini
        height: 800,
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
    images: ['/skanilantech.png'],
  },
  // -----------------------------------------
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
    "image": "https://skanilan.tech/skanilantech.png",
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
    "url": "https://skanilan.tech",
    "telephone": "+62-812-2943-8668",
    "priceRange": "$$"
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased text-slate-900 bg-white flex flex-col min-h-screen" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
