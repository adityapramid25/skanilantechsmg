'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Settings, Zap, MessageCircle } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';
import { AdminDiscountModal } from '@/components/AdminDiscountModal';
import { checkAdminStatus } from '@/app/actions';
import { allProducts } from '@/lib/products';

const WHATSAPP_NUMBER = '6281229438668'; // Replace with actual WhatsApp number

export function DiscountSection() {
  const [discount, setDiscount] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { days, hours, minutes, seconds, isExpired } = useCountdown(discount?.end_date || null);

  useEffect(() => {
    // Read from cache synchronously after hydration
    try {
      const cached = localStorage.getItem('cached_discount');
      if (cached) {
        setDiscount(JSON.parse(cached));
        setIsLoading(false);
      }
    } catch (e) {
      try { localStorage.removeItem('cached_discount'); } catch (err) {}
    }

    let isMounted = true;

    // We only fetch and check role if mounted
    const init = async () => {
      await Promise.all([fetchDiscount(), checkAdmin()]);
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        checkAdmin();
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);
  const fetchDiscount = async () => {
    const now = new Date().toISOString();
    
    try {
      const { data } = await supabase
        .from('active_discounts')
        .select('*')
        .gte('end_date', now)
        .order('end_date', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (data) {
        const product = allProducts.find(p => p.id === data.product_id);
        if (product) {
          let parsedPrice = 0;
          if (product.price.includes('Rp.')) {
            parsedPrice = parseFloat(product.price.replace(/[^0-9]/g, ""));
          } else {
            parsedPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
          }
          
          data.products = {
            name: product.title,
            image_url: product.image,
            price: parsedPrice
          };
        }
        try {
          localStorage.setItem('cached_discount', JSON.stringify(data));
        } catch (e) {}
      } else {
        try {
          localStorage.removeItem('cached_discount');
        } catch (e) {}
      }

      setDiscount(data);
    } catch (error: any) {
      if (error?.message === 'Failed to fetch') {
        console.error('Unable to connect to Supabase to fetch discounts.');
      } else {
        console.error('Error fetching discount:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkAdmin = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Check user.role, app_metadata or user_metadata first
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
        } else {
          // Fallback to server action in case RLS blocks reading profiles
          const isServerAdmin = await checkAdminStatus(user.id);
          if (isServerAdmin) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      // Silently ignore errors during admin check to prevent console spam
      setIsAdmin(false);
    }
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

  const handleOrderClick = () => {
    if (!discount || !discount.products) return;
    const message = `Hai min, saya mau order produk ${discount.products.name} dengan harga diskon sebesar ${formatCurrency(discount.discount_price)}. Apakah stock masih ada?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const showEmptyState = !discount || !discount.products || isExpired;

  if (isLoading) {
    return (
      <div className="relative w-full max-w-[320px] md:max-w-none mx-auto h-[340px] md:h-[240px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col md:flex-row pointer-events-auto">
        <div className="animate-pulse w-full md:w-[40%] h-40 md:h-[240px] bg-gray-200"></div>
        <div className="w-full md:flex-1 h-full flex flex-col gap-4 p-4 md:p-5 justify-center">
          <div className="w-full max-w-[200px] h-6 bg-gray-200 rounded-md"></div>
          <div className="w-3/4 h-8 bg-gray-200 rounded-md"></div>
          <div className="w-full flex gap-2 mt-2">
             <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
             <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
             <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
             <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="w-full h-[42px] bg-gray-200 rounded-xl mt-auto"></div>
        </div>
      </div>
    );
  }

  if (showEmptyState) {
    return (
      <div className="relative w-full max-w-[320px] md:max-w-none mx-auto">
        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute -top-10 right-0 z-20 px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-lg font-medium flex items-center gap-1.5 transition-all text-xs"
            title="Manage Flash Sale"
          >
            <Settings size={14} />
            <span>Manage</span>
          </button>
        )}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col md:flex-row relative pointer-events-auto h-[340px] md:h-[220px] justify-center items-center p-6 text-center md:text-left gap-4 md:gap-6">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center mb-0">
            <Zap className="h-8 w-8 md:h-10 md:w-10 text-gray-300" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-extrabold text-gray-800 mb-2">Belum ada promo</h3>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-[200px] md:max-w-[260px]">
              Saat ini sedang tidak ada flash sale yang berlangsung. Pantau terus untuk penawaran menarik berikutnya!
            </p>
          </div>
        </div>
        <AdminDiscountModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchDiscount}
          existingDiscount={discount}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[320px] md:max-w-none mx-auto">
      {isAdmin && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute -top-10 right-0 z-20 px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-lg font-medium flex items-center gap-1.5 transition-all text-xs"
          title="Manage Flash Sale"
        >
          <Settings size={14} />
          <span>Manage</span>
        </button>
      )}

      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col md:flex-row relative pointer-events-auto items-stretch md:min-h-[220px]">
        <div className="absolute top-6 md:top-4 -left-12 md:-left-12 w-48 z-20 bg-red-600 text-white text-[10px] md:text-[9px] font-black py-1.5 uppercase tracking-widest shadow-lg flex justify-center items-center gap-1.5 -rotate-45">
          <Zap size={10} className="fill-current" />
          <span className="mt-[1px]">Flash Sale</span>
        </div>

        <div className="relative w-full md:w-[45%] aspect-[4/3] md:aspect-auto bg-gray-50 flex-shrink-0">
          {discount.products?.image_url ? (
            <Image
              src={discount.products.image_url}
              alt={discount.products.name || 'Product Image'}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium text-xs">
              No Image Available
            </div>
          )}
        </div>

        <div className="w-full md:flex-1 p-4 md:px-5 md:py-4 flex flex-col justify-center bg-white">
          <div className="text-xs font-bold text-gray-800 mb-0.5">Limited offer</div>
          <h2 className="text-lg font-extrabold text-gray-900 mb-1 leading-tight line-clamp-2">
            {discount.products?.name}
          </h2>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-black text-red-600 tracking-tight">
              {formatCurrency(discount.discount_price)}
            </span>
            <span className="text-xs text-gray-400 line-through font-semibold">
              {formatCurrency(discount.products?.price || 0)}
            </span>
          </div>

          <div className="mb-4">
            <div className="text-[10px] font-semibold text-gray-500 mb-1.5">
              offer ends in
            </div>
            <div className="flex gap-1.5">
              {[
                { label: 'D', value: days },
                { label: 'H', value: hours },
                { label: 'M', value: minutes },
                { label: 'S', value: seconds },
              ].map((unit) => (
                <div key={unit.label} className="flex flex-col items-center flex-1">
                  <div className="bg-indigo-100 text-indigo-700 text-base font-bold rounded-lg w-full aspect-square flex items-center justify-center">
                    {unit.value.toString().padStart(2, '0')}
                  </div>
                  <span className="text-[9px] text-gray-500 mt-1 font-bold">{unit.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleOrderClick}
            className="w-full py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
            </svg>
            Order Via Whatsapp
          </button>
        </div>
      </div>

      <AdminDiscountModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchDiscount}
        existingDiscount={discount}
      />
    </div>
  );
}
