'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Settings, Zap, MessageCircle } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';
import { AdminDiscountModal } from '@/components/AdminDiscountModal';
import { checkAdminStatus } from '@/app/actions';
import { allProducts } from '@/lib/products';

const WHATSAPP_NUMBER = '1234567890'; // Replace with actual WhatsApp number

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

  if (isLoading) {
    return (
      <section className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse h-64 bg-gray-200 rounded-3xl w-full"></div>
      </section>
    );
  }

  const showEmptyState = !discount || !discount.products || isExpired;

  return (
    <section className="relative w-full max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {isAdmin && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-2 right-4 z-20 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-lg font-medium flex items-center gap-2 transition-all text-sm"
          title="Manage Flash Sale"
        >
          <Settings size={16} />
          <span>Manage Flash Sale</span>
        </button>
      )}

      {showEmptyState ? (
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl p-8 text-center border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[200px]">
          <Zap className="h-12 w-12 text-gray-300 mb-3" />
          <h3 className="text-xl font-bold text-gray-800">Stay tuned for our next flash sale!</h3>
          <p className="text-gray-500 mt-2 max-w-md text-sm">We regularly offer massive discounts on our best products. Check back soon so you don&apos;t miss out.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col lg:flex-row relative">
          <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1.5">
            <Zap size={12} className="fill-current" /> Flash Sale
          </div>

          <div className="relative w-full lg:w-2/5 h-48 lg:h-auto bg-gray-50">
            {discount.products?.image_url ? (
              <Image
                src={discount.products.image_url}
                alt={discount.products.name || 'Product Image'}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium text-sm">
                No Image Available
              </div>
            )}
          </div>

          <div className="w-full lg:w-3/5 p-6 lg:p-8 flex flex-col justify-center bg-white">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
              {discount.products?.name}
            </h2>

            <div className="flex items-baseline gap-3 mb-6 mt-4">
              <span className="text-3xl lg:text-4xl font-black text-red-600 tracking-tight">
                {formatCurrency(discount.discount_price)}
              </span>
              <span className="text-lg text-gray-400 line-through font-semibold">
                {formatCurrency(discount.products?.price || 0)}
              </span>
            </div>

            <div className="mb-8">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Offer Ends In
              </div>
              <div className="flex gap-3 lg:gap-4">
                {[
                  { label: 'Days', value: days },
                  { label: 'Hours', value: hours },
                  { label: 'Mins', value: minutes },
                  { label: 'Secs', value: seconds },
                ].map((unit) => (
                  <div key={unit.label} className="flex flex-col items-center">
                    <div className="bg-gray-900 text-white text-xl lg:text-2xl font-bold rounded-xl w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center shadow-inner">
                      {unit.value.toString().padStart(2, '0')}
                    </div>
                    <span className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-wider">{unit.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleOrderClick}
              className="group inline-flex items-center justify-center w-full sm:w-auto px-6 py-3.5 bg-green-500 hover:bg-green-600 text-white text-base font-bold rounded-xl transition-all shadow-lg hover:shadow-green-500/30 hover:-translate-y-1"
            >
              <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" size={20} />
              Order Now via WhatsApp
            </button>
          </div>
        </div>
      )}

      <AdminDiscountModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchDiscount}
        existingDiscount={discount}
      />
    </section>
  );
}
