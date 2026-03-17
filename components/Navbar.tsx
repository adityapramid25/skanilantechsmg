'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User, LogOut, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { AuthModal } from './AuthModal';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchProfile = async (currentUser: any) => {
    if (currentUser?.user_metadata?.full_name) {
      setProfileName(currentUser.user_metadata.full_name);
      setIsLoadingProfile(false);
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', currentUser.id)
        .single();
      
      if (!error && data?.full_name) {
        setProfileName(data.full_name);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoadingProfile(true);
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user);
      } else {
        setIsLoadingProfile(false);
      }
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setIsLoadingProfile(true);
        await fetchProfile(session.user);
      } else {
        setProfileName(null);
        setIsLoadingProfile(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Product', href: '/product' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogout = async () => {
    setUser(null);
    setProfileName(null);
    await supabase.auth.signOut();
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-violet-100 shadow-[0_4px_30px_rgba(139,92,246,0.1)]'
            : 'bg-white/50 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center w-[200px]">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  S
                </div>
                <span className={`font-bold text-lg tracking-tight ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
                  Skanilan Tech
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-center space-x-6 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-all hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-violet-600 hover:to-blue-600 ${
                    pathname === link.href
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600'
                      : 'text-slate-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center justify-end gap-3 w-[200px]">
              {isLoadingProfile ? (
                <div className="flex items-center gap-3">
                  <div className="h-4 w-24 bg-slate-200 animate-pulse rounded"></div>
                </div>
              ) : user ? (
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium flex items-center gap-1.5 ${isScrolled ? 'text-slate-700' : 'text-slate-900'}`}>
                    <User className="w-4 h-4 text-violet-600 flex-shrink-0" />
                    <span className="max-w-[150px] truncate block" title={profileName || user?.email || ''}>
                      {profileName || user?.email?.split('@')[0] || ''}
                    </span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-white text-slate-600 hover:bg-slate-50 hover:text-violet-600 transition-all border border-slate-200"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-1.5 rounded-md text-sm font-medium bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:opacity-90 transition-all shadow-[0_4px_15px_rgba(139,92,246,0.3)]"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center justify-end w-[200px]">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 rounded-md text-slate-600 hover:text-violet-600"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-violet-100 overflow-hidden shadow-lg"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === link.href
                        ? 'bg-violet-50 text-violet-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-violet-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 pb-2 border-t border-slate-100 mt-2">
                  {isLoadingProfile ? (
                    <div className="flex items-center justify-between px-3 py-2">
                      <div className="h-4 w-32 bg-slate-200 animate-pulse rounded"></div>
                    </div>
                  ) : user ? (
                    <div className="flex items-center justify-between px-3">
                      <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <User className="w-4 h-4 text-violet-600 flex-shrink-0" />
                        <span className="max-w-[150px] truncate block" title={profileName || user?.email || ''}>
                          {profileName || user?.email?.split('@')[0] || ''}
                        </span>
                      </span>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-xs font-medium text-slate-500 hover:text-violet-600 flex items-center gap-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-center px-3 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:opacity-90"
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
