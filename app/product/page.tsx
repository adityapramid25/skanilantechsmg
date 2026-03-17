import type { Metadata } from 'next';
import { ProductSection } from '@/components/ProductSection';

export const metadata: Metadata = {
  title: 'Our Products & Services',
  description: 'Explore Skanilan Tech\'s portfolio of IoT solutions, custom web development, mobile applications, and photography services.',
};

export default function ProductPage() {
  return (
    <div className="pt-16">
      <ProductSection />
    </div>
  );
}
