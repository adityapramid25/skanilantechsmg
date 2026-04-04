'use client';

import { useRealTimeCountdown } from '@/hooks/useRealTimeCountdown';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DiscountBannerClientProps {
  productName: string;
  productDescription: string;
  discountPrice: number;
  endDate: string;
}

export function DiscountBannerClient({
  productName,
  productDescription,
  discountPrice,
  endDate,
}: DiscountBannerClientProps) {
  const [mounted, setMounted] = useState(false);
  const { timeLeft, isExpired } = useRealTimeCountdown(endDate);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Hydration safety
  }

  if (isExpired) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 relative overflow-hidden border-y border-white/20">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left flex-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Flash Sale
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              {productName}
            </h2>
            <p className="text-white/90 text-sm max-w-xl mx-auto lg:mx-0 mb-4">
              {productDescription}
            </p>
            <div className="text-3xl font-bold text-yellow-300">
              Only ${discountPrice}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6 bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-md"
          >
            <div className="text-white font-mono text-xl font-bold tracking-wider">
              Offer Ends In: {timeLeft}
            </div>
            <button className="w-full py-2.5 px-6 bg-white hover:bg-slate-50 text-teal-700 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg">
              Claim Discount Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
