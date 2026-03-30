'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { X, Loader2 } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
);

interface Product {
  id: string;
  name: string;
  price: number;
}

interface AdminDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  existingDiscount?: any;
}

export function AdminDiscountModal({ isOpen, onClose, onSuccess, existingDiscount }: AdminDiscountModalProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    product_id: '',
    discount_price: '',
    start_time: '',
    end_time: '',
    description: '',
  });

  useEffect(() => {
    if (!isOpen) return;

    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('id, name, price');
      if (data) setProducts(data);
    };

    fetchProducts();

    if (existingDiscount) {
      setFormData({
        product_id: existingDiscount.product_id,
        discount_price: existingDiscount.discount_price.toString(),
        start_time: new Date(existingDiscount.start_time).toISOString().slice(0, 16),
        end_time: new Date(existingDiscount.end_time).toISOString().slice(0, 16),
        description: existingDiscount.description || '',
      });
    } else {
      setFormData({
        product_id: '',
        discount_price: '',
        start_time: '',
        end_time: '',
        description: '',
      });
    }
  }, [isOpen, existingDiscount]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        product_id: formData.product_id,
        discount_price: parseFloat(formData.discount_price),
        start_time: new Date(formData.start_time).toISOString(),
        end_time: new Date(formData.end_time).toISOString(),
        description: formData.description,
        is_active: true,
      };

      let err;
      if (existingDiscount?.id) {
        const { error } = await supabase.from('discounts').update(payload).eq('id', existingDiscount.id);
        err = error;
      } else {
        const { error } = await supabase.from('discounts').insert([payload]);
        err = error;
      }

      if (err) throw err;
      
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving the discount.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">
            {existingDiscount ? 'Edit Flash Sale' : 'Create Flash Sale'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Select Product</label>
            <select
              required
              value={formData.product_id}
              onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="" disabled>Select a product...</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name} (Original: ${p.price})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Discount Price ($)</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.discount_price}
              onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. 99.99"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Start Time</label>
              <input
                type="datetime-local"
                required
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">End Time</label>
              <input
                type="datetime-local"
                required
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"
              placeholder="Flash sale description..."
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-70"
            >
              {isSubmitting ? <Loader2 className="animate-spin mr-2" size={20} /> : 'Save Flash Sale'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
