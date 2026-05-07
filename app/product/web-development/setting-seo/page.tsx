'use client';

import { ArrowLeft, Globe, Smartphone, Search, Zap, Lock, Code } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';

export default function ProductPage() {
  const product = {
    title: 'Setting SEO',
    price: 'Start from Rp. 500.000',
    category: 'Web Development',
    description: 'Kami menyediakan Layanan pengembangan dan pembuatan website profesional yang dirancang khusus untuk membantu bisnis Anda tampil lebih kredibel dan menjangkau lebih banyak pelanggan secara online. Setiap website yang kami buat memiliki desain responsif (mobile friendly), loading cepat, serta struktur yang dioptimasi untuk SEO (Search Engine Optimization) agar lebih mudah muncul di hasil pencarian Google.',
    features: [
      { 
        icon: <Globe className="w-6 h-6 text-violet-600" />, 
        title: 'Desain Responsif', 
        desc: 'Tampil sempurna di semua ukuran layar mulai dari desktop, laptop, tablet hingga smartphone. Desain responsif memastikan tampilan website dapat menyesuaikan secara otomatis dengan perangkat yang digunakan sehingga konten tetap terlihat rapi, mudah dibaca, dan nyaman diakses oleh pengguna di mana saja.' 
      },
      { 
        icon: <Smartphone className="w-6 h-6 text-violet-600" />, 
        title: 'Mobile First', 
        desc: 'Dioptimasi untuk pengguna smartphone agar website dapat diakses dengan cepat, mudah dibaca, dan tetap nyaman digunakan di berbagai perangkat mobile. Pendekatan mobile first memastikan setiap elemen website dirancang agar lebih efisien dan responsif bagi pengguna ponsel.' 
      },
      { 
        icon: <Search className="w-6 h-6 text-violet-600" />, 
        title: 'SEO Friendly', 
        desc: 'Struktur yang disukai mesin pencari sehingga website lebih mudah ditemukan oleh pengguna melalui hasil pencarian. Dengan penggunaan struktur HTML yang rapi, pengaturan heading yang jelas, serta optimasi kata kunci yang tepat, website dapat lebih mudah diindeks oleh mesin pencari seperti Google dan berpeluang mendapatkan peringkat yang lebih baik.' 
      },
      { 
        icon: <Zap className="w-6 h-6 text-violet-600" />, 
        title: 'Performa Cepat', 
        desc: 'Waktu loading yang sangat singkat sehingga halaman website dapat terbuka dengan cepat tanpa membuat pengunjung menunggu terlalu lama. Performa yang cepat membantu meningkatkan kenyamanan pengguna saat mengakses website serta mendukung optimasi SEO karena mesin pencari seperti Google cenderung memprioritaskan website dengan kecepatan akses yang baik.' 
      },
      { 
        icon: <Lock className="w-6 h-6 text-violet-600" />, 
        title: 'Keamanan Terjamin', 
        desc: 'Perlindungan dari serangan siber sehingga website dan data pengguna tetap aman dari berbagai ancaman digital. Sistem keamanan diterapkan melalui penggunaan enkripsi, pembaruan sistem secara berkala, serta pengamanan server untuk menjaga kestabilan dan kepercayaan pengguna saat mengakses website.' 
      },
      { 
        icon: <Code className="w-6 h-6 text-violet-600" />, 
        title: 'Kode Bersih', 
        desc: 'Mudah di-maintain dan dikembangkan karena struktur kode ditulis dengan rapi, terorganisir, dan mengikuti standar pengembangan web yang baik. Dengan kode yang bersih, proses perawatan, pembaruan fitur, maupun pengembangan website di masa depan dapat dilakukan dengan lebih mudah dan efisien.' 
      },
    ]
  };

  const whatsappMessage = encodeURIComponent(`Halo Skanilan Tech, saya ingin bertanya tentang ${product.title} seharga ${product.price}.`);
  const whatsappUrl = `https://wa.me/6281234567890?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-violet-200">
      {/* Fixed Back Navigation */}
      <div className="fixed top-0 left-0 w-full p-4 md:p-6 z-50 pointer-events-none">
        <Link 
          href="/#product" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:text-violet-600 hover:border-violet-300 transition-all shadow-sm pointer-events-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Katalog
        </Link>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-block mb-4 px-3 py-1 bg-violet-50 border border-violet-100 text-violet-600 rounded-full text-xs font-semibold tracking-wider uppercase">
            {product.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-violet-900 to-slate-800 mb-6">
            {product.title}
          </h1>
          <p className="text-2xl md:text-3xl font-medium text-slate-600 mb-8">
            {product.price}
          </p>
        </motion.div>

        {/* Video & Visuals Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          {/* Main Video Placeholder */}
            <div className="aspect-video w-full bg-slate-100 rounded-3xl overflow-hidden mb-6 relative group border border-slate-200 shadow-sm">
              {/* Letakkan Image paling atas agar menjadi background layer paling dasar, dan HAPUS -z-10 */}
              <Image 
                src="https://ik.imagekit.io/skanilantech/Web%20Development%20/SEO/seo_settings.png?updatedAt=1777516732167"
                alt="Video Thumbnail" 
                fill 
                className="object-cover" 
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-blue-500/10 mix-blend-multiply" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg cursor-pointer group-hover:scale-110 transition-transform duration-300">
                  <div className="w-0 h-0 border-y-[12px] border-y-transparent border-l-[20px] border-l-violet-600 ml-2" />
                </div>
              </div>
            </div>

          {/* Image Gallery Grid (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <Image 
                  src={`https://ik.imagekit.io/skanilantech/Web%20Development%20/SEO/Cuplikan%20layar%202026-05-07%20092450.png`} 
                  alt={`Gallery Image ${i}`} 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product Knowledge & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Product Knowledge */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Product Knowledge</h2>
            <div className="prose prose-lg prose-slate prose-violet">
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
              <p className="text-slate-600 leading-relaxed mt-4 whitespace-pre-wrap">
                Kami berfokus pada UI/UX yang intuitif dan struktur kode yang SEO-friendly. Website Anda tidak hanya akan terlihat bagus, tapi juga mudah ditemukan oleh calon pelanggan.
              </p>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {product.features.map((feature, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-violet-200 hover:bg-white hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Sticky WhatsApp Conversion */}
      <div className="fixed bottom-0 left-0 w-full p-4 md:p-6 z-50 pointer-events-none flex justify-center md:justify-end">
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-semibold text-lg shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-1 transition-all duration-300"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Order via WhatsApp
        </a>
      </div>
    </div>
  );
}
