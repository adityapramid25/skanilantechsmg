'use client'; 

import { useRef, useState } from 'react';
import { ArrowLeft, Zap, Sparkles, Shield, CreditCard, Target } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';

export default function ProductPage() {
  // State and Ref for the interactive video player
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const product = {
    title: 'Sistem Presensi RFID Pintar',
    price: 'Rp. 100.000,00',
    category: 'Solusi IoT',
    description: 'Solusi IoT cerdas yang dilengkapi dengan sensor presisi tinggi dan pemantauan waktu nyata (real-time). Sangat ideal untuk otomatisasi alur kerja dan meningkatkan efisiensi operasional instansi Anda.',
    features: [
      { icon: <Zap className="w-6 h-6 text-violet-600" />, title: 'Kecepatan Transaksi', desc: 'Proses tapping hanya butuh waktu <1 detik.' },
      { icon: <Sparkles className="w-6 h-6 text-violet-600" />, title: 'Higienis', desc: 'Tidak perlu menyentuh alat secara langsung (berbeda dengan fingerprint), sehingga mengurangi risiko penyebaran kuman/virus.' },
      { icon: <Shield className="w-6 h-6 text-violet-600" />, title: 'Durabilitas Tinggi', desc: 'Reader RFID lebih tahan lama karena tidak memiliki komponen optik yang mudah kotor atau tergores.' },
      { icon: <CreditCard className="w-6 h-6 text-violet-600" />, title: 'Multifungsi', desc: 'Kartu yang sama bisa digunakan untuk akses pintu (access control), pembayaran kantin, atau parkir.' },
      { icon: <Target className="w-6 h-6 text-violet-600" />, title: 'Akurasi Data', desc: 'Mengurangi risiko kesalahan input manual dan memudahkan HR dalam menarik laporan bulanan secara otomatis.' },
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
          
          {/* Interactive Video Player */}
          <div className="w-max  bg-black rounded-3xl overflow-hidden mb-6 relative group border border-slate-200 shadow-sm flex items-center justify-center mx-auto">
            
            {/* Play Button Overlay */}
            {!isPlaying && (
              <>
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-blue-500/20 mix-blend-multiply z-10 pointer-events-none" />
                <div 
                  className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                  onClick={handlePlayVideo}
                >
                  <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="w-0 h-0 border-y-[12px] border-y-transparent border-l-[20px] border-l-violet-600 ml-2" />
                  </div> 
                </div>
              </>
            )}

            {/* The Video Element */}
            <video 
              ref={videoRef}
              src="https://ik.imagekit.io/skanilantech/IoT/RFID/video_promosi_najwa_rfid_1.mp4" 
              poster="https://ik.imagekit.io/skanilantech/IoT/RFID/rfid_thumnail_hd_4.png?updatedAt=1775567005930" 
              className="object-contain w-full max-h-[80vh] z-0" /* Changed object-cover to object-contain */
              controls={isPlaying}
              playsInline
            />
          </div>

          {/* Product Images Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              'https://ik.imagekit.io/skanilantech/IoT/RFID/rfid_product_6.png',
              'https://ik.imagekit.io/skanilantech/IoT/RFID/rfid_tech_4.png',
              'https://ik.imagekit.io/skanilantech/IoT/RFID/hand_grap_card_3.png'
            ].map((imageUrl, i) => (
              <div key={i} className="aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200 shadow-sm">
                <Image 
                  src={imageUrl} 
                  alt={`Detail Produk RFID ${i + 1}`} 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product Overview & Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Product Information */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Informasi Produk</h2>
            <div className="prose prose-lg prose-slate prose-violet">
              <p className="text-slate-600 leading-relaxed">
                {product.description}
              </p>

              <p className="text-2xl text-slate-900 my-8">
                <b>Panduan Penggunaan Sistem Presensi RFID Otomatis:</b>
              </p>

              <p className="text-slate-600 leading-relaxed mt-4">
                <b>1. Aktivasi Kartu Identitas.</b><br/>
                Setiap karyawan/siswa diberikan kartu atau gantungan kunci berisi Chip RFID.
              </p>
              
              <p className="text-slate-600 leading-relaxed mt-4">
                <b>2. Presensi Masuk & Pulang Otomatis</b><br/>
                Cukup berjalan melewati alat pembaca (Reader) yang dipasang di gerbang atau pintu masuk.
              </p>
              
              <div className="text-slate-600 leading-relaxed mt-4">
                <b>3. Rekap Kehadiran Real-Time</b><br/>
                Begitu chip terdeteksi, data langsung terkirim ke server. Sistem secara otomatis menyusun:
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li><strong>Laporan Harian:</strong> Siapa yang terlambat atau pulang lebih awal.</li>
                  <li><strong>Laporan Mingguan & Bulanan:</strong> Akumulasi total jam kerja atau kehadiran tanpa perlu input manual di Excel.</li>
                </ul>
              </div>
              
              <p className="text-slate-600 leading-relaxed mt-4">
                <b>4. Cek Riwayat Kehadiran Mandiri</b><br/>
                Setiap pengguna dapat melihat riwayat kehadirannya sendiri melalui aplikasi atau dasbor komputer. Semua data tersimpan aman dan transparan, meminimalkan risiko kecurangan "titip absen" karena setiap chip memiliki kode enkripsi unik.
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
    </div>
  );
}
