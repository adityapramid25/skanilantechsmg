'use client';

import React from 'react';
import { usePromo } from '@/context/PromoContext';
import { useCountdown } from '@/hooks/useCountdown';
import Image from 'next/image';
import { Timer, Zap } from 'lucide-react';

export function FlashSaleBanner() {
  const { activePromo, products } = usePromo();
  const { days, hours, minutes, seconds, isExpired } = useCountdown(activePromo?.endTime || null);

  if (!activePromo || isExpired) {
    return null;
  }

  const product = products.find((p) => p.id === activePromo.productId);

  if (!product) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white shadow-lg overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Title & Urgency */}
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full animate-pulse">
              <Zap className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                Flash Sale
              </h2>
              <p className="text-sm text-blue-100 font-medium">Limited time offer! Don&apos;t miss out.</p>
            </div>
          </div>

          {/* Middle: Product Info */}
          <div className="flex items-center gap-4 bg-white/10 rounded-xl p-2 pr-6 backdrop-blur-sm border border-white/20">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 border-white/30">
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm md:text-base line-clamp-1">{product.name}</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-yellow-300">${activePromo.discountPrice.toFixed(2)}</span>
                <span className="text-sm text-red-200 line-through">${product.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Right: Countdown */}
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center gap-1 text-sm font-medium mb-1 text-white/90">
              <Timer className="w-4 h-4" />
              <span>Ends in:</span>
            </div>
            <div className="flex items-center gap-2">
              <TimeBox value={days} label="d" />
              <span className="text-xl font-bold">:</span>
              <TimeBox value={hours} label="h" />
              <span className="text-xl font-bold">:</span>
              <TimeBox value={minutes} label="m" />
              <span className="text-xl font-bold">:</span>
              <TimeBox value={seconds} label="s" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white text-red-600 font-bold text-lg w-10 h-10 flex items-center justify-center rounded-md shadow-inner">
        {value.toString().padStart(2, '0')}
      </div>
      <span className="text-[10px] uppercase font-bold mt-1 text-white/80">{label}</span>
    </div>
  );
}
