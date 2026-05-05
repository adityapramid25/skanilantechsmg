'use client';

import { useState, useEffect } from 'react';
import { X, Image as ImageIcon, Package } from 'lucide-react';
import { allProducts, categories } from '@/lib/products';

interface AdminFeaturedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (slotIndex: number, newProductId: string, imageUrl: string) => void;
  slotIndex: number;
  productId: string;
  currentImage: string;
}

export function AdminFeaturedModal({ isOpen, onClose, onSuccess, slotIndex, productId, currentImage }: AdminFeaturedModalProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  
  useEffect(() => {
    if (isOpen) {
      setImageUrl(currentImage || '');
      setSelectedProductId(productId || '');
    }
  }, [isOpen, currentImage, productId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(slotIndex, selectedProductId, imageUrl);
    onClose();
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    setSelectedProductId(newId);
    const newProd = allProducts.find(p => p.id === newId);
    if (newProd) {
      setImageUrl(newProd.image);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">
            Edit Featured Product
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Select Product
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Package size={18} className="text-gray-400" />
              </div>
              <select
                required
                value={selectedProductId}
                onChange={handleProductChange}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm appearance-none"
              >
                <option value="" disabled>Select a product...</option>
                {categories.map(cat => (
                  <optgroup key={cat} label={cat}>
                    {allProducts.filter(p => p.category === cat).map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Select the product to display in this slot.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Image URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ImageIcon size={18} className="text-gray-400" />
              </div>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Provide a valid direct URL to an image. Image will be displayed in 4:3 aspect ratio.
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
