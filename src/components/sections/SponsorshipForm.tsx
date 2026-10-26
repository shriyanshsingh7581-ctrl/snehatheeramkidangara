import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Landmark,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';
import {
  buildSponsorshipWhatsAppMessage,
  buildWhatsAppUrl,
  getTodayIsoString,
  validatePhoneNumber,
} from '../../lib/whatsapp';

interface SponsorshipFormProps {
  preselectedOccasion?: string | null;
  preselectedSponsorshipType?: string | null;
  onViewBankDetailsClick: () => void;
}

interface FormValues {
  fullName: string;
  phone: string;
  occasion: string;
  preferredDate: string;
  sponsorshipType: string;
  prayerNote: string;
  additionalMessage: string;
  consentChecked: boolean;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  occasion?: string;
  preferredDate?: string;
  sponsorshipType?: string;
  consentChecked?: string;
}

const DRAFT_STORAGE_KEY = 'snehatheeram_annadanam_form_draft_v2';

export const SponsorshipForm: React.FC<SponsorshipFormProps> = ({
  preselectedOccasion,
  preselectedSponsorshipType,
  onViewBankDetailsClick,
}) => {
  const minDate = getTodayIsoString();

  const [values, setValues] = useState<FormValues>(() => {
    const defaultState: FormValues = {
      fullName: '',
      phone: '',
      occasion: SITE_CONFIG.occasions[0],
      preferredDate: '',
      sponsorshipType: SITE_CONFIG.sponsorshipTypes[0],
      prayerNote: '',
      additionalMessage: '',
      consentChecked: true,
    };

    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultState, ...parsed };
      }
    } catch {
      // Ignore storage read issues
    }
    return defaultState;
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [preparedEnquiry, setPreparedEnquiry] = useState<{
    whatsappUrl: string;
    messageText: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedOccasion) {
      setValues((prev) => ({ ...prev, occasion: preselectedOccasion }));
      setPreparedEnquiry(null);
    }
  }, [preselectedOccasion]);

  useEffect(() => {
    if (preselectedSponsorshipType) {
      setValues((prev) => ({ ...prev, sponsorshipType: preselectedSponsorshipType }));
      setPreparedEnquiry(null);
    }
  }, [preselectedSponsorshipType]);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(values));
    } catch {
      // Ignore storage quota errors
    }
  }, [values]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const today = getTodayIsoString();

    if (!values.fullName.trim() || values.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    if (!values.phone.trim()) {
      nextErrors.phone = 'Please enter your phone or WhatsApp number.';
    } else if (!validatePhoneNumber(values.phone)) {
      nextErrors.phone =
        'Please enter a valid 10-digit Indian mobile number (e.g., 9400272087 or +91 9400272087).';
    }

    if (!values.occasion) {
      nextErrors.occasion = 'Please select an occasion.';
    }

    if (!values.preferredDate) {
      nextErrors.preferredDate = 'Please select your preferred date.';
    } else if (values.preferredDate < today) {
      nextErrors.preferredDate =
        'Preferred date cannot be in the past. Please choose today or a future date.';
    }

    if (!values.sponsorshipType) {
      nextErrors.sponsorshipType = 'Please select a sponsorship or meal type.';
    }

    if (!values.consentChecked) {
      nextErrors.consentChecked =
        'Please acknowledge that this form prepares a WhatsApp enquiry to be confirmed with the Sisters.';
    }

    return nextErrors;
  };

  const handleFieldChange = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setPreparedEnquiry(null);
      return;
    }

    setIsProcessing(true);
    setErrors({});

    const messageText = buildSponsorshipWhatsAppMessage({
      fullName: values.fullName,
      phone: values.phone,
      occasion: values.occasion,
      preferredDate: values.preferredDate,
      sponsorshipType: values.sponsorshipType,
      prayerNote: values.prayerNote,
      additionalMessage: values.additionalMessage,
    });

    const whatsappUrl = buildWhatsAppUrl(messageText);
    setPreparedEnquiry({ whatsappUrl, messageText });

    const tempAnchor = document.createElement('a');
    tempAnchor.href = whatsappUrl;
    tempAnchor.target = '_blank';
    tempAnchor.rel = 'noopener noreferrer';
    document.body.appendChild(tempAnchor);
    tempAnchor.click();
    document.body.removeChild(tempAnchor);

    setTimeout(() => {
      setIsProcessing(false);
    }, 400);
  };

  const handleCopyMessage = async () => {
    if (!preparedEnquiry) return;
    try {
      await navigator.clipboard.writeText(preparedEnquiry.messageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  const handleResetForm = () => {
    const resetState: FormValues = {
      fullName: '',
      phone: '',
      occasion: SITE_CONFIG.occasions[0],
      preferredDate: '',
      sponsorshipType: SITE_CONFIG.sponsorshipTypes[0],
      prayerNote: '',
      additionalMessage: '',
      consentChecked: true,
    };
    setValues(resetState);
    setErrors({});
    setPreparedEnquiry(null);
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <section id="annadanam-desk" className="scroll-mt-16 py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-6 shadow-xs sm:p-8 lg:p-10">
          {/* Header */}
          <div className="border-b border-[#E8F5E9] pb-6">
            <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
              ANNADANAM &amp; SUPPORT DESK
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#1B5E20] sm:text-3xl">
              Sponsor a Meal or Pledge Your Support
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#607D66] sm:text-base">
              Share your joy on special occasions or honor the memory of loved ones by feeding and
              supporting our residents at Snehatheeram. Fill out this quick form to send your
              booking inquiry directly via WhatsApp or view bank transfer details.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* 1. YOUR NAME * */}
              <div>
                <label
                  htmlFor="sponsor-full-name"
                  className="block text-xs font-bold tracking-wide text-[#1B5E20]"
                >
                  YOUR NAME <span className="text-[#2E7D32]">*</span>
                </label>
                <input
                  id="sponsor-full-name"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={values.fullName}
                  onChange={(e) => handleFieldChange('fullName', e.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'error-full-name' : undefined}
                  className={`mt-2 block min-h-[48px] w-full rounded-xl border bg-[#E8F5E9]/60 px-4 py-3 text-sm text-[#263238] placeholder-[#607D66] transition-colors focus:bg-white focus:outline-2 focus:outline-[#2E7D32] ${
                    errors.fullName ? 'border-red-600' : 'border-[#2E7D32]/25'
                  }`}
                />
                {errors.fullName && (
                  <p
                    id="error-full-name"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* 2. PHONE / WHATSAPP NUMBER * */}
              <div>
                <label
                  htmlFor="sponsor-phone"
                  className="block text-xs font-bold tracking-wide text-[#1B5E20]"
                >
                  PHONE / WHATSAPP NUMBER <span className="text-[#2E7D32]">*</span>
                </label>
                <input
                  id="sponsor-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="e.g. +91 9400272087"
                  value={values.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'error-phone' : undefined}
                  className={`mt-2 block min-h-[48px] w-full rounded-xl border bg-[#E8F5E9]/60 px-4 py-3 text-sm text-[#263238] placeholder-[#607D66] transition-colors focus:bg-white focus:outline-2 focus:outline-[#2E7D32] tabular-nums ${
                    errors.phone ? 'border-red-600' : 'border-[#2E7D32]/25'
                  }`}
                />
                {errors.phone && (
                  <p
                    id="error-phone"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* 3. SELECT OCCASION * */}
              <div>
                <label
                  htmlFor="sponsor-occasion"
                  className="block text-xs font-bold tracking-wide text-[#1B5E20]"
                >
                  SELECT OCCASION <span className="text-[#2E7D32]">*</span>
                </label>
                <select
                  id="sponsor-occasion"
                  name="occasion"
                  required
                  value={values.occasion}
                  onChange={(e) => handleFieldChange('occasion', e.target.value)}
                  aria-invalid={Boolean(errors.occasion)}
                  className="mt-2 block min-h-[48px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/60 px-4 py-3 text-sm text-[#263238] transition-colors focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
                >
                  {SITE_CONFIG.occasions.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
                {errors.occasion && (
                  <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.occasion}</span>
                  </p>
                )}
              </div>

              {/* 4. PREFERRED DATE * */}
              <div>
                <label
                  htmlFor="sponsor-date"
                  className="block text-xs font-bold tracking-wide text-[#1B5E20]"
                >
                  PREFERRED DATE <span className="text-[#2E7D32]">*</span>
                </label>
                <input
                  id="sponsor-date"
                  name="preferredDate"
                  type="date"
                  required
                  min={minDate}
                  value={values.preferredDate}
                  onChange={(e) => handleFieldChange('preferredDate', e.target.value)}
                  aria-invalid={Boolean(errors.preferredDate)}
                  aria-describedby={errors.preferredDate ? 'error-date' : undefined}
                  className={`mt-2 block min-h-[48px] w-full rounded-xl border bg-[#E8F5E9]/60 px-4 py-3 text-sm text-[#263238] transition-colors focus:bg-white focus:outline-2 focus:outline-[#2E7D32] tabular-nums ${
                    errors.preferredDate ? 'border-red-600' : 'border-[#2E7D32]/25'
                  }`}
                />
                {errors.preferredDate && (
                  <p
                    id="error-date"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.preferredDate}</span>
                  </p>
                )}
              </div>
            </div>

            {/* 5. SPONSORSHIP / MEAL TYPE * */}
            <div>
              <label
                htmlFor="sponsor-type"
                className="block text-xs font-bold tracking-wide text-[#1B5E20]"
              >
                SPONSORSHIP / MEAL TYPE <span className="text-[#2E7D32]">*</span>
              </label>
              <select
                id="sponsor-type"
                name="sponsorshipType"
                required
                value={values.sponsorshipType}
                onChange={(e) => handleFieldChange('sponsorshipType', e.target.value)}
                aria-invalid={Boolean(errors.sponsorshipType)}
                className="mt-2 block min-h-[48px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/60 px-4 py-3 text-sm text-[#263238] transition-colors focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
              >
                {SITE_CONFIG.sponsorshipTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* 6. NAME OF PERSON / SPECIAL PRAYER NOTE (OPTIONAL) */}
            <div>
              <label
                htmlFor="sponsor-prayer-note"
                className="block text-xs font-bold tracking-wide text-[#1B5E20]"
              >
                NAME OF PERSON / SPECIAL PRAYER NOTE{' '}
                <span className="font-normal text-[#607D66]">(OPTIONAL)</span>
              </label>
              <textarea
                id="sponsor-prayer-note"
                name="prayerNote"
                rows={2}
                placeholder="Share the name(s) of the person or family for whom special prayers should be offered..."
                value={values.prayerNote}
                onChange={(e) => handleFieldChange('prayerNote', e.target.value)}
                className="mt-2 block w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/60 px-4 py-3 text-sm text-[#263238] placeholder-[#607D66] transition-colors focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
              />
            </div>

            {/* 7. ADDITIONAL MESSAGE (OPTIONAL) */}
            <div>
              <label
                htmlFor="sponsor-message"
                className="block text-xs font-bold tracking-wide text-[#1B5E20]"
              >
                ADDITIONAL MESSAGE <span className="font-normal text-[#607D66]">(OPTIONAL)</span>
              </label>
              <textarea
                id="sponsor-message"
                name="additionalMessage"
                rows={2}
                placeholder="Any specific questions, visiting time preferences, or notes for the Sisters..."
                value={values.additionalMessage}
                onChange={(e) => handleFieldChange('additionalMessage', e.target.value)}
                className="mt-2 block w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/60 px-4 py-3 text-sm text-[#263238] placeholder-[#607D66] transition-colors focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
              />
            </div>

            {/* 8. Consent / Confirmation */}
            <div className="rounded-2xl border border-[#2E7D32]/20 bg-[#E8F5E9] p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={values.consentChecked}
                  onChange={(e) => handleFieldChange('consentChecked', e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-[#2E7D32] text-[#2E7D32] focus:ring-[#2E7D32]"
                />
                <span className="text-xs leading-relaxed text-[#263238]">
                  I understand that submitting this form prepares a booking inquiry on WhatsApp to{' '}
                  <strong className="font-semibold text-[#1B5E20]">
                    {SITE_CONFIG.name} ({SITE_CONFIG.contact.whatsappDisplay})
                  </strong>
                  , and is not an automatic confirmed booking or completed payment until I send the
                  message on WhatsApp and receive confirmation from the centre.
                </span>
              </label>
              {errors.consentChecked && (
                <p role="alert" className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-700">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.consentChecked}</span>
                </p>
              )}
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={isProcessing}
                className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2.5 rounded-2xl bg-[#2E7D32] px-6 py-3.5 text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#1B5E20] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E20] disabled:opacity-60 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {isProcessing ? 'Preparing WhatsApp Inquiry...' : 'Send Booking Inquiry on WhatsApp'}
                </span>
              </button>

              <button
                type="button"
                onClick={onViewBankDetailsClick}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-[#2E7D32] bg-white px-5 py-3.5 text-sm font-semibold text-[#1B5E20] transition-colors hover:bg-[#E8F5E9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E20] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Landmark className="h-4 w-4 shrink-0 text-[#43A047]" aria-hidden="true" />
                <span>View Bank Transfer Details</span>
              </button>
            </div>
          </form>

          {/* Prepared WhatsApp Enquiry Confirmation Panel */}
          {preparedEnquiry && (
            <div
              role="status"
              aria-live="polite"
              className="mt-6 rounded-2xl border border-[#2E7D32]/40 bg-[#E8F5E9] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#43A047]" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#1B5E20]">
                      Your WhatsApp Inquiry Message Is Ready
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#607D66]">
                      To complete your inquiry, please tap{' '}
                      <strong className="text-[#1B5E20]">Open WhatsApp &amp; Send</strong> below and
                      press Send inside WhatsApp to{' '}
                      <span className="font-semibold text-[#1B5E20] tabular-nums">
                        {SITE_CONFIG.contact.whatsappDisplay}
                      </span>
                      .
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetForm}
                  title="Clear form"
                  className="inline-flex min-h-[36px] items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#2E7D32] hover:bg-white hover:text-[#1B5E20] cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Clear</span>
                </button>
              </div>

              <pre className="mt-3 overflow-x-auto rounded-xl border border-[#2E7D32]/20 bg-white p-3.5 font-sans text-xs leading-relaxed whitespace-pre-wrap text-[#263238]">
                {preparedEnquiry.messageText}
              </pre>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href={preparedEnquiry.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#2E7D32] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#1B5E20] whitespace-nowrap shrink-0"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Open WhatsApp &amp; Send</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#2E7D32]/25 bg-white px-4 py-2.5 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-white/80 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#43A047]" aria-hidden="true" />
                      <span>Copied Inquiry Text</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#2E7D32]" aria-hidden="true" />
                      <span>Copy Inquiry Message</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
