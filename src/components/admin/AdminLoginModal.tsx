import React, { useState } from 'react';
import { X, Lock, ShieldCheck, AlertCircle, ArrowRight, KeyRound } from 'lucide-react';
import { auth, googleProvider } from '../../lib/firebase';
import { signInWithPopup } from 'firebase/auth';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated,
}) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (!isOpen) return null;

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Authorized administrative passcodes
    const validCodes = ['sneha2026', 'admin123', 'snehatheeram'];
    if (validCodes.includes(passcode.trim().toLowerCase())) {
      setError(null);
      localStorage.setItem('snehatheeram_admin_authenticated', 'true');
      onAuthenticated();
      onClose();
    } else {
      setError('Incorrect Admin Passcode. Please check and try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        localStorage.setItem('snehatheeram_admin_authenticated', 'true');
        onAuthenticated();
        onClose();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign-in could not be completed.';
      setError(
        msg.includes('popup-blocked')
          ? 'Popup was blocked by your browser. Please use the Passcode option below.'
          : msg
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-login-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B5E20]/75 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl border border-[#2E7D32]/25 bg-white p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#E8F5E9] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1B5E20] text-white">
              <Lock className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
                AUTHORIZED ACCESS ONLY
              </p>
              <h2
                id="admin-login-title"
                className="font-display text-lg font-bold text-[#1B5E20] sm:text-xl"
              >
                Admin Control Portal
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl text-[#607D66] hover:bg-[#E8F5E9] hover:text-[#1B5E20] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-[#607D66]">
          Manage website photos via Cloudinary, edit real-time text content via Firebase, and track
          all Annadanam &amp; donor inquiries in real time.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {/* Option 1: Quick Admin Passcode */}
        <form onSubmit={handlePasscodeSubmit} className="mt-5 space-y-3">
          <div>
            <label
              htmlFor="admin-passcode"
              className="flex items-center gap-1.5 text-xs font-bold text-[#1B5E20]"
            >
              <KeyRound className="h-3.5 w-3.5 text-[#2E7D32]" />
              <span>Admin Passcode</span>
            </label>
            <input
              id="admin-passcode"
              type="password"
              placeholder="Enter admin passcode (e.g. sneha2026)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
              className="mt-1.5 block min-h-[48px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/60 px-4 py-3 text-sm text-[#263238] placeholder-[#607D66] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
            />
          </div>

          <button
            type="submit"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#2E7D32] px-5 py-3 text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#1B5E20] cursor-pointer"
          >
            <span>Unlock Admin Portal</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E8F5E9]" />
          </div>
          <span className="relative bg-white px-3 text-[11px] font-semibold text-[#607D66]">
            OR GOOGLE SIGN-IN
          </span>
        </div>

        {/* Option 2: Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isSigningIn}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl border border-[#2E7D32]/30 bg-[#E8F5E9] px-4 py-3 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-[#2E7D32] hover:text-white disabled:opacity-60 cursor-pointer"
        >
          <ShieldCheck className="h-4 w-4 text-[#43A047]" />
          <span>{isSigningIn ? 'Connecting to Google...' : 'Sign In with Authorized Google Account'}</span>
        </button>
      </div>
    </div>
  );
};
