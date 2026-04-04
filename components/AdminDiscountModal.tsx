'use client';

import { useState, useEffect } from 'react';
import { X, Loader2, AlertTriangle } from 'lucide-react';
import { allProducts } from '@/lib/products';
import { saveFlashSale, stopFlashSale } from '@/app/actions';

interface AdminDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  existingDiscount?: any;
}

export function AdminDiscountModal({ isOpen, onClose, onSuccess, existingDiscount }: AdminDiscountModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmStop, setShowConfirmStop] = useState(false);

  const [formData, setFormData] = useState({
    product_id: '',
    discount_price: '',
    start_time: '',
    end_time: '',
  });

  useEffect(() => {
    if (!isOpen) {
      setShowConfirmStop(false);
      return;
    }

    const formatToJakartaDatetime = (dateString: string) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      // Add 7 hours to UTC time for Jakarta (UTC+7)
      const jakartaTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);
      return jakartaTime.toISOString().slice(0, 16);
    };

    if (existingDiscount) {
      setFormData({
        product_id: existingDiscount.product_id,
        discount_price: existingDiscount.discount_price.toString(),
        start_time: formatToJakartaDatetime(existingDiscount.start_date),
        end_time: formatToJakartaDatetime(existingDiscount.end_date),
      });
    } else {
      setFormData({
        product_id: '',
        discount_price: '',
        start_time: '',
        end_time: '',
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
        // Parse input as Jakarta time (UTC+7)
        start_date: new Date(`${formData.start_time}:00+07:00`).toISOString(),
        end_date: new Date(`${formData.end_time}:00+07:00`).toISOString(),
      };

      await saveFlashSale(payload);
      
      onSuccess();
      onClose();
    } catch (err: any) {
      let msg = err.message || 'An error occurred while saving the discount.';
      if (msg === 'Failed to fetch' || msg === 'fetch failed') {
        msg = 'Unable to connect to the server. Please check your internet connection or try again later.';
      }
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">
            {showConfirmStop ? 'Confirm Stop Sale' : (existingDiscount ? 'Edit Flash Sale' : 'Create Flash Sale')}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {showConfirmStop ? (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2">
              <AlertTriangle size={32} />
            </div>
            <h4 className="text-xl font-bold text-gray-900">Stop Flash Sale?</h4>
            <p className="text-gray-500">Are you sure you want to stop the current flash sale? This action cannot be undone and the discount will be removed immediately.</p>
            
            {error && (
              <div className="w-full p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 mt-2">
                {error}
              </div>
            )}

            <div className="flex gap-3 w-full mt-6 pt-4">
              <button
                type="button"
                onClick={() => setShowConfirmStop(false)}
                disabled={isSubmitting}
                className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-colors disabled:opacity-70"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  setIsSubmitting(true);
                  setError(null);
                  try {
                    await stopFlashSale();
                    onSuccess();
                    onClose();
                  } catch (err: any) {
                    let msg = err.message || 'Failed to stop flash sale';
                    if (msg === 'Failed to fetch' || msg === 'fetch failed') {
                      msg = 'Unable to connect to the server. Please check your internet connection or try again later.';
                    }
                    setError(msg);
                    setIsSubmitting(false);
                  }
                }}
                disabled={isSubmitting}
                className="flex-1 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors flex justify-center items-center disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 className="animate-spin mr-2" size={20} /> : 'Yes, Stop Sale'}
              </button>
            </div>
          </div>
        ) : (
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
                {allProducts.map((p) => (
                  <option key={p.id} value={p.id}>{p.title} (Original: {p.price})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Discount Price</label>
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

            <div className="pt-4 flex gap-3">
              {existingDiscount && (
                <button
                  type="button"
                  onClick={() => setShowConfirmStop(true)}
                  disabled={isSubmitting}
                  className="flex-1 flex justify-center items-center bg-red-100 hover:bg-red-200 text-red-700 font-bold py-3.5 rounded-xl transition-colors disabled:opacity-70"
                >
                  Stop Sale
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-[2] flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 className="animate-spin mr-2" size={20} /> : 'Save Flash Sale'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
