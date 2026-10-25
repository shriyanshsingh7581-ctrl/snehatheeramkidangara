import { SITE_CONFIG } from '../config/siteConfig';

export interface SponsorshipEnquiryPayload {
  fullName: string;
  phone: string;
  occasion: string;
  preferredDate: string;
  sponsorshipType: string;
  prayerNote?: string;
  additionalMessage?: string;
}

export function formatDisplayDate(isoDate: string): string {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const [year, month, day] = parts.map(Number);
  const dateObj = new Date(year, month - 1, day);
  if (Number.isNaN(dateObj.getTime())) return isoDate;
  return dateObj.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getTodayIsoString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function validatePhoneNumber(input: string): boolean {
  const cleaned = input.replace(/[\s\-()]/g, '');
  // Supports Indian 10-digit numbers (with optional +91 or 0 prefix) as well as international numbers (8-15 digits)
  return /^(\+91|91|0)?[6-9]\d{9}$/.test(cleaned) || /^\+?[1-9]\d{7,14}$/.test(cleaned);
}

export function buildSponsorshipWhatsAppMessage(payload: SponsorshipEnquiryPayload): string {
  const lines = [
    `Namaskaram / Greetings to ${SITE_CONFIG.name},`,
    `I would like to submit a sponsorship / support enquiry:`,
    ``,
    `• Name: ${payload.fullName.trim()}`,
    `• Phone / WhatsApp: ${payload.phone.trim()}`,
    `• Occasion: ${payload.occasion}`,
    `• Preferred Date: ${formatDisplayDate(payload.preferredDate)} (${payload.preferredDate})`,
    `• Sponsorship / Meal Type: ${payload.sponsorshipType}`,
  ];

  if (payload.prayerNote && payload.prayerNote.trim()) {
    lines.push(`• Name of Person / Special Prayer Note: ${payload.prayerNote.trim()}`);
  }

  if (payload.additionalMessage && payload.additionalMessage.trim()) {
    lines.push(`• Additional Message: ${payload.additionalMessage.trim()}`);
  }

  lines.push(
    ``,
    `Please let me know the availability and verified details to proceed. Thank you.`
  );

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE_CONFIG.contact.whatsappNumberClean}?text=${encoded}`;
}
