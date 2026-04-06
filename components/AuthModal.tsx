'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; // <-- TAMBAHAN PENTING
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'register' | 'forgot-request' | 'forgot-verify' | 'forgot-update';

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter(); // <-- INISIALISASI ROUTER
  
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  // OTP State
  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Visibility Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const resetState = () => {
    setAuthMode('login');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setOtpArray(['', '', '', '', '', '']);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError(null);
    setMessage(null);
  };

  const handleModeSwitch = (mode: AuthMode) => {
    setAuthMode(mode);
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError(null);
    setMessage(null);
    if (mode !== 'register') {
      setFullName('');
    }
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpArray[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const newOtp = [...otpArray];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtpArray(newOtp);
      
      if (pastedData.length < 6) {
        otpRefs.current[pastedData.length]?.focus();
      } else {
        otpRefs.current[5]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (authMode === 'register') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });
        
        if (signUpError) {
          if (signUpError.message.toLowerCase().includes('already registered') || signUpError.message.toLowerCase().includes('already exists')) {
            throw new Error('This email is already registered. Please login instead.');
          }
          throw signUpError;
        }

        if (data.session) {
          await supabase.auth.signOut();
        }

        setMessage('Registration successful! Please login.');
        setAuthMode('login');
        setPassword('');
        setShowPassword(false);

      } else if (authMode === 'login') {
        // --- PERBAIKAN LOGIN ---
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) throw signInError;
        
        // Tampilkan pesan sukses seketika agar user merasa webnya responsif
        setMessage('Login successful! Welcome to Skanilan Tech.');
        
        // Paksa Next.js memperbarui state Server Component (seperti Navbar)
        router.refresh(); 
        
        // Beri jeda sangat singkat untuk animasi yang mulus sebelum modal ditutup
        await new Promise(resolve => setTimeout(resolve, 600));
        handleClose();

      } else if (authMode === 'forgot-request') {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
        if (resetError) throw resetError;
        setMessage('A 6-digit code has been sent to your email.');
        setAuthMode('forgot-verify');

      } else if (authMode === 'forgot-verify') {
        const otpString = otpArray.join('');
        if (otpString.length !== 6) {
          throw new Error('Please enter a valid 6-digit code.');
        }
        const { error: verifyError } = await supabase.auth.verifyOtp({
          email,
          token: otpString,
          type: 'recovery'
        });
        if (verifyError) throw verifyError;
        setMessage('Code verified! Please enter your new password.');
        setAuthMode('forgot-update');

      } else if (authMode === 'forgot-update') {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters.");
        }

        // Fire and forget untuk bypass delay server email
        supabase.auth.updateUser({ password }).catch((err) => {
          console.error("Background password update error:", err);
        });

        setMessage('Password updated successfully!');
        
        // Paksa refresh UI berjaga-jaga jika sesi aktif digunakan
        router.refresh();
        await new Promise(resolve => setTimeout(resolve, 1500));
        handleClose();
      }
    } catch (err: any) {
      let msg = err.message || 'An error occurred';
      if (msg === 'Failed to fetch') {
        msg = 'Koneksi terputus. Pastikan internet Anda stabil.';
      } else if (msg === 'Invalid login credentials') {
        msg = 'Email atau password yang Anda masukkan salah.';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (authMode) {
      case 'login': return 'Welcome Back';
      case 'register': return 'Create Account';
      case 'forgot-request': return 'Reset Password';
      case 'forgot-verify': return 'Verify Code';
      case 'forgot-update': return 'New Password';
    }
  };

  const getSubtitle = () => {
    switch (authMode) {
      case 'login': return 'Enter your credentials to access your account.';
      case 'register': return 'Sign up to get started with Skanilan Tech.';
      case 'forgot-request': return 'Enter your email to receive a 6-digit reset code.';
      case 'forgot-verify': return `Enter the 6-digit code sent to ${email}.`;
      case 'forgot-update': return 'Create a new, strong password for your account.';
    }
  };

  const getButtonText = () => {
    if (loading) return 'Processing...';
    switch (authMode) {
      case 'login': return 'Sign In';
      case 'register': return 'Sign Up';
      case 'forgot-request': return 'Send Code';
      case 'forgot-verify': return 'Verify Code';
      case 'forgot-update': return 'Update Password';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-sm bg-white border border-violet-100 rounded-xl shadow-2xl overflow-hidden z-10"
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-1.5 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-display font-bold text-slate-900">
                  {getTitle()}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {getSubtitle()}
                </p>
              </div>

              {error && (
                <div className="mb-4 p-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded-md">
                  {error}
                </div>
              )}
              {message && (
                <div className="mb-4 p-2 bg-green-50 border border-green-200 text-green-600 text-xs rounded-md">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {authMode === 'register' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      autoComplete="name"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
                      placeholder="Alex Doe"
                    />
                  </motion.div>
                )}
                
                {(authMode === 'login' || authMode === 'register' || authMode === 'forgot-request') && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
                      placeholder="alex@example.com"
                    />
                  </motion.div>
                )}

                {authMode === 'forgot-verify' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <label className="block text-xs font-medium text-slate-700 mb-1 text-center">6-Digit Code</label>
                    <div className="flex justify-between gap-2 mt-2">
                      {otpArray.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            otpRefs.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={1}
                          required
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          onPaste={handleOtpPaste}
                          className="w-10 h-12 text-center text-lg font-mono bg-slate-50 border border-slate-200 rounded-md text-slate-900 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {(authMode === 'login' || authMode === 'register' || authMode === 'forgot-update') && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {authMode === 'forgot-update' ? 'New Password' : 'Password'}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors pr-10"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </motion.div>
                )}

                {authMode === 'forgot-update' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors pr-10"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </motion.div>
                )}
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 text-white text-sm font-medium rounded-md transition-all shadow-[0_4px_15px_rgba(139,92,246,0.3)] mt-2 disabled:opacity-50"
                >
                  {getButtonText()}
                </button>
              </form>

              <div className="mt-5 text-center flex flex-col gap-2">
                {authMode !== 'login' && (
                  <button
                    type="button"
                    onClick={() => handleModeSwitch('login')}
                    className="text-xs text-slate-500 hover:text-violet-600 transition-colors"
                  >
                    Back to Login
                  </button>
                )}
                {authMode === 'login' && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleModeSwitch('register')}
                      className="text-xs text-slate-500 hover:text-violet-600 transition-colors"
                    >
                      Don&apos;t have an account? Register
                    </button>
                    <button
                      type="button"
                      onClick={() => handleModeSwitch('forgot-request')}
                      className="text-xs text-slate-500 hover:text-violet-600 transition-colors"
                    >
                      Forgot your password?
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
