'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

const galleryImages = [
  { id: 1, src: 'https://picsum.photos/seed/team1/800/600', alt: 'Team meeting' },
  { id: 2, src: 'https://picsum.photos/seed/office/800/600', alt: 'Office space' },
  { id: 3, src: 'https://picsum.photos/seed/code/800/600', alt: 'Coding session' },
  { id: 4, src: 'https://picsum.photos/seed/hardware/800/600', alt: 'Hardware prototyping' },
];

export function About() {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="https://ik.imagekit.io/sfknwtw4r/Skanilan/skanilan?updatedAt=1772453444075"
              alt="Skanilan Tech Office"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-violet-900/10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-6">
              Skanilan Tech | SMKN 9 Semarang
            </h2>
            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                Skanilan Tech adalah unit usaha inovatif di SMK Negeri 9 Semarang yang berfokus pada pengembangan solusi digital. Sebagai wadah profesional bagi para siswa, perusahaan ini mengintegrasikan kejuruan dengan kebutuhan industri nyata untuk menghasilkan karya teknologi yang kompetitif.
              </p>
              <p>
                Layanan yang ditawarkan mencakup Web Development, IoT, Photography, dan Gamification. Setiap proyek dikerjakan dengan standar teknis yang matang, memastikan hasil yang fungsional sekaligus memiliki nilai estetika yang baik bagi para klien.
              </p>
              <p>
                Dengan semangat kolaborasi, Skanilan Tech berkomitmen untuk terus berinovasi dalam menciptakan produk digital yang solutif. Kehadirannya membuktikan bahwa talenta muda dari SMK Negeri 9 Semarang siap bersaing dan memberikan kontribusi nyata dalam ekosistem teknologi saat ini.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="border-l-2 border-violet-500 pl-4">
                <p className="text-2xl font-bold text-slate-900">50+</p>
                <p className="text-sm text-slate-500">Projects Delivered</p>
              </div>
              <div className="border-l-2 border-violet-500 pl-4">
                <p className="text-2xl font-bold text-slate-900">99%</p>
                <p className="text-sm text-slate-500">Client Satisfaction</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Gallery Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-display font-bold text-slate-900">Our Culture & Work</h3>
            <p className="text-sm text-slate-500 mt-2">A glimpse into our daily operations and achievements.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, index) => (
              <motion.div
                key={img.id}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square rounded-xl overflow-hidden shadow-sm group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
