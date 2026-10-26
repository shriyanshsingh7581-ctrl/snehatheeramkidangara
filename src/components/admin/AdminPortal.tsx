import React, { useState, useEffect } from 'react';
import {
  UploadCloud,
  FileText,
  HeartHandshake,
  Settings,
  Check,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  Trash2,
  Download,
  RotateCcw,
  Search,
  Filter,
  Loader2,
  Copy,
  CheckCircle2,
  Lock,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  LogOut,
  Link2,
} from 'lucide-react';
import { SITE_CONFIG, DEFAULT_IMAGES, SiteImagesConfig } from '../../config/siteConfig';
import {
  auth,
  googleProvider,
  saveSiteContent,
  saveSitePhotos,
  subscribeToSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
  StoredSiteContent,
  StoredSitePhotos,
  StoredSubmission,
} from '../../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { uploadImageToCloudinary, CLOUDINARY_CONFIG } from '../../lib/cloudinary';

interface AdminPortalProps {
  currentImages: SiteImagesConfig;
  currentContentOverrides: StoredSiteContent | null;
}

type TabType = 'photos' | 'content' | 'submissions' | 'cloud-info';

export const AdminPortal: React.FC<AdminPortalProps> = ({
  currentImages,
  currentContentOverrides,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('snehatheeram_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  // Login State
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [activeTab, setActiveTab] = useState<TabType>('photos');
  const [copiedLinkType, setCopiedLinkType] = useState<'website' | 'admin' | null>(null);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const publicWebsiteUrl = `${origin}/`;
  const adminPanelUrl = `${origin}/admin`;

  // --- PHOTO MANAGEMENT STATE ---
  const [photoDraft, setPhotoDraft] = useState<Record<string, string>>({
    heroSanctuary: currentImages.heroSanctuary.url,
    everyMotherLove: currentImages.everyMotherLove.url,
    kuttanadCampus: currentImages.kuttanadCampus.url,
    psychosocialRehab: currentImages.psychosocialRehab.url,
    mentalHealthCounselling: currentImages.mentalHealthCounselling.url,
    vocationalTraining: currentImages.vocationalTraining.url,
    medicalNursing: currentImages.medicalNursing.url,
    clinicalCheckup: currentImages.clinicalCheckup.url,
    recreationalActivities: currentImages.recreationalActivities.url,
    sustainabilityKitchen: currentImages.sustainabilityKitchen.url,
    nutritiousMeals: currentImages.nutritiousMeals.url,
    spiritualSupport: currentImages.spiritualSupport.url,
  });

  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [photoSaveSuccess, setPhotoSaveSuccess] = useState(false);
  const [photoSaveError, setPhotoSaveError] = useState<string | null>(null);

  // --- CONTENT EDITING STATE ---
  const [contentDraft, setContentDraft] = useState<StoredSiteContent>({
    name: currentContentOverrides?.name || SITE_CONFIG.name,
    fullName: currentContentOverrides?.fullName || SITE_CONFIG.fullName,
    tagline: currentContentOverrides?.tagline || SITE_CONFIG.tagline,
    description: currentContentOverrides?.description || SITE_CONFIG.description,
    mentalHealthHeading:
      currentContentOverrides?.mentalHealthHeading || SITE_CONFIG.mentalHealthIntro.heading,
    mentalHealthLead:
      currentContentOverrides?.mentalHealthLead || SITE_CONFIG.mentalHealthIntro.lead,
    mentalHealthBody:
      currentContentOverrides?.mentalHealthBody || SITE_CONFIG.mentalHealthIntro.body,
    mission: currentContentOverrides?.mission || SITE_CONFIG.mission,
    vision: currentContentOverrides?.vision || SITE_CONFIG.vision,
    primaryPhone: currentContentOverrides?.primaryPhone || SITE_CONFIG.contact.whatsappDisplay,
    secondaryPhone:
      currentContentOverrides?.secondaryPhone || SITE_CONFIG.contact.secondaryPhoneDisplay,
    landline: currentContentOverrides?.landline || SITE_CONFIG.contact.landlineDisplay,
    email: currentContentOverrides?.email || SITE_CONFIG.contact.email,
    addressLines:
      currentContentOverrides?.addressLines || SITE_CONFIG.location.addressLines.join('\n'),
    landmark: currentContentOverrides?.landmark || SITE_CONFIG.location.landmark,
    bankAccountName:
      currentContentOverrides?.bankAccountName || SITE_CONFIG.bankDetails.accountName || '',
    bankName: currentContentOverrides?.bankName || SITE_CONFIG.bankDetails.bankName || '',
    bankAccountNumber:
      currentContentOverrides?.bankAccountNumber || SITE_CONFIG.bankDetails.accountNumber || '',
    bankIfsc: currentContentOverrides?.bankIfsc || SITE_CONFIG.bankDetails.ifscCode || '',
    bankUpiId: currentContentOverrides?.bankUpiId || SITE_CONFIG.bankDetails.upiId || '',
    bankIsConfigured:
      currentContentOverrides?.bankIsConfigured !== undefined
        ? currentContentOverrides.bankIsConfigured
        : SITE_CONFIG.bankDetails.isConfigured,
    bibleVerse: currentContentOverrides?.bibleVerse || SITE_CONFIG.bibleQuotation.verse,
    bibleReference:
      currentContentOverrides?.bibleReference || SITE_CONFIG.bibleQuotation.reference,
    visitingHoursSchedule:
      currentContentOverrides?.visitingHoursSchedule || SITE_CONFIG.visitingHours.schedule,
  });

  const [contentSaveSuccess, setContentSaveSuccess] = useState(false);
  const [contentSaveError, setContentSaveError] = useState<string | null>(null);
  const [isSavingContent, setIsSavingContent] = useState(false);

  // --- SUBMISSIONS STATE ---
  const [submissions, setSubmissions] = useState<StoredSubmission[]>([]);
  const [submissionSearch, setSubmissionSearch] = useState('');
  const [submissionFilter, setSubmissionFilter] = useState<string>('all');
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);

  // Cloudinary quick test state
  const [testUploadUrl, setTestUploadUrl] = useState<string | null>(null);
  const [testUploading, setTestUploading] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testUploadError, setTestUploadError] = useState<string | null>(null);

  // Sync props when Firebase updates arrive
  useEffect(() => {
    setPhotoDraft({
      heroSanctuary: currentImages.heroSanctuary.url,
      everyMotherLove: currentImages.everyMotherLove.url,
      kuttanadCampus: currentImages.kuttanadCampus.url,
      psychosocialRehab: currentImages.psychosocialRehab.url,
      mentalHealthCounselling: currentImages.mentalHealthCounselling.url,
      vocationalTraining: currentImages.vocationalTraining.url,
      medicalNursing: currentImages.medicalNursing.url,
      clinicalCheckup: currentImages.clinicalCheckup.url,
      recreationalActivities: currentImages.recreationalActivities.url,
      sustainabilityKitchen: currentImages.sustainabilityKitchen.url,
      nutritiousMeals: currentImages.nutritiousMeals.url,
      spiritualSupport: currentImages.spiritualSupport.url,
    });
  }, [currentImages]);

  useEffect(() => {
    if (currentContentOverrides) {
      setContentDraft((prev) => ({
        ...prev,
        ...currentContentOverrides,
      }));
    }
  }, [currentContentOverrides]);

  // Subscribe to real-time submissions when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    setLoadingSubmissions(true);
    const unsubscribe = subscribeToSubmissions(
      (items) => {
        setSubmissions(items);
        setLoadingSubmissions(false);
      },
      () => {
        setLoadingSubmissions(false);
      }
    );
    return () => unsubscribe();
  }, [isAuthenticated]);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validCodes = ['sneha2026', 'admin123', 'snehatheeram'];
    if (validCodes.includes(passcode.trim().toLowerCase())) {
      setLoginError(null);
      localStorage.setItem('snehatheeram_admin_authenticated', 'true');
      setIsAuthenticated(true);
    } else {
      setLoginError('Incorrect Admin Passcode. Use sneha2026 or admin123.');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setLoginError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        localStorage.setItem('snehatheeram_admin_authenticated', 'true');
        setIsAuthenticated(true);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign-in could not be completed.';
      setLoginError(
        msg.includes('popup-blocked')
          ? 'Popup was blocked by your browser. Please use the Passcode below.'
          : msg
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('snehatheeram_admin_authenticated');
    setIsAuthenticated(false);
    try {
      await signOut(auth);
    } catch {
      // Ignore
    }
  };

  const handleCopyUrl = async (type: 'website' | 'admin', url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLinkType(type);
      setTimeout(() => setCopiedLinkType(null), 2500);
    } catch {
      // Ignore
    }
  };

  // ============================================================================
  // STANDALONE ADMIN LOGIN SCREEN (Shown at /admin when not logged in)
  // ============================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8F5E9] p-4 text-[#263238]">
        <div className="w-full max-w-md rounded-3xl border border-[#2E7D32]/25 bg-white p-6 shadow-xl sm:p-8">
          <div className="flex items-center gap-3 border-b border-[#E8F5E9] pb-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1B5E20] text-white">
              <Lock className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
                STANDALONE ADMIN PORTAL (/admin)
              </p>
              <h1 className="font-display text-xl font-bold text-[#1B5E20]">
                Snehatheeram Admin Login
              </h1>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-[#607D66]">
            This is the separate administrative link for <strong>{SITE_CONFIG.name}</strong>. Sign
            in below to manage Cloudinary photos, website texts, and live donation inquiries.
          </p>

          {loginError && (
            <div
              role="alert"
              className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" aria-hidden="true" />
              <span>{loginError}</span>
            </div>
          )}

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
                placeholder="Enter passcode (sneha2026 or admin123)"
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
              <span>Login to Admin Panel</span>
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

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSigningIn}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl border border-[#2E7D32]/30 bg-[#E8F5E9] px-4 py-3 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-[#2E7D32] hover:text-white disabled:opacity-60 cursor-pointer"
          >
            <ShieldCheck className="h-4 w-4 text-[#43A047]" />
            <span>{isSigningIn ? 'Connecting to Google...' : 'Sign In with Google Account'}</span>
          </button>

          <div className="mt-6 border-t border-[#E8F5E9] pt-4 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2E7D32] hover:text-[#1B5E20] hover:underline"
            >
              <span>Open Public Website (/)</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 12 Photo slot descriptions
  const PHOTO_SLOTS = [
    {
      key: 'heroSanctuary',
      label: 'Hero Section Main Photo',
      description: 'Outdoor group photo in front of Snehatheeram Rehabilitation Centre',
      defaultUrl: DEFAULT_IMAGES.heroSanctuary.url,
    },
    {
      key: 'everyMotherLove',
      label: 'About Us / Mental Health Intro Photo',
      description: 'Indoor group photo beneath the inauguration plaque and centre sign',
      defaultUrl: DEFAULT_IMAGES.everyMotherLove.url,
    },
    {
      key: 'kuttanadCampus',
      label: 'Facilities & Wheelchair Accommodation',
      description: 'Sister assisting an elderly resident in a wheelchair in the clean corridor',
      defaultUrl: DEFAULT_IMAGES.kuttanadCampus.url,
    },
    {
      key: 'psychosocialRehab',
      label: 'Psychosocial Rehabilitation',
      description: 'Group interaction and psychosocial therapy session in the hall',
      defaultUrl: DEFAULT_IMAGES.psychosocialRehab.url,
    },
    {
      key: 'mentalHealthCounselling',
      label: 'Mental Health Support & Counselling',
      description: 'Individual assessment and counselling session with a resident',
      defaultUrl: DEFAULT_IMAGES.mentalHealthCounselling.url,
    },
    {
      key: 'vocationalTraining',
      label: 'Vocational Training & Life Skills',
      description: 'Residents making beaded rosaries and handicrafts by hand',
      defaultUrl: DEFAULT_IMAGES.vocationalTraining.url,
    },
    {
      key: 'medicalNursing',
      label: 'Medical Care',
      description: 'Clinical blood pressure check-up and medical supervision',
      defaultUrl: DEFAULT_IMAGES.medicalNursing.url,
    },
    {
      key: 'clinicalCheckup',
      label: 'Health & Safety Monitoring',
      description: 'Routine vital-signs check-up with stethoscope and sphygmomanometer',
      defaultUrl: DEFAULT_IMAGES.clinicalCheckup.url,
    },
    {
      key: 'recreationalActivities',
      label: 'Recreational & Cultural Activities',
      description: 'Residents clapping, singing, and dancing together in joy',
      defaultUrl: DEFAULT_IMAGES.recreationalActivities.url,
    },
    {
      key: 'sustainabilityKitchen',
      label: 'Organic Farming & Kitchen Skills',
      description: 'Sister and residents preparing fresh local vegetables together',
      defaultUrl: DEFAULT_IMAGES.sustainabilityKitchen.url,
    },
    {
      key: 'nutritiousMeals',
      label: 'Nutritious Diet & Annadanam',
      description: 'Residents enjoying freshly prepared meals in the dining hall',
      defaultUrl: DEFAULT_IMAGES.nutritiousMeals.url,
    },
    {
      key: 'spiritualSupport',
      label: 'Life at Snehatheeram & Prayer Offering',
      description: 'Priest, Sister, and residents gathered in prayer before meals',
      defaultUrl: DEFAULT_IMAGES.spiritualSupport.url,
    },
  ];

  // Cloudinary image upload handler for a specific slot
  const handleFileUpload = async (slotKey: string, file: File) => {
    setUploadingSlot(slotKey);
    setUploadProgress((prev) => ({ ...prev, [slotKey]: 10 }));
    setPhotoSaveError(null);

    try {
      const secureUrl = await uploadImageToCloudinary(file, (percent) => {
        setUploadProgress((prev) => ({ ...prev, [slotKey]: percent }));
      });

      const updatedDraft = { ...photoDraft, [slotKey]: secureUrl };
      setPhotoDraft(updatedDraft);

      await saveSitePhotos(updatedDraft as StoredSitePhotos);
      setPhotoSaveSuccess(true);
      setTimeout(() => setPhotoSaveSuccess(false), 3000);
    } catch (err: unknown) {
      setPhotoSaveError(
        err instanceof Error
          ? err.message
          : 'Could not upload image to Cloudinary. Please try again.'
      );
    } finally {
      setUploadingSlot(null);
      setUploadProgress((prev) => ({ ...prev, [slotKey]: 0 }));
    }
  };

  const handleSaveAllPhotos = async () => {
    setPhotoSaveError(null);
    try {
      await saveSitePhotos(photoDraft as StoredSitePhotos);
      setPhotoSaveSuccess(true);
      setTimeout(() => setPhotoSaveSuccess(false), 3000);
    } catch (err: unknown) {
      setPhotoSaveError(
        err instanceof Error ? err.message : 'Failed to save photos to Firebase database.'
      );
    }
  };

  const handleResetSlot = async (slotKey: string, defaultUrl: string) => {
    const updated = { ...photoDraft, [slotKey]: defaultUrl };
    setPhotoDraft(updated);
    try {
      await saveSitePhotos(updated as StoredSitePhotos);
      setPhotoSaveSuccess(true);
      setTimeout(() => setPhotoSaveSuccess(false), 2000);
    } catch {
      // Ignore
    }
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingContent(true);
    setContentSaveError(null);
    try {
      await saveSiteContent(contentDraft);
      setContentSaveSuccess(true);
      setTimeout(() => setContentSaveSuccess(false), 3500);
    } catch (err: unknown) {
      setContentSaveError(
        err instanceof Error ? err.message : 'Failed to save content to Firebase.'
      );
    } finally {
      setIsSavingContent(false);
    }
  };

  const handleTestUpload = async (file: File) => {
    setTestUploading(true);
    setTestProgress(10);
    setTestUploadError(null);
    try {
      const url = await uploadImageToCloudinary(file, (p) => setTestProgress(p));
      setTestUploadUrl(url);
    } catch (err) {
      setTestUploadError(err instanceof Error ? err.message : 'Upload test failed');
    } finally {
      setTestUploading(false);
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesFilter = submissionFilter === 'all' || sub.status === submissionFilter;
    const q = submissionSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      sub.fullName.toLowerCase().includes(q) ||
      sub.phone.includes(q) ||
      sub.occasion.toLowerCase().includes(q) ||
      sub.sponsorshipType.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const handleExportCSV = () => {
    if (submissions.length === 0) return;
    const headers = [
      'ID',
      'Date Submitted',
      'Full Name',
      'Phone',
      'Occasion',
      'Preferred Date',
      'Sponsorship Type',
      'Prayer Note',
      'Additional Message',
      'Status',
    ];
    const rows = submissions.map((s) => [
      `"${s.id}"`,
      `"${s.createdAt}"`,
      `"${s.fullName.replace(/"/g, '""')}"`,
      `"${s.phone}"`,
      `"${s.occasion}"`,
      `"${s.preferredDate}"`,
      `"${s.sponsorshipType}"`,
      `"${(s.prayerNote || '').replace(/"/g, '""')}"`,
      `"${(s.additionalMessage || '').replace(/"/g, '""')}"`,
      `"${s.status}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `snehatheeram_submissions_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E8F5E9] text-[#263238]">
      {/* TOP ADMIN HEADER BAR */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#2E7D32]/25 bg-[#1B5E20] px-4 text-white sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2E7D32] text-white">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-base font-bold sm:text-lg">
                Snehatheeram Admin Control Panel
              </h1>
              <span className="hidden rounded-md bg-[#43A047] px-2 py-0.5 text-[10px] font-bold text-white sm:inline">
                Standalone /admin Link
              </span>
            </div>
            <p className="text-xs text-[#E8F5E9]/80">
              Cloud: <code className="font-mono text-white">{CLOUDINARY_CONFIG.cloudName}</code> · Preset:{' '}
              <code className="font-mono text-white">{CLOUDINARY_CONFIG.uploadPreset}</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-[#1B5E20] shadow-xs transition-colors hover:bg-[#E8F5E9]"
          >
            <span>Open Public Website</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#2E7D32]" />
          </a>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-white/25 bg-[#2E7D32] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-700 cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* SEPARATE LINKS BAR (2 DISTINCT LINKS FOR WEBSITE & ADMIN PANEL) */}
      <div className="border-b border-[#2E7D32]/20 bg-[#E8F5E9] px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 font-bold text-[#1B5E20]">
              <Link2 className="h-3.5 w-3.5 text-[#2E7D32]" />
              <span>1. Public Website Link:</span>
            </span>
            <code className="rounded-lg border border-[#2E7D32]/20 bg-white px-2.5 py-1 font-mono text-[11px] text-[#2E7D32]">
              {publicWebsiteUrl}
            </code>
            <button
              type="button"
              onClick={() => handleCopyUrl('website', publicWebsiteUrl)}
              className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-[#1B5E20] border border-[#2E7D32]/25 hover:bg-[#2E7D32] hover:text-white cursor-pointer"
            >
              {copiedLinkType === 'website' ? (
                <>
                  <Check className="h-3 w-3 text-[#43A047]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 font-bold text-[#1B5E20]">
              <Lock className="h-3.5 w-3.5 text-[#2E7D32]" />
              <span>2. Separate Admin Panel Link:</span>
            </span>
            <code className="rounded-lg border border-[#2E7D32]/20 bg-white px-2.5 py-1 font-mono text-[11px] text-[#1B5E20] font-bold">
              {adminPanelUrl}
            </code>
            <button
              type="button"
              onClick={() => handleCopyUrl('admin', adminPanelUrl)}
              className="inline-flex items-center gap-1 rounded-lg bg-[#2E7D32] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#1B5E20] cursor-pointer"
            >
              {copiedLinkType === 'admin' ? (
                <>
                  <Check className="h-3 w-3 text-[#E8F5E9]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy Admin Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* TAB NAVIGATION BAR */}
      <div className="border-b border-[#2E7D32]/20 bg-white px-4 sm:px-6 lg:px-8 overflow-x-auto">
        <div className="mx-auto flex max-w-7xl gap-2 py-2">
          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-[#2E7D32] text-white'
                : 'text-[#607D66] hover:bg-[#E8F5E9] hover:text-[#1B5E20]'
            }`}
          >
            <UploadCloud className="h-4 w-4" />
            <span>Cloudinary Photos (12 Sections)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'content'
                ? 'bg-[#2E7D32] text-white'
                : 'text-[#607D66] hover:bg-[#E8F5E9] hover:text-[#1B5E20]'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Website Content &amp; Texts</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('submissions')}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'submissions'
                ? 'bg-[#2E7D32] text-white'
                : 'text-[#607D66] hover:bg-[#E8F5E9] hover:text-[#1B5E20]'
            }`}
          >
            <HeartHandshake className="h-4 w-4" />
            <span>Donations &amp; Inquiries</span>
            {submissions.length > 0 && (
              <span className="rounded-full bg-[#1B5E20] px-2 py-0.5 text-[10px] text-white">
                {submissions.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cloud-info')}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'cloud-info'
                ? 'bg-[#2E7D32] text-white'
                : 'text-[#607D66] hover:bg-[#E8F5E9] hover:text-[#1B5E20]'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>Links &amp; Cloud Status</span>
          </button>
        </div>
      </div>

      {/* TAB BODY */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* ============================================================== */}
          {/* TAB 1: CLOUDINARY PHOTO MANAGEMENT */}
          {/* ============================================================== */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#2E7D32]/25 bg-white p-6 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-display text-lg font-bold text-[#1B5E20] sm:text-xl">
                    Cloudinary Website Photo Manager
                  </h2>
                  <p className="mt-1 text-xs text-[#607D66]">
                    Upload new photos directly to Cloudinary (<strong>{CLOUDINARY_CONFIG.cloudName}</strong> /{' '}
                    <strong>{CLOUDINARY_CONFIG.uploadPreset}</strong>). Uploaded URLs are automatically saved to
                    Firebase and immediately update the public website (<a href="/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#2E7D32] underline">/</a>).
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleSaveAllPhotos}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#2E7D32] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#1B5E20] cursor-pointer"
                  >
                    <Check className="h-4 w-4" />
                    <span>Sync All to Firebase</span>
                  </button>
                </div>
              </div>

              {photoSaveSuccess && (
                <div className="flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 p-4 text-xs font-medium text-green-800">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <span>Photos updated and saved to Firebase! The live website is updated.</span>
                </div>
              )}

              {photoSaveError && (
                <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800">
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                  <span>{photoSaveError}</span>
                </div>
              )}

              {/* 12 Photo Slots Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {PHOTO_SLOTS.map((slot) => {
                  const currentUrl = photoDraft[slot.key] || slot.defaultUrl;
                  const isUploadingThis = uploadingSlot === slot.key;
                  const progress = uploadProgress[slot.key] || 0;

                  return (
                    <div
                      key={slot.key}
                      className="flex flex-col justify-between rounded-3xl border border-[#2E7D32]/20 bg-white p-5 shadow-2xs transition-shadow hover:shadow-xs"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold tracking-wider text-[#2E7D32]">
                              SECTION PHOTO
                            </span>
                            <h3 className="font-display text-sm font-bold text-[#1B5E20]">
                              {slot.label}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleResetSlot(slot.key, slot.defaultUrl)}
                            title="Reset to default client photo"
                            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] text-[#607D66] hover:bg-[#E8F5E9] hover:text-[#1B5E20] cursor-pointer"
                          >
                            <RotateCcw className="h-3 w-3" />
                            <span>Reset</span>
                          </button>
                        </div>

                        <p className="mt-1 text-[11px] leading-relaxed text-[#607D66]">
                          {slot.description}
                        </p>

                        {/* Image Preview Box */}
                        <div className="relative mt-3 aspect-video w-full overflow-hidden rounded-2xl border border-[#2E7D32]/20 bg-[#1B5E20]">
                          <img
                            src={currentUrl}
                            alt={slot.label}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = slot.defaultUrl;
                            }}
                          />
                          {isUploadingThis && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-4 text-white">
                              <Loader2 className="h-6 w-6 animate-spin text-[#43A047]" />
                              <span className="mt-2 text-xs font-bold">Uploading {progress}%</span>
                              <div className="mt-2 h-1.5 w-full max-w-[120px] rounded-full bg-white/30 overflow-hidden">
                                <div
                                  className="h-full bg-[#43A047] transition-all duration-150"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {/* File Upload to Cloudinary */}
                        <div>
                          <label className="block text-[11px] font-bold text-[#1B5E20]">
                            Upload from Device to Cloudinary:
                          </label>
                          <label className="mt-1 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#2E7D32] bg-[#E8F5E9]/60 px-3 py-2 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-[#E8F5E9] cursor-pointer">
                            <UploadCloud className="h-4 w-4 text-[#2E7D32]" />
                            <span>Choose &amp; Upload New Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={isUploadingThis}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(slot.key, file);
                              }}
                            />
                          </label>
                        </div>

                        {/* Manual URL Input */}
                        <div>
                          <label className="block text-[11px] font-medium text-[#607D66]">
                            Or Paste Direct Image / Cloudinary URL:
                          </label>
                          <input
                            type="text"
                            value={photoDraft[slot.key] || ''}
                            onChange={(e) =>
                              setPhotoDraft((prev) => ({ ...prev, [slot.key]: e.target.value }))
                            }
                            placeholder="https://res.cloudinary.com/..."
                            className="mt-1 block min-h-[38px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/40 px-3 py-1.5 font-mono text-[11px] text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: WEBSITE CONTENT & TEXT EDITOR */}
          {/* ============================================================== */}
          {activeTab === 'content' && (
            <form onSubmit={handleSaveContent} className="space-y-6">
              <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#2E7D32]/25 bg-white p-6 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-display text-lg font-bold text-[#1B5E20] sm:text-xl">
                    Website Content &amp; Text Editor
                  </h2>
                  <p className="mt-1 text-xs text-[#607D66]">
                    Change any text, contact numbers, address, or bank details on the website.
                    Changes are saved to Firebase and instantly visible on the public website.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSavingContent}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#2E7D32] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#1B5E20] disabled:opacity-60 cursor-pointer"
                >
                  {isSavingContent ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Save All Content to Firebase</span>
                    </>
                  )}
                </button>
              </div>

              {contentSaveSuccess && (
                <div className="flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 p-4 text-xs font-medium text-green-800">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <span>Website content successfully updated in Firebase! Live site refreshed.</span>
                </div>
              )}

              {contentSaveError && (
                <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800">
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                  <span>{contentSaveError}</span>
                </div>
              )}

              {/* Section 1: Organization Identification */}
              <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-6">
                <h3 className="font-display text-base font-bold text-[#1B5E20]">
                  1. Organization Identity &amp; Tagline
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={contentDraft.name || ''}
                      onChange={(e) => setContentDraft({ ...contentDraft, name: e.target.value })}
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">
                      Full Institutional Name
                    </label>
                    <input
                      type="text"
                      value={contentDraft.fullName || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, fullName: e.target.value })
                      }
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#1B5E20]">Tagline</label>
                    <input
                      type="text"
                      value={contentDraft.tagline || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, tagline: e.target.value })
                      }
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#1B5E20]">
                      Organization Description
                    </label>
                    <textarea
                      rows={3}
                      value={contentDraft.description || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, description: e.target.value })
                      }
                      className="mt-1.5 block w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Mental Health Introduction */}
              <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-6">
                <h3 className="font-display text-base font-bold text-[#1B5E20]">
                  2. Introduction to Mental Health
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">Section Heading</label>
                    <input
                      type="text"
                      value={contentDraft.mentalHealthHeading || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, mentalHealthHeading: e.target.value })
                      }
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">
                      Lead Paragraph
                    </label>
                    <textarea
                      rows={2}
                      value={contentDraft.mentalHealthLead || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, mentalHealthLead: e.target.value })
                      }
                      className="mt-1.5 block w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">
                      Detailed Body Text
                    </label>
                    <textarea
                      rows={4}
                      value={contentDraft.mentalHealthBody || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, mentalHealthBody: e.target.value })
                      }
                      className="mt-1.5 block w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Mission, Vision & Bible Verse */}
              <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-6">
                <h3 className="font-display text-base font-bold text-[#1B5E20]">
                  3. Mission, Vision &amp; Scripture Quotation
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">Mission Statement</label>
                    <textarea
                      rows={3}
                      value={contentDraft.mission || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, mission: e.target.value })
                      }
                      className="mt-1.5 block w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">Vision Statement</label>
                    <textarea
                      rows={3}
                      value={contentDraft.vision || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, vision: e.target.value })
                      }
                      className="mt-1.5 block w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">Bible Quotation Verse</label>
                    <input
                      type="text"
                      value={contentDraft.bibleVerse || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, bibleVerse: e.target.value })
                      }
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">Scripture Reference</label>
                    <input
                      type="text"
                      value={contentDraft.bibleReference || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, bibleReference: e.target.value })
                      }
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Contact Details & Location */}
              <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-6">
                <h3 className="font-display text-base font-bold text-[#1B5E20]">
                  4. Contact Details &amp; Address
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">
                      Primary &amp; WhatsApp Phone
                    </label>
                    <input
                      type="text"
                      value={contentDraft.primaryPhone || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, primaryPhone: e.target.value })
                      }
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">
                      Centre Phone Number
                    </label>
                    <input
                      type="text"
                      value={contentDraft.secondaryPhone || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, secondaryPhone: e.target.value })
                      }
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">
                      Landline Number
                    </label>
                    <input
                      type="text"
                      value={contentDraft.landline || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, landline: e.target.value })
                      }
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#1B5E20]">
                      Official Email
                    </label>
                    <input
                      type="email"
                      value={contentDraft.email || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, email: e.target.value })
                      }
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">
                      Landmark / Road
                    </label>
                    <input
                      type="text"
                      value={contentDraft.landmark || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, landmark: e.target.value })
                      }
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-[#1B5E20]">
                      Postal Address Lines (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={contentDraft.addressLines || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, addressLines: e.target.value })
                      }
                      className="mt-1.5 block w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 5: Bank & UPI Information */}
              <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-[#1B5E20]">
                    5. Verified Bank &amp; UPI Details
                  </h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={contentDraft.bankIsConfigured || false}
                      onChange={(e) =>
                        setContentDraft({
                          ...contentDraft,
                          bankIsConfigured: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-[#2E7D32] text-[#2E7D32]"
                    />
                    <span className="text-xs font-semibold text-[#1B5E20]">
                      Display Bank Details Publicly
                    </span>
                  </label>
                </div>

                <p className="mt-1 text-xs text-[#607D66]">
                  When enabled, donors can view the verified bank account number and UPI ID
                  directly in the donation modal.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">Account Name</label>
                    <input
                      type="text"
                      value={contentDraft.bankAccountName || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, bankAccountName: e.target.value })
                      }
                      placeholder="e.g. Pope John XXIII Care Centre"
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">Bank Name</label>
                    <input
                      type="text"
                      value={contentDraft.bankName || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, bankName: e.target.value })
                      }
                      placeholder="e.g. State Bank of India / South Indian Bank"
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">Account Number</label>
                    <input
                      type="text"
                      value={contentDraft.bankAccountNumber || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, bankAccountNumber: e.target.value })
                      }
                      placeholder="Account Number"
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 font-mono text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">IFSC Code</label>
                    <input
                      type="text"
                      value={contentDraft.bankIfsc || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, bankIfsc: e.target.value })
                      }
                      placeholder="IFSC Code"
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 font-mono text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B5E20]">UPI ID</label>
                    <input
                      type="text"
                      value={contentDraft.bankUpiId || ''}
                      onChange={(e) =>
                        setContentDraft({ ...contentDraft, bankUpiId: e.target.value })
                      }
                      placeholder="e.g. snehatheeram@sbi"
                      className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3.5 py-2 font-mono text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSavingContent}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-[#2E7D32] px-8 py-3 text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#1B5E20] disabled:opacity-60 cursor-pointer"
                >
                  {isSavingContent ? 'Saving Changes...' : 'Save All Changes to Firebase'}
                </button>
              </div>
            </form>
          )}

          {/* ============================================================== */}
          {/* TAB 3: DONATION & SPONSORSHIP SUBMISSIONS (LIVE TRACKING) */}
          {/* ============================================================== */}
          {activeTab === 'submissions' && (
            <div className="space-y-6">
              <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#2E7D32]/25 bg-white p-6 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-display text-lg font-bold text-[#1B5E20] sm:text-xl">
                    Annadanam &amp; Donation Inquiries
                  </h2>
                  <p className="mt-1 text-xs text-[#607D66]">
                    Every time a donor submits a meal booking or donation form on the public website,
                    it is recorded in Firebase here in real time.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    disabled={submissions.length === 0}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-[#2E7D32] bg-white px-4 py-2 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-[#E8F5E9] disabled:opacity-40 cursor-pointer"
                  >
                    <Download className="h-4 w-4 text-[#2E7D32]" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col gap-3 rounded-2xl border border-[#2E7D32]/20 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#607D66]" />
                  <input
                    type="text"
                    placeholder="Search by donor name, phone, occasion, or meal type..."
                    value={submissionSearch}
                    onChange={(e) => setSubmissionSearch(e.target.value)}
                    className="block min-h-[40px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 pl-9 pr-3 text-xs text-[#263238] focus:bg-white focus:outline-[#2E7D32]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-[#2E7D32]" />
                  <select
                    value={submissionFilter}
                    onChange={(e) => setSubmissionFilter(e.target.value)}
                    className="min-h-[40px] rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-3 py-1.5 text-xs font-medium text-[#1B5E20] focus:bg-white"
                  >
                    <option value="all">All Inquiries ({submissions.length})</option>
                    <option value="new">
                      New ({submissions.filter((s) => s.status === 'new').length})
                    </option>
                    <option value="contacted">
                      Contacted ({submissions.filter((s) => s.status === 'contacted').length})
                    </option>
                    <option value="confirmed">
                      Confirmed ({submissions.filter((s) => s.status === 'confirmed').length})
                    </option>
                    <option value="archived">
                      Archived ({submissions.filter((s) => s.status === 'archived').length})
                    </option>
                  </select>
                </div>
              </div>

              {/* Submissions List */}
              {loadingSubmissions ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-[#2E7D32]" />
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-12 text-center">
                  <HeartHandshake className="mx-auto h-12 w-12 text-[#2E7D32]/40" />
                  <h3 className="font-display mt-3 text-base font-bold text-[#1B5E20]">
                    No inquiries found
                  </h3>
                  <p className="mt-1 text-xs text-[#607D66]">
                    When visitors fill the Annadanam or Donation form on the public website, their
                    details will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSubmissions.map((sub) => {
                    const cleanPhone = sub.phone.replace(/[\s\-+]/g, '');
                    const donorWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                      `Namaskaram ${sub.fullName}, thank you for contacting ${SITE_CONFIG.name} regarding your inquiry for ${sub.sponsorshipType} on ${sub.preferredDate}.`
                    )}`;

                    return (
                      <div
                        key={sub.id}
                        className="flex flex-col justify-between rounded-3xl border border-[#2E7D32]/20 bg-white p-6 shadow-2xs sm:flex-row sm:items-start sm:gap-6"
                      >
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-base font-bold text-[#1B5E20]">
                              {sub.fullName}
                            </h3>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                                sub.status === 'new'
                                  ? 'bg-amber-100 text-amber-800'
                                  : sub.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : sub.status === 'contacted'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {sub.status}
                            </span>
                            <span className="text-[11px] text-[#607D66]">
                              · Submitted on {new Date(sub.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2 lg:grid-cols-4 pt-1">
                            <div>
                              <span className="font-semibold text-[#607D66]">Phone: </span>
                              <span className="font-mono text-[#1B5E20]">{sub.phone}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-[#607D66]">Occasion: </span>
                              <span className="text-[#1B5E20]">{sub.occasion}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-[#607D66]">Date: </span>
                              <span className="font-mono text-[#1B5E20]">{sub.preferredDate}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-[#607D66]">Type: </span>
                              <span className="font-semibold text-[#2E7D32]">
                                {sub.sponsorshipType}
                              </span>
                            </div>
                          </div>

                          {sub.prayerNote && (
                            <div className="rounded-xl border border-[#2E7D32]/15 bg-[#E8F5E9]/60 p-3 text-xs">
                              <span className="font-bold text-[#1B5E20]">Prayer Intention: </span>
                              <span className="text-[#263238]">{sub.prayerNote}</span>
                            </div>
                          )}

                          {sub.additionalMessage && (
                            <div className="rounded-xl border border-[#2E7D32]/15 bg-[#E8F5E9]/40 p-3 text-xs">
                              <span className="font-bold text-[#1B5E20]">Donor Note: </span>
                              <span className="text-[#263238]">{sub.additionalMessage}</span>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#E8F5E9] pt-3 sm:mt-0 sm:border-0 sm:pt-0 shrink-0">
                          <select
                            value={sub.status}
                            onChange={(e) =>
                              updateSubmissionStatus(
                                sub.id,
                                e.target.value as StoredSubmission['status']
                              )
                            }
                            className="min-h-[38px] rounded-xl border border-[#2E7D32]/30 bg-[#E8F5E9] px-2.5 py-1.5 text-xs font-semibold text-[#1B5E20]"
                          >
                            <option value="new">Mark as New</option>
                            <option value="contacted">Mark as Contacted</option>
                            <option value="confirmed">Mark as Confirmed</option>
                            <option value="archived">Mark as Archived</option>
                          </select>

                          <a
                            href={donorWhatsAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl bg-[#2E7D32] px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#1B5E20] cursor-pointer"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>WhatsApp Donor</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => {
                              deleteSubmission(sub.id);
                            }}
                            className="inline-flex min-h-[38px] items-center justify-center rounded-xl p-2 text-red-600 hover:bg-red-50 cursor-pointer"
                            title="Delete submission"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: SEPARATE LINKS & CLOUDINARY / FIREBASE STATUS */}
          {/* ============================================================== */}
          {activeTab === 'cloud-info' && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-[#2E7D32]/25 bg-white p-6 sm:p-8">
                <h2 className="font-display text-lg font-bold text-[#1B5E20] sm:text-xl">
                  Separate Website &amp; Admin Links + Cloud Status
                </h2>
                <p className="mt-1 text-xs text-[#607D66]">
                  Your public website and Admin Control Panel run on two separate URLs so visitors
                  only see the public website while you control everything from <code>/admin</code>.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="rounded-2xl border border-[#2E7D32]/20 bg-[#E8F5E9]/60 p-5">
                    <div className="flex items-center gap-2">
                      <UploadCloud className="h-5 w-5 text-[#2E7D32]" />
                      <h3 className="font-display text-sm font-bold text-[#1B5E20]">
                        Cloudinary Configuration
                      </h3>
                    </div>
                    <div className="mt-3 space-y-2 text-xs">
                      <div>
                        <span className="font-semibold text-[#607D66]">Cloud Name: </span>
                        <code className="font-mono font-bold text-[#1B5E20]">
                          {CLOUDINARY_CONFIG.cloudName}
                        </code>
                      </div>
                      <div>
                        <span className="font-semibold text-[#607D66]">Upload Preset: </span>
                        <code className="font-mono font-bold text-[#1B5E20]">
                          {CLOUDINARY_CONFIG.uploadPreset}
                        </code>
                      </div>
                      <div>
                        <span className="font-semibold text-[#607D66]">Upload Endpoint: </span>
                        <code className="block mt-0.5 break-all font-mono text-[11px] text-[#2E7D32]">
                          {CLOUDINARY_CONFIG.uploadEndpoint}
                        </code>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#2E7D32]/20 bg-[#E8F5E9]/60 p-5">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-[#2E7D32]" />
                      <h3 className="font-display text-sm font-bold text-[#1B5E20]">
                        Firebase Database Status
                      </h3>
                    </div>
                    <div className="mt-3 space-y-2 text-xs">
                      <div>
                        <span className="font-semibold text-[#607D66]">Database: </span>
                        <span className="font-bold text-[#1B5E20]">Cloud Firestore (Enterprise)</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#607D66]">Rules Status: </span>
                        <span className="rounded-md bg-green-100 px-2 py-0.5 font-bold text-green-800">
                          Active &amp; Deployed
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#607D66]">Real-time Collections: </span>
                        <code className="font-mono text-[#2E7D32]">/settings</code> &amp;{' '}
                        <code className="font-mono text-[#2E7D32]">/submissions</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cloudinary Quick Upload Test Box */}
                <div className="mt-8 rounded-2xl border border-dashed border-[#2E7D32] bg-[#E8F5E9]/40 p-6 text-center">
                  <UploadCloud className="mx-auto h-8 w-8 text-[#2E7D32]" />
                  <h4 className="font-display mt-2 text-sm font-bold text-[#1B5E20]">
                    Test Cloudinary Image Upload
                  </h4>
                  <p className="mt-1 text-xs text-[#607D66]">
                    Select any image to test direct unsigned upload to your Cloudinary preset.
                  </p>

                  <label className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#2E7D32] px-6 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#1B5E20] cursor-pointer">
                    <UploadCloud className="h-4 w-4" />
                    <span>{testUploading ? `Uploading ${testProgress}%...` : 'Select File to Test'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={testUploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleTestUpload(file);
                      }}
                    />
                  </label>

                  {testUploadError && (
                    <p className="mt-3 text-xs font-medium text-red-700">{testUploadError}</p>
                  )}

                  {testUploadUrl && (
                    <div className="mt-4 rounded-xl border border-green-200 bg-white p-4 text-left">
                      <p className="text-xs font-bold text-green-700">
                        Upload Successful! Cloudinary CDN Link:
                      </p>
                      <a
                        href={testUploadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 break-all font-mono text-xs text-[#2E7D32] hover:underline"
                      >
                        <span>{testUploadUrl}</span>
                        <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
