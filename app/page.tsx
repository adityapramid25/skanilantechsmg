import { HeroCarousel } from '@/components/HeroCarousel';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { VideoAdSection } from '@/components/VideoAdSection';
import { FunfactsSection } from '@/components/FunfactsSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HeroCarousel />
      <FeaturedProducts />
      <VideoAdSection />
      <FunfactsSection />
    </div>
  );
}
