'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Settings, X } from 'lucide-react';
import { localProducts } from '@/lib/products';
import { updateDiscount } from '@/app/actions';

// Mock hook as requested
const useCurrentUser = () => {
  return { role: 'admin' }; // Assuming admin for demonstration
};

export function AdminFloatingSettings() {
  const currentUser = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (currentUser.role !== 'admin') {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      // Convert datetime-local to ISO string
      const startDateLocal = formData.get('start_date') as string;
      const endDateLocal = formData.get('end_date') as string;
      
      if (startDateLocal) {
        formData.set('start_date', new Date(startDateLocal).toISOString());
      }
      if (endDateLocal) {
        formData.set('end_date', new Date(endDateLocal).toISOString());
      }

      await updateDiscount(formData);
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Failed to update discount:', error);
      alert('Failed to update discount. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-slate-800 transition-all hover:scale-105"
        aria-label="Admin Settings"
      >
        <Settings className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-xl font-semibold text-slate-900">Flash Sale Settings</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-2">
                <label htmlFor="product_id" className="block text-sm font-medium text-slate-700">
                  Select Product
                </label>
                <select
                  id="product_id"
                  name="product_id"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                >
                  <option value="">-- Select a Product --</option>
                  {localProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="discount_price" className="block text-sm font-medium text-slate-700">
                  Discount Price ($)
                </label>
                <input
                  type="number"
                  id="discount_price"
                  name="discount_price"
                  min="0"
                  step="0.01"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  placeholder="e.g. 99.99"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="start_date" className="block text-sm font-medium text-slate-700">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="start_date"
                  name="start_date"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="end_date" className="block text-sm font-medium text-slate-700">
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="end_date"
                  name="end_date"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
