'use client';

import React, { useState, useEffect } from 'react';
import { usePromo } from '@/context/PromoContext';
import { Settings, Save, X, AlertCircle } from 'lucide-react';

export function AdminPromoEditor() {
  const { userEmail, products, activePromo, setActivePromo } = usePromo();
  
  const [isOpen, setIsOpen] = useState(false);
  const [productId, setProductId] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  const handleOpen = () => {
    if (activePromo) {
      setProductId(activePromo.productId);
      setDiscountPrice(activePromo.discountPrice.toString());
      
      try {
        const date = new Date(activePromo.endTime);
        const tzOffset = date.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(date.getTime() - tzOffset)).toISOString().slice(0, 16);
        setEndTime(localISOTime);
      } catch (e) {
        console.error("Error formatting date", e);
      }
    } else {
      setProductId(products[0]?.id || '');
      setDiscountPrice('');
      
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tzOffset = tomorrow.getTimezoneOffset() * 60000;
      const localISOTime = (new Date(tomorrow.getTime() - tzOffset)).toISOString().slice(0, 16);
      setEndTime(localISOTime);
    }
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!productId) {
      setError('Please select a product.');
      return;
    }

    const price = parseFloat(discountPrice);
    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid discount price.');
      return;
    }

    const selectedProduct = products.find(p => p.id === productId);
    if (selectedProduct && price >= selectedProduct.price) {
      setError('Discount price must be lower than the original price.');
      return;
    }

    if (!endTime) {
      setError('Please select an end time.');
      return;
    }

    const endDateTime = new Date(endTime);
    if (endDateTime.getTime() <= new Date().getTime()) {
      setError('End time must be in the future.');
      return;
    }

    setActivePromo({
      productId,
      discountPrice: price,
      endTime: endDateTime.toISOString(),
    });

    setIsOpen(false);
  };

  const handleClearPromo = () => {
    setActivePromo(null);
    setIsOpen(false);
  };

  // Only render for admin
  if (userEmail !== 'admin@email.com') {
    return null;
  }

  return (
    <>
      {/* Admin Toggle Button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:bg-slate-800 transition-colors z-50 flex items-center justify-center group"
        aria-label="Open Admin Dashboard"
      >
        <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Admin Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-400" />
                Flash Sale Manager
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-start gap-2 text-sm border border-red-100">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="product" className="block text-sm font-semibold text-slate-700">
                  Select Product
                </label>
                <select
                  id="product"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                >
                  <option value="" disabled>Select a product...</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} (${product.price.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="discountPrice" className="block text-sm font-semibold text-slate-700">
                  Discount Price ($)
                </label>
                <input
                  type="number"
                  id="discountPrice"
                  step="0.01"
                  min="0"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  placeholder="e.g. 149.99"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="endTime" className="block text-sm font-semibold text-slate-700">
                  Sale End Time
                </label>
                <input
                  type="datetime-local"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                {activePromo && (
                  <button
                    type="button"
                    onClick={handleClearPromo}
                    className="flex-1 px-4 py-2.5 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                  >
                    End Sale Now
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-[2] px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {activePromo ? 'Update Promo' : 'Start Flash Sale'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
