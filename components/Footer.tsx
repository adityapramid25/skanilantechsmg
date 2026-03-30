import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-600 py-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image 
                src="https://ik.imagekit.io/skanilantech/Web%20Component/logo_skanilantech?updatedAt=1774763237161" 
                alt="Skanilan Tech Logo" 
                width={36} 
                height={36} 
                className="object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" 
              />
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Skanilan Tech
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs">
              Empowering the future through innovative technology solutions in IoT, Web Development, Mobile Apps, Photography, and Gamification.
            </p>
          </div>
          <div>
            <h3 className="text-slate-900 font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-violet-600 transition-colors">Beranda</Link></li>
              <li><Link href="/about" className="hover:text-violet-600 transition-colors">About</Link></li>
              <li><Link href="/product" className="hover:text-violet-600 transition-colors">Product</Link></li>
              <li><Link href="/contact" className="hover:text-violet-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-900 font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-violet-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-violet-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 text-sm text-center text-slate-500">
          &copy; {new Date().getFullYear()} Skanilan Tech. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
