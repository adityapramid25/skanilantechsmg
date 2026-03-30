'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, MessageCircle } from 'lucide-react';

// Static Data for Products - Edit each product individually here
const categories = ['IoT', 'Web Development', 'Mobile Applications', 'Photography', 'Gamification'];

const allProducts = [
  // IoT Category
  {
    id: 'iot-1',
    title: 'Sistem Presensi RFID',
    price: 'Rp. 1.000.000',
    image: 'https://picsum.photos/seed/iot1/400/300',
    description: 'Complete smart home setup with voice control and energy monitoring. Tailored to your specific home layout.',
    category: 'IoT',
  },
  {
    id: 'iot-2',
    title: 'Hidroponik',
    price: 'Rp. 1.000.000',
    image: 'https://picsum.photos/seed/iot2/400/300',
    description: 'High-precision sensors for manufacturing and predictive maintenance. Includes real-time dashboard.',
    category: 'IoT',
  },
  {
    id: 'iot-3',
    title: 'Sensor Suhu',
    price: 'Rp. 1.000.000',
    image: 'https://picsum.photos/seed/iot3/400/300',
    description: 'Soil moisture and weather monitoring for optimized farming and increased crop yield.',
    category: 'IoT',
  },

  // Web Development Category
  {
    id: 'web-1',
    title: 'Setting SEO',
    price: 'Rp. 1.000.000',
    image: 'https://picsum.photos/seed/web1/400/300',
    description: 'Custom online store with payment gateway integration, inventory management, and user profiles.',
    category: 'Web Development',
  },
  {
    id: 'web-2',
    title: 'Desain UI/UX',
    price: 'Rp. 1.000.000',
    image: 'https://picsum.photos/seed/web2/400/300',
    description: 'Professional company website with SEO optimization, blog, and CMS for easy content updates.',
    category: 'Web Development',
  },
  {
    id: 'web-3',
    title: 'Website Portofolio',
    price: '$2500.00',
    image: 'https://picsum.photos/seed/web3/400/300',
    description: 'Minimum Viable Product development for startups and new business ideas. Fast time-to-market.',
    category: 'Web Development',
  },
  {
    id: 'web-4',
    title: 'Website Bisnis/UMKM',
    price: '$300.00',
    image: 'https://picsum.photos/seed/web4/400/300',
    description: 'High-converting landing page design and development for your marketing campaigns.',
    category: 'Web Development',
  },
  {
    id: 'web-5',
    title: 'Website Blog/Artikel',
    price: '$300.00',
    image: 'https://picsum.photos/seed/web4/400/300',
    description: 'High-converting landing page design and development for your marketing campaigns.',
    category: 'Web Development',
  },
  {
    id: 'web-6',
    title: 'Jasa Pembuatan Web Pendidikan/Lembaga',
    price: '$300.00',
    image: 'https://picsum.photos/seed/web4/400/300',
    description: 'High-converting landing page design and development for your marketing campaigns.',
    category: 'Web Development',
  },
  {
    id: 'web-7',
    title: 'Website Landing Page',
    price: 'Rp. 1.000.000',
    image: 'https://picsum.photos/seed/web1/400/300',
    description: 'Custom online store with payment gateway integration, inventory management, and user profiles.',
    category: 'Web Development',
  },
  {
    id: 'web-8',
    title: 'Website Company Profile',
    price: 'Rp. 1.000.000',
    image: 'https://picsum.photos/seed/web2/400/300',
    description: 'Professional company website with SEO optimization, blog, and CMS for easy content updates.',
    category: 'Web Development',
  },

  // Mobile Applications Category
  {
    id: 'mobile-1',
    title: 'iOS Native App',
    price: '$3000.00',
    image: 'https://picsum.photos/seed/mobile1/400/300',
    description: 'High-performance native iOS application built with Swift, optimized for the latest Apple devices.',
    category: 'Mobile Applications',
  },
  {
    id: 'mobile-2',
    title: 'Android Native App',
    price: '$2800.00',
    image: 'https://picsum.photos/seed/mobile2/400/300',
    description: 'Robust native Android application built with Kotlin, supporting a wide range of devices.',
    category: 'Mobile Applications',
  },
  {
    id: 'mobile-3',
    title: 'Cross-Platform App',
    price: '$4000.00',
    image: 'https://picsum.photos/seed/mobile3/400/300',
    description: 'React Native or Flutter app that works seamlessly on both iOS and Android from a single codebase.',
    category: 'Mobile Applications',
  },
  {
    id: 'mobile-4',
    title: 'Desain UI/UX',
    price: '$1500.00',
    image: 'https://picsum.photos/seed/mobile4/400/300',
    description: 'Complete overhaul of your existing mobile app interface for better user engagement.',
    category: 'Mobile Applications',
  },

  // Photography Category
  {
    id: 'photo-1',
    title: 'Wedding Photography',
    price: '$1500.00',
    image: 'https://picsum.photos/seed/photo1/400/300',
    description: 'Full-day wedding coverage with edited high-resolution photos and a premium physical album.',
    category: 'Photography',
  },
  {
    id: 'photo-2',
    title: 'Product Photography',
    price: '$500.00',
    image: 'https://picsum.photos/seed/photo2/400/300',
    description: 'Professional studio shots for your e-commerce products, including lifestyle and white-background images.',
    category: 'Photography',
  },
  {
    id: 'photo-3',
    title: 'Corporate Event Coverage',
    price: '$800.00',
    image: 'https://picsum.photos/seed/photo3/400/300',
    description: 'Comprehensive photo coverage for conferences, seminars, and corporate parties.',
    category: 'Photography',
  },
  {
    id: 'photo-4',
    title: 'Portrait Session',
    price: '$250.00',
    image: 'https://picsum.photos/seed/photo4/400/300',
    description: 'Professional headshots and creative portraits for personal branding or team pages.',
    category: 'Photography',
  },

  // Gamification Category
  {
    id: 'game-1',
    title: 'Employee Engagement App',
    price: '$2000.00',
    image: 'https://picsum.photos/seed/game1/400/300',
    description: 'Gamified platform with leaderboards and badges to boost employee productivity and morale.',
    category: 'Gamification',
  },
  {
    id: 'game-2',
    title: 'Customer Loyalty Program',
    price: '$1800.00',
    image: 'https://picsum.photos/seed/game2/400/300',
    description: 'Interactive rewards system to increase customer retention and lifetime value.',
    category: 'Gamification',
  },
  {
    id: 'game-3',
    title: 'Educational Game',
    price: '$3500.00',
    image: 'https://picsum.photos/seed/game3/400/300',
    description: 'Fun and interactive learning game tailored for students or corporate compliance training.',
    category: 'Gamification',
  },
  {
    id: 'game-4',
    title: 'Marketing Mini-Game',
    price: '$1200.00',
    image: 'https://picsum.photos/seed/game4/400/300',
    description: 'Short, addictive web game designed to capture leads and promote your brand on social media.',
    category: 'Gamification',
  },
];

