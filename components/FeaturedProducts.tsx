'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { allProducts } from '@/lib/products';
import { ShoppingCart, Edit3 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { AdminFeaturedModal } from './AdminFeaturedModal';

import { saveFeaturedProducts } from '@/app/actions';

const WHATSAPP_NUMBER = '6281229438668';

export function FeaturedProducts() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<any>(null);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [customDetails, setCustomDetails] = useState<Record<string, { price: string, description: string }>>({});
  const [featuredIds, setFeaturedIds] = useState<string[]>(['iot-1', 'web-1', 'mobile-1', 'photo-1']);
  const [isLoading, setIsLoading] = useState(true);

  // Match the IDs with the actual products
  const featured = featuredIds.map(id => allProducts.find(p => p.id === id) || allProducts[0]);

  useEffect(() => {
    const loadConfig = async () => {
      // 1. Try local storage first for immediate paint
      try {
        const storedIds = localStorage.getItem('custom_featured_ids');
        if (storedIds) setFeaturedIds(JSON.parse(storedIds));
        const storedImg = localStorage.getItem('custom_featured_images');
        if (storedImg) setCustomImages(JSON.parse(storedImg));
        const storedDetails = localStorage.getItem('custom_featured_details');
        if (storedDetails) setCustomDetails(JSON.parse(storedDetails));
      } catch (e) {}

      // 2. Fetch from Supabase for fresh data
      try {
        const { data, error } = await supabase.storage.from('app-settings').download('featured-products.json');
        if (data) {
          const text = await data.text();
          const config = JSON.parse(text);
          if (config.featuredIds) {
            setFeaturedIds(config.featuredIds);
            localStorage.setItem('custom_featured_ids', JSON.stringify(config.featuredIds));
          }
          if (config.customImages) {
            setCustomImages(config.customImages);
            localStorage.setItem('custom_featured_images', JSON.stringify(config.customImages));
          }
          if (config.customDetails) {
            setCustomDetails(config.customDetails);
            localStorage.setItem('custom_featured_details', JSON.stringify(config.customDetails));
          }
        }
      } catch (e) {
        console.error('Error fetching global featured products', e);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadConfig();

    const checkAdmin = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          if (
            user.role === 'admin' || 
            user.app_metadata?.role === 'admin' || 
            user.user_metadata?.role === 'admin'
          ) {
            setIsAdmin(true);
            return;
          }

          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
            
          if (profile?.role === 'admin') {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        // Silently ignore
      }
    };

    checkAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        checkAdmin();
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleEditClick = (product: any, index: number) => {
    setActiveProduct(product);
    setActiveSlot(index);
    setIsModalOpen(true);
  };

  const handleSaveFeatured = async (slotIndex: number, newProductId: string, imageUrl: string, price: string, description: string) => {
    const updatedIds = [...featuredIds];
    updatedIds[slotIndex] = newProductId;
    setFeaturedIds(updatedIds);

    const updatedImages = { ...customImages, [newProductId]: imageUrl };
    setCustomImages(updatedImages);

    const updatedDetails = { ...customDetails, [newProductId]: { price, description } };
    setCustomDetails(updatedDetails);
    
    try {
      localStorage.setItem('custom_featured_ids', JSON.stringify(updatedIds));
      localStorage.setItem('custom_featured_images', JSON.stringify(updatedImages));
      localStorage.setItem('custom_featured_details', JSON.stringify(updatedDetails));
    } catch(e) {}

    try {
      await saveFeaturedProducts({
        featuredIds: updatedIds,
        customImages: updatedImages,
        customDetails: updatedDetails
      });
    } catch (err) {
      console.error('Failed to save configuration globally:', err);
    }
  };

  const formatCurrency = (str: string) => {
    // If it already contains Rp or $, just return the string
    return str;
  };

  const handleOrderClick = (product: any) => {
    const message = `Hai min, saya tertarik dengan produk unggulan ${product.title}. Apakah bisa dibantu informasi lebih lanjut?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl relative inline-block">
            Produk Unggulan
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-blue-600 rounded-full"></div>
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Pilihan layanan dan produk terpopuler untuk kebutuhan bisnis Anda
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product, index) => {
            const displayImage = product?.id ? (customImages[product.id] || product.image) : (product?.image || 'https://picsum.photos/400/300');
            const displayPrice = product?.id ? (customDetails[product.id]?.price || product.price) : (product?.price || '');
            const displayDescription = product?.id ? (customDetails[product.id]?.description || product.description) : (product?.description || '');
            
            return (
              <div key={`${product?.id}-${index}`} className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* 4:3 Image */}
                <div className="relative w-full aspect-[4/3] bg-gray-100 group">
                  <Image
                    src={displayImage}
                    alt={product?.title || 'Product Image'}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {isAdmin && product && (
                    <button
                      onClick={() => handleEditClick(product, index)}
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                      title="Edit Product"
                    >
                      <Edit3 size={18} />
                    </button>
                  )}
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                    {product?.category}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {product?.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-1 whitespace-pre-wrap">
                    {displayDescription}
                  </p>
                  
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-lg font-black text-gray-900">
                      {formatCurrency(displayPrice)}
                    </span>
                  </div>

                  {/* WhatsApp Button */}
                  <button
                    onClick={() => handleOrderClick(product)}
                    className="w-full py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 mt-auto"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
                    </svg>
                    Order Via Whatsapp
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {activeProduct && activeSlot !== null && (
        <AdminFeaturedModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSaveFeatured}
          slotIndex={activeSlot}
          productId={activeProduct.id}
          currentImage={customImages[activeProduct.id] || activeProduct.image}
          currentPrice={customDetails[activeProduct.id]?.price || activeProduct.price}
          currentDescription={customDetails[activeProduct.id]?.description || activeProduct.description}
        />
      )}
    </section>
  );
}

