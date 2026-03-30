'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import { Settings, Zap, MessageCircle } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';
import { AdminDiscountModal } from '@/components/AdminDiscountModal';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
);

const WHATSAPP_NUMBER = '1234567890'; // Replace with actual WhatsApp number

export function DiscountSection() {
  const [discount, setDiscount] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { days, hours, minutes, seconds, isExpired } = useCountdown(discount?.end_time || null);

  const fetchDiscount = async () => {
    setIsLoading(true);
    const now = new Date().toISOString();
    
    try {
      const { data } = await supabase
        .from('discounts')
        .select('*, products(name, image_url, price)')
        .eq('is_active', true)
        .lte('start_time', now)
        .gte('end_time', now)
        .order('end_time', { ascending: true })
        .limit(1)
        .maybeSingle();

      setDiscount(data);
    } catch (error) {
      console.error('Error fetching discount:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAdmin = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        if (profile?.role === 'admin') {
          setIsAdmin(true);
        }
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  useEffect(() => {
    fetchDiscount();
    checkAdmin();
  }, []);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const handleOrderClick = () => {
    if (!discount) return;
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

  const showEmptyState = !discount || isExpired;

  return (
    <section className="relative w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {isAdmin && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-4 z-20 p-3 bg-white text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-full shadow-lg border border-gray-200 transition-all"
          title="Manage Flash Sale"
        >
          <Settings size={20} />
        </button>
      )}

      {showEmptyState ? (
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl p-16 text-center border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
          <Zap className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-2xl font-bold text-gray-800">Stay tuned for our next flash sale!</h3>
          <p className="text-gray-500 mt-2 max-w-md">We regularly offer massive discounts on our best products. Check back soon so you don&apos;t miss out.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col lg:flex-row relative">
          <div className="absolute top-6 left-6 z-10 bg-red-600 text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-2">
            <Zap size={14} className="fill-current" /> Flash Sale
          </div>

          <div className="relative w-full lg:w-1/2 h-72 lg:h-auto bg-gray-50">
            {discount.products.image_url ? (
              <Image
                src={discount.products.image_url}
                alt={discount.products.name}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                No Image Available
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 p-8 lg:p-14 flex flex-col justify-center bg-white">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
              {discount.products.name}
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {discount.description}
            </p>

            <div className="flex items-baseline gap-4 mb-10">
              <span className="text-5xl font-black text-red-600 tracking-tight">
                {formatCurrency(discount.discount_price)}
              </span>
              <span className="text-xl text-gray-400 line-through font-semibold">
                {formatCurrency(discount.products.price)}
              </span>
            </div>

            <div className="mb-10">
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                Offer Ends In
              </div>
              <div className="flex gap-4 lg:gap-6">
                {[
                  { label: 'Days', value: days },
                  { label: 'Hours', value: hours },
                  { label: 'Mins', value: minutes },
                  { label: 'Secs', value: seconds },
                ].map((unit) => (
                  <div key={unit.label} className="flex flex-col items-center">
                    <div className="bg-gray-900 text-white text-3xl font-bold rounded-xl w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center shadow-inner">
                      {unit.value.toString().padStart(2, '0')}
                    </div>
                    <span className="text-xs text-gray-500 mt-3 font-bold uppercase tracking-wider">{unit.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleOrderClick}
              className="group inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-2xl transition-all shadow-lg hover:shadow-green-500/30 hover:-translate-y-1"
            >
              <MessageCircle className="mr-3 group-hover:scale-110 transition-transform" size={24} />
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
