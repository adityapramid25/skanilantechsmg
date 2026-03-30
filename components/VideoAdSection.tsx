'use client';

import { motion } from 'motion/react';
import { PlayCircle } from 'lucide-react';
import Image from 'next/image';

export function VideoAdSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-white to-white pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary-light mb-4"
          >
            Experience the Future
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Watch how Skanilan Tech transforms businesses with cutting-edge IoT, Web, and Mobile solutions.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-xl group cursor-pointer bg-slate-50"
        >
          {/* Tech-themed border accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary rounded-tl-2xl z-20 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary-light rounded-br-2xl z-20 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent z-10"></div>
          
          <Image 
            src="https://picsum.photos/seed/techvideo/1280/720" 
            alt="Video Thumbnail" 
            fill
            className="object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500"
            referrerPolicy="no-referrer"
          />
          
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm border border-white group-hover:scale-110 group-hover:bg-white transition-all duration-300 shadow-lg">
              <PlayCircle className="w-10 h-10 text-primary ml-1" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
