import type { Metadata } from 'next';
import { Contact } from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Skanilan Tech for your next digital project. We are ready to help businesses in Semarang and beyond.',
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <Contact />
    </div>
  );
}
