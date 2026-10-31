import React, { useEffect } from 'react';
import { X, Landmark, MessageCircle, PhoneCall, Mail, ShieldAlert } from 'lucide-react';
import { useLiveConfig } from '../hooks/useLiveSiteData';
import { buildWhatsAppUrl } from '../lib/whatsapp';

interface BankDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BankDetailsModal: React.FC<BankDetailsModalProps> = ({ isOpen, onClose }) => {
  const live = useLiveConfig();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const bankEnquiryWhatsAppUrl = buildWhatsAppUrl(
    `Namaskaram, I would like to request the official Bank Transfer / UPI details for ${live.name} (${live.fullName}) to make a contribution.`
  );

  const { bankDetails } = live;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bank-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#1B5E20]/70 p-0 backdrop-blur-xs sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-t-3xl border border-[#2E7D32]/25 bg-white p-6 shadow-xl sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#E8F5E9] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1B5E20] text-white">
              <Landmark className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
                DIRECT SUPPORT &amp; CONTRIBUTIONS
              </p>
              <h2
                id="bank-modal-title"
                className="font-display text-lg font-bold text-[#1B5E20] sm:text-xl"
              >
                Bank Transfer &amp; UPI Information
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-[#607D66] transition-colors hover:bg-[#E8F5E9] hover:text-[#1B5E20] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {bankDetails.isConfigured ? (
          <div className="mt-5 space-y-3 rounded-2xl border border-[#2E7D32]/20 bg-[#E8F5E9] p-4 text-sm">
            {bankDetails.accountName && (
              <div className="flex justify-between gap-2">
                <span className="text-[#607D66]">Account Name:</span>
                <span className="font-semibold text-[#1B5E20]">{bankDetails.accountName}</span>
              </div>
            )}
            {bankDetails.bankName && (
              <div className="flex justify-between gap-2">
                <span className="text-[#607D66]">Bank:</span>
                <span className="font-semibold text-[#1B5E20]">{bankDetails.bankName}</span>
              </div>
            )}
            {bankDetails.accountNumber && (
              <div className="flex justify-between gap-2">
                <span className="text-[#607D66]">Account Number:</span>
                <span className="font-mono font-semibold text-[#1B5E20] tabular-nums">
                  {bankDetails.accountNumber}
                </span>
              </div>
            )}
            {bankDetails.ifscCode && (
              <div className="flex justify-between gap-2">
                <span className="text-[#607D66]">IFSC Code:</span>
                <span className="font-mono font-semibold text-[#1B5E20]">
                  {bankDetails.ifscCode}
                </span>
              </div>
            )}
            {bankDetails.upiId && (
              <div className="flex justify-between gap-2">
                <span className="text-[#607D66]">UPI ID:</span>
                <span className="font-mono font-semibold text-[#1B5E20]">{bankDetails.upiId}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-[#2E7D32]/30 bg-[#E8F5E9] p-5">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#2E7D32]" aria-hidden="true" />
              <div>
                <h3 className="font-display text-sm font-bold text-[#1B5E20]">
                  Request Verified Bank / UPI Details Directly
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#263238]">
                  For your security and to ensure every contribution reaches{' '}
                  <strong className="text-[#1B5E20]">{live.shortReferenceName}</strong>{' '}
                  safely, official Bank Account and UPI transfer details are shared directly by the
                  Sisters upon inquiry.
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-[#2E7D32]/20 pt-3 text-xs text-[#263238]">
              <p>
                <strong className="text-[#1B5E20]">Organization:</strong>{' '}
                {live.name}
              </p>
              <p>
                <strong className="text-[#1B5E20]">Phone Numbers:</strong>{' '}
                <a href="tel:+919400272087" className="font-semibold text-[#1B5E20] tabular-nums hover:underline">
                  +91 9400272087
                </a>
                {', '}
                <a href="tel:+917511133810" className="font-semibold text-[#1B5E20] tabular-nums hover:underline">
                  +91 7511133810
                </a>
              </p>
              <p>
                <strong className="text-[#1B5E20]">Email:</strong>{' '}
                <a
                  href="mailto:kidangarasnehatheeram@gmail.com"
                  className="font-semibold text-[#1B5E20] hover:underline"
                >
                  kidangarasnehatheeram@gmail.com
                </a>
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={bankEnquiryWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#2E7D32] px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-[#1B5E20] whitespace-nowrap shrink-0"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Request Bank Details on WhatsApp</span>
          </a>

          <a
            href={`tel:${live.primaryPhoneTel}`}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[#2E7D32] bg-white px-4 py-3 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-[#E8F5E9] whitespace-nowrap shrink-0"
          >
            <PhoneCall className="h-4 w-4 shrink-0 text-[#43A047]" aria-hidden="true" />
            <span>Call {live.primaryPhone}</span>
          </a>

          <a
            href={`mailto:${live.email}?subject=${encodeURIComponent(
              'Donation / Bank Details Inquiry — Snehatheeram Kidangara'
            )}`}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9] px-4 py-3 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-[#43A047] hover:text-white whitespace-nowrap shrink-0"
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  );
};
