'use client';

import { useState, useEffect } from 'react';
import { CountdownTimer } from './CountdownTimer';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

export function DiscountBanner() {
  // 1. Gunakan state untuk menyimpan target waktu dan status render
  const [isMounted, setIsMounted] = useState(false);
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  // 2. Set waktu HANYA setelah komponen sukses dimuat di browser (mencegah Hydration Error)
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3); // Promo 3 hari
    setTargetDate(date);
    setIsMounted(true);
  }, []);

  // Cegah render sebelum sinkronisasi waktu selesai agar tidak nge-blank
  if (!isMounted || !targetDate) {
    return null; 
  }

  return (
    <section className="py-12 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 relative overflow-hidden border-y border-white/20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <motion.div 
            // 3. Ubah whileInView menjadi animate agar LANGSUNG MUNCUL saat web dibuka
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left flex-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Limited Time Offer
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              Get <span className="text-yellow-300">30% Off</span> All Premium Solutions
            </h2>
            <p className="text-white/90 text-sm max-w-xl mx-auto lg:mx-0">
              Upgrade your tech infrastructure today. This exclusive discount applies to our Web Development, IoT, and Mobile App packages.
            </p>
          </motion.div>

          <motion.div 
            // 3. Ubah whileInView menjadi animate agar LANGSUNG MUNCUL
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center gap-6 bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-md"
          >
            <CountdownTimer targetDate={targetDate} />
            <button className="w-full py-2.5 px-6 bg-white hover:bg-slate-50 text-indigo-600 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg">
              Claim Discount Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
