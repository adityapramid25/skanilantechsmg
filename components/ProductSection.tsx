'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, MessageCircle } from 'lucide-react';
import { categories, allProducts } from '@/lib/products';

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
