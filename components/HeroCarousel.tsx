'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    title: 'Next-Gen IoT Solutions',
    subtitle: 'Connecting the physical world to the digital realm with smart, scalable IoT infrastructure.',
    image: 'https://picsum.photos/seed/technology/1920/1080',
  },
  {
    id: 2,
    title: 'Enterprise Web Development',
    subtitle: 'Building robust, high-performance web applications tailored to your business needs.',
    image: 'https://picsum.photos/seed/office/1920/1080',
  },
  {
    id: 3,
    title: 'Mobile App Innovation',
    subtitle: 'Creating intuitive and engaging mobile experiences for iOS and Android platforms.',
    image: 'https://picsum.photos/seed/digital/1920/1080',
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-primary to-primary-light">
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
            className="object-cover opacity-40 mix-blend-overlay"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-6">
                {slides[current].title}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl">
                {slides[current].subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className={`px-6 py-3 rounded-lg text-white font-medium bg-gradient-to-br from-secondary to-secondary-dark hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-secondary/30`}>
                  Explore Solutions
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-6 py-3 rounded-lg text-white font-medium bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors border border-white/20">
                  Contact Us
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-4">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-colors shadow-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-colors shadow-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
