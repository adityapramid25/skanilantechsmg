import { HeroCarousel } from '@/components/HeroCarousel';
import { VideoAdSection } from '@/components/VideoAdSection';
import { FunfactsSection } from '@/components/FunfactsSection';
import { DiscountBanner } from '@/components/DiscountBanner';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HeroCarousel />
      <VideoAdSection />
      <FunfactsSection />
      <DiscountBanner />
    </div>
  );
}
