import React, { useEffect } from 'react';
import { X, Landmark, MessageCircle, PhoneCall, Mail, ShieldAlert } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../lib/whatsapp';

interface BankDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BankDetailsModal: React.FC<BankDetailsModalProps> = ({ isOpen, onClose }) => {
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
    `Namaskaram, I would like to request the official Bank Transfer / UPI details for ${SITE_CONFIG.name} (${SITE_CONFIG.fullName}) to make a contribution.`
  );

  const { bankDetails } = SITE_CONFIG;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bank-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#183153]/70 p-0 backdrop-blur-xs sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-t-3xl border border-[#E7ECEB] bg-white p-6 shadow-xl sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#E7ECEB] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#183153] text-[#D8AD62]">
              <Landmark className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-wider text-[#159A91]">
                DIRECT SUPPORT &amp; CONTRIBUTIONS
              </p>
              <h2
                id="bank-modal-title"
                className="font-display text-lg font-bold text-[#183153] sm:text-xl"
              >
                Bank Transfer &amp; UPI Information
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-[#687780] transition-colors hover:bg-[#FAF8F2] hover:text-[#183153] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {bankDetails.isConfigured ? (
          <div className="mt-5 space-y-3 rounded-2xl border border-[#E7ECEB] bg-[#FAF8F2] p-4 text-sm">
            {bankDetails.accountName && (
              <div className="flex justify-between gap-2">
                <span className="text-[#687780]">Account Name:</span>
                <span className="font-semibold text-[#183153]">{bankDetails.accountName}</span>
              </div>
            )}
            {bankDetails.bankName && (
              <div className="flex justify-between gap-2">
                <span className="text-[#687780]">Bank:</span>
                <span className="font-semibold text-[#183153]">{bankDetails.bankName}</span>
              </div>
            )}
            {bankDetails.accountNumber && (
              <div className="flex justify-between gap-2">
                <span className="text-[#687780]">Account Number:</span>
                <span className="font-mono font-semibold text-[#183153] tabular-nums">
                  {bankDetails.accountNumber}
                </span>
              </div>
            )}
            {bankDetails.ifscCode && (
              <div className="flex justify-between gap-2">
                <span className="text-[#687780]">IFSC Code:</span>
                <span className="font-mono font-semibold text-[#183153]">
                  {bankDetails.ifscCode}
                </span>
              </div>
            )}
            {bankDetails.upiId && (
              <div className="flex justify-between gap-2">
                <span className="text-[#687780]">UPI ID:</span>
                <span className="font-mono font-semibold text-[#183153]">{bankDetails.upiId}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-[#D8AD62]/50 bg-[#FAF8F2] p-5">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#183153]" aria-hidden="true" />
              <div>
                <h3 className="font-display text-sm font-bold text-[#183153]">
                  Request Verified Bank / UPI Details Directly
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#263238]">
                  For your security and to ensure every contribution reaches{' '}
                  <strong>{SITE_CONFIG.shortReferenceName}</strong> safely, official Bank Account
                  and UPI transfer details are shared directly by the Sisters upon inquiry.
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-[#E7ECEB] pt-3 text-xs text-[#687780]">
              <p>
                <strong className="text-[#183153]">Primary Phone &amp; WhatsApp:</strong>{' '}
                <span className="tabular-nums">{SITE_CONFIG.contact.whatsappDisplay}</span>
              </p>
              <p>
                <strong className="text-[#183153]">Centre Landline:</strong>{' '}
                <span className="tabular-nums">{SITE_CONFIG.contact.landlineDisplay}</span>
              </p>
              <p>
                <strong className="text-[#183153]">Province Office:</strong>{' '}
                <span className="tabular-nums">{SITE_CONFIG.contact.provinceDisplay}</span>
              </p>
              <p>
                <strong className="text-[#183153]">Verified Email:</strong>{' '}
                {SITE_CONFIG.contact.email}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={bankEnquiryWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#128C7E] px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-[#0e7266] whitespace-nowrap shrink-0"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Request Bank Details on WhatsApp</span>
          </a>

          <a
            href={`tel:${SITE_CONFIG.contact.primaryPhoneTel}`}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[#183153] bg-white px-4 py-3 text-xs font-semibold text-[#183153] transition-colors hover:bg-[#FAF8F2] whitespace-nowrap shrink-0"
          >
            <PhoneCall className="h-4 w-4 shrink-0 text-[#159A91]" aria-hidden="true" />
            <span>Call {SITE_CONFIG.contact.whatsappDisplay}</span>
          </a>

          <a
            href={`mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(
              'Donation / Bank Details Inquiry — Snehatheeram Kidangara'
            )}`}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[#E7ECEB] bg-[#FAF8F2] px-4 py-3 text-xs font-semibold text-[#183153] transition-colors hover:bg-[#E7ECEB]/60 whitespace-nowrap shrink-0"
          >
            <Mail className="h-4 w-4 shrink-0 text-[#D8AD62]" aria-hidden="true" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  );
};
