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

  const fetchDiscount = async () => {
    setIsLoading(true);
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
          // Parse price string to number
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
        // Check email, user.role, app_metadata or user_metadata first
        if (
          user.email === 'adityapramid25@gmail.com' ||
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

  useEffect(() => {
    fetchDiscount();
    checkAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
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

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

  const handleOrderClick = () => {
    if (!discount || !discount.products) return;
    const message = `Hello, I would like to order ${discount.products.name} at the special promo price of ${formatCurrency(discount.discount_price)}. Is it still available?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const showEmptyState = !discount || !discount.products || isExpired;

  if (isLoading) {
    return (
      <div className="relative w-full max-w-[320px] mx-auto h-[340px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col justify-center items-center pointer-events-auto">
        <div className="animate-pulse w-full h-full flex flex-col gap-4 p-4">
          <div className="w-full h-36 bg-gray-200 rounded-2xl"></div>
          <div className="w-3/4 h-6 bg-gray-200 rounded-md mt-2"></div>
          <div className="w-1/2 h-8 bg-gray-200 rounded-md"></div>
          <div className="w-full h-12 bg-gray-200 rounded-xl mt-auto"></div>
        </div>
      </div>
    );
  }

  if (showEmptyState) {
    return (
      <div className="relative w-full max-w-[320px] mx-auto">
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
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col relative pointer-events-auto h-[340px] justify-center items-center p-6 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Zap className="h-8 w-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-extrabold text-gray-800 mb-2">Belum ada promo</h3>
          <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
            Saat ini sedang tidak ada flash sale yang berlangsung. Pantau terus untuk penawaran menarik berikutnya!
          </p>
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
    <div className="relative w-full max-w-[320px] mx-auto">
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

      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col relative pointer-events-auto">
        <div className="absolute top-3 right-3 z-10 bg-red-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
          <Zap size={10} className="fill-current" /> Flash Sale
        </div>

        <div className="relative w-full h-36 bg-gray-50">
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

        <div className="w-full p-4 flex flex-col justify-center bg-white">
          <div className="text-xs font-bold text-gray-800 mb-0.5">Limited offer</div>
          <h2 className="text-lg font-extrabold text-gray-900 mb-1 leading-tight line-clamp-1">
            {discount.products?.name}
          </h2>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-black text-indigo-700 tracking-tight">
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
            className="w-full py-2.5 bg-gradient-to-r from-blue-700 to-indigo-700 hover:opacity-90 text-white text-xs font-bold rounded-xl transition-all shadow-lg"
          >
            Order Now
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
