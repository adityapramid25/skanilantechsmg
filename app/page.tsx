import { HeroCarousel } from '@/components/HeroCarousel';
import { DiscountSection } from '@/components/DiscountSection';
import { VideoAdSection } from '@/components/VideoAdSection';
import { FunfactsSection } from '@/components/FunfactsSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HeroCarousel />
      <DiscountSection />
      <VideoAdSection />
      <FunfactsSection />
    </div>
  );
}
