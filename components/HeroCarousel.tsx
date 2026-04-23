'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const DiscountSection = dynamic(() => import('@/components/DiscountSection').then(mod => mod.DiscountSection), { 
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[320px] mx-auto h-[340px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col justify-center items-center">
      <div className="animate-pulse w-full h-full flex flex-col gap-4 p-4">
        <div className="w-full h-36 bg-gray-200 rounded-2xl"></div>
        <div className="w-3/4 h-6 bg-gray-200 rounded-md mt-2"></div>
        <div className="w-1/2 h-8 bg-gray-200 rounded-md"></div>
        <div className="w-full h-12 bg-gray-200 rounded-xl mt-auto"></div>
      </div>
    </div>
  )
});

const slides = [
  {
    id: 1,
    title: 'Next-Gen IoT Solutions',
    subtitle: 'Connecting the physical world to the digital realm with smart, scalable IoT infrastructure.',
    image: 'https://picsum.photos/seed/technology/1920/1080',
    color: 'from-violet-500 to-blue-600',
  },
  {
    id: 2,
    title: 'Enterprise Web Development',
    subtitle: 'Building robust, high-performance web applications tailored to your business needs.',
    image: 'https://picsum.photos/seed/office/1920/1080',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 3,
    title: 'Mobile App Innovation',
    subtitle: 'Creating intuitive and engaging mobile experiences for iOS and Android platforms.',
    image: 'https://picsum.photos/seed/digital/1920/1080',
    color: 'from-indigo-500 to-violet-600',
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <div className="relative py-16 lg:py-0 lg:h-screen w-full bg-white flex flex-col justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              fill
              className="object-cover opacity-80"
              priority
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 w-full items-center">
            
            {/* Left side text / Carousel Text */}
            <div className="hidden lg:block w-full order-2 lg:order-1 lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="max-w-3xl"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-slate-900 leading-tight mb-6">
                    {slides[current].title}
                  </h1>
                  <p className="text-lg sm:text-xl text-slate-700 mb-8 max-w-2xl">
                    {slides[current].subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className={`px-6 py-3 rounded-lg text-white font-medium bg-gradient-to-r ${slides[current].color} hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg`}>
                      Explore Solutions
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="px-6 py-3 rounded-lg text-slate-900 font-medium bg-white/50 hover:bg-white/80 backdrop-blur-md transition-colors border border-slate-200">
                      Contact Us
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right side Flash Sale */}
            <div className="w-full order-1 lg:order-2 lg:col-span-5 max-w-[320px] mx-auto lg:ml-auto z-20">
               <DiscountSection />
            </div>

          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="hidden absolute bottom-8 right-4 lg:right-8 z-20 lg:flex gap-2 lg:gap-4">
        <button
          onClick={prevSlide}
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/50 hover:bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-900 border border-slate-200 transition-colors shadow-sm"
        >
          <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/50 hover:bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-900 border border-slate-200 transition-colors shadow-sm"
        >
          <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="hidden absolute bottom-10 lg:bottom-8 left-1/2 -translate-x-1/2 z-20 lg:flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              current === index ? 'w-8 bg-violet-600' : 'bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