export function ProductSection() {
  const scrollContainerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scroll = (category: string, direction: 'left' | 'right') => {
    const container = scrollContainerRefs.current[category];
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleWhatsApp = (productName: string) => {
    const message = encodeURIComponent(`Hello Skanilan Tech, I am interested in the ${productName}.`);
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  const getCategorySlug = (category: string) => {
    return category.toLowerCase().replace(/ /g, '-');
  };

  const getProductSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <section className="py-20 bg-white" id="product">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary-light mb-3"
          >
            Our Products & Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm text-slate-600 max-w-2xl mx-auto"
          >
            Explore our comprehensive range of tech solutions designed to elevate your business.
          </motion.p>
        </div>

        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category} className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary border-l-2 border-primary pl-3">
                  {category}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => scroll(category, 'left')}
                    className="p-1.5 rounded-md bg-white border border-primary/10 text-slate-400 hover:bg-primary/5 hover:text-primary transition-colors shadow-sm"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scroll(category, 'right')}
                    className="p-1.5 rounded-md bg-white border border-primary/10 text-slate-400 hover:bg-primary/5 hover:text-primary transition-colors shadow-sm"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Horizontal Scroll Container */}
              <div
                ref={(el) => {
                  scrollContainerRefs.current[category] = el;
                }}
                className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {allProducts
                  .filter((p) => p.category === category)
                  .map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -4 }}
                      className="flex-none w-[220px] sm:w-[240px] snap-start rounded-xl p-[1px] bg-gradient-to-br from-primary/20 to-primary/10 hover:from-primary hover:to-secondary transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/30 group"
                    >
                      <div className="bg-white rounded-[11px] overflow-hidden flex flex-col h-full w-full">
                        <div className="relative h-32 w-full bg-slate-100 overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="p-3 flex flex-col flex-grow">
                          <h4 className="font-medium text-primary text-sm mb-1 truncate">{product.title}</h4>
                          <p className="text-primary-light font-semibold text-xs mb-3">{product.price}</p>
                          <div className="mt-auto flex gap-2">
                            <Link
                              href={`/product/${getCategorySlug(product.category)}/${getProductSlug(product.title)}`}
                              className="flex-1 px-2 py-1.5 text-[10px] font-medium rounded-md border border-primary/20 text-primary hover:bg-gradient-to-br hover:from-primary hover:to-primary-dark hover:text-white hover:border-transparent transition-all text-center flex items-center justify-center"
                            >
                              Detail
                            </Link>
                            <button
                              onClick={() => handleWhatsApp(product.title)}
                              className="flex-1 px-2 py-1.5 text-[10px] font-medium rounded-md bg-gradient-to-br from-secondary to-secondary-dark text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
                            >
                              <MessageCircle className="w-3 h-3" />
                              WhatsApp
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
