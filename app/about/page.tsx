import type { Metadata } from 'next';
import { About } from '@/components/About';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Skanilan Tech, a student-led technology agency from SMKN 9 Semarang dedicated to innovative digital solutions.',
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <About />
    </div>
  );
}
