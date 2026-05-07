'use client';

import { ArrowLeft, Globe, Smartphone, Search, Zap, Lock, Code, Wallet, Heart, Clock, Calendar, Newspaper, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
 
export default function ProductPage() {
  const product = {
    title: 'Website Organisasi',
    price: 'Gratis Awal Minggu',
    category: 'Web Development',
    description: 'Butuh website organisasi profesional seperti Portal Sistem Informasi Masjid Al-Muttaqin Demak? Percayakan pada jasa pembuatan web kami. Layanan lengkap mulai dari sistem informasi, jadwal kegiatan, hingga fitur donasi.',
    features: [
      { 
        icon: <Wallet className="w-6 h-6 text-violet-600" />, 
        title: 'Sistem Transparansi Keuangan', 
        desc: 'Kami merancang modul laporan arus kas yang interaktif, memastikan transparansi keuangan organisasi Anda tampil profesional dan akuntabel.' 
      },
      { 
        icon: <Heart className="w-6 h-6 text-violet-600" />, 
        title: 'Integrasi Donasi Online', 
        desc: 'Dilengkapi fasilitas gateway pembayaran yang aman untuk mempermudah penerimaan donasi, zakat, atau pendanaan organisasi kapan saja.' 
      },
      { 
        icon: <Clock className="w-6 h-6 text-violet-600" />, 
        title: 'Sinkronisasi Data Real-Time', 
        desc: 'Implementasi API cerdas Kami, seperti fitur jadwal sholat otomatis yang akurat dan menyesuaikan lokasi pengguna secara real-time.' 
      },
      { 
        icon: <Calendar className="w-6 h-6 text-violet-600" />, 
        title: 'Manajemen Agenda Dinamis', 
        desc: 'Sistem kalender terpadu yang mudah dikelola admin untuk menampilkan jadwal kajian, event, atau program kerja organisasi dengan rapi.' 
      },
      { 
        icon: <Newspaper className="w-6 h-6 text-violet-600" />, 
        title: 'CMS Berita & Publikasi', 
        desc: 'Panel kontrol (CMS) responsif dari kami yang mempermudah Anda mempublikasikan berita aktual dan kegiatan organisasi tanpa ribet.' 
      },
      { 
        icon: <Shield className="w-6 h-6 text-violet-600" />, 
        title: 'Keamanan & Kredibilitas', 
        desc: 'Membangun representasi digital yang aman, cepat, dan profesional untuk meningkatkan kepercayaan publik terhadap organisasi Anda.' 
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
                src="https://ik.imagekit.io/skanilantech/Web%20Development%20/Web%20Organisasi/masjid_wiku.png?updatedAt=1777516759420"
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
            {[
              "https://ik.imagekit.io/skanilantech/Web%20Development%20/Web%20Organisasi/kumpulan%20gambar/page-1.png",
              "https://ik.imagekit.io/skanilantech/Web%20Development%20/Web%20Organisasi/kumpulan%20gambar/page-2.png",
              "https://ik.imagekit.io/skanilantech/Web%20Development%20/Web%20Organisasi/kumpulan%20gambar/page-3.png",
              "https://ik.imagekit.io/skanilantech/Web%20Development%20/Web%20Organisasi/kumpulan%20gambar/page-4.png",
              "https://ik.imagekit.io/skanilantech/Web%20Development%20/Web%20Organisasi/kumpulan%20gambar/page-5.png",
              "https://ik.imagekit.io/skanilantech/Web%20Development%20/Web%20Organisasi/kumpulan%20gambar/page-6.png"
            ].map((imageUrl, index) => (
              <div key={index} className="aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <Image 
                  src={imageUrl} 
                  alt={`Gallery Image Masjid Al-Muttaqin ${index + 1}`} 
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
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Informasi Jasa</h2>
            <div className="prose prose-lg prose-slate prose-violet">
              <p className="text-slate-600 leading-relaxed">
                {product.description}
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                Inilah bukti nyata transformasi digital bersama jasa web Kami. Kami merancang sistem yang menjadikan Masjid Al-Muttaqin pelopor "Baitul Maal" modern dengan akuntabilitas tinggi dalam satu genggaman layar. Jadikan ini inspirasi, dan lihat langsung contoh website organisasi kami!
              </p>
              {/* Masukkan tombol <a> langsung di sini, TANPA export default function atau return */}
                <div className="mt-6">
                  <a 
                    href="https://www.almuttaqinwiku.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group w-fit"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300"
                    >
                      <path d="M12 2l-3 5h6z" />
                      <path d="M9 7v9H4V9l2.5-3L9 7z" />
                      <path d="M15 7v9h5V9l-2.5-3L15 7z" />
                      <path d="M9 16h6v6H9z" />
                      <path d="M2 22h20" />
                      <path d="M12 7v9" />
                    </svg>
                    Kunjungi Website Al-Muttaqin
                  </a>
                </div>
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
    </div>
  );
}
