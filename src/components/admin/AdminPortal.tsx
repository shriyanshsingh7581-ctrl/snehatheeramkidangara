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
  Loader2,
  Copy,
  CheckCircle2,
  Lock,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  LogOut,
  Link2,
  PhoneCall,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
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
type PhotoCategory = 'all' | 'hero-about' | 'rehab-medical' | 'daily-life';
type ContentSectionTab = 'all' | 'identity' | 'mental-health' | 'mission' | 'contact' | 'bank';

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

  // Navigation & Mobile Filter State
  const [activeTab, setActiveTab] = useState<TabType>('photos');
  const [photoCategory, setPhotoCategory] = useState<PhotoCategory>('all');
  const [contentSection, setContentSection] = useState<ContentSectionTab>('identity');
  const [expandedUrlSlot, setExpandedUrlSlot] = useState<string | null>(null);
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
  // MOBILE-FIRST ADMIN LOGIN SCREEN (Shown at /admin when not logged in)
  // ============================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#E8F5E9] px-4 py-6 text-[#263238] sm:justify-center sm:p-6">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-[#2E7D32]/20 bg-white p-6 shadow-lg sm:p-8">
          <div className="flex items-center gap-3.5 border-b border-[#E8F5E9] pb-4">
            <img
              src={currentImages.logoUrl || '/assets/aistudio/logo_extracted_f3521143.png'}
              alt="Snehatheeram Logo"
              referrerPolicy="no-referrer"
              className="h-12 w-12 shrink-0 rounded-full border border-[#2E7D32]/20 object-contain"
            />
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#2E7D32]">
                Admin Control App · /admin
              </p>
              <h1 className="font-display text-lg font-bold tracking-tight text-[#1B5E20] truncate sm:text-xl">
                Snehatheeram Admin
              </h1>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-[#607D66]">
            Sign in from your phone or computer to upload Cloudinary photos, edit live website text,
            and manage donor inquiries.
          </p>

          {loginError && (
            <div
              role="alert"
              className="mt-4 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-800"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" aria-hidden="true" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handlePasscodeSubmit} className="mt-5 space-y-4">
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
                placeholder="Enter passcode (sneha2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/60 px-4 py-3 text-base text-[#263238] placeholder-[#607D66] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
              />
            </div>

            <button
              type="submit"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-[#2E7D32] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-transform active:scale-[0.98] hover:bg-[#1B5E20] cursor-pointer whitespace-nowrap"
            >
              <span>Unlock Admin App</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="relative my-5 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8F5E9]" />
            </div>
            <span className="relative bg-white px-3 text-xs font-medium text-[#607D66]">
              Or sign in with Google
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSigningIn}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-2xl border border-[#2E7D32]/30 bg-[#E8F5E9] px-4 py-3 text-xs font-bold text-[#1B5E20] transition-colors hover:bg-[#2E7D32] hover:text-white disabled:opacity-60 cursor-pointer whitespace-nowrap"
          >
            <ShieldCheck className="h-4 w-4 text-[#2E7D32]" />
            <span>{isSigningIn ? 'Connecting...' : 'Continue with Google Account'}</span>
          </button>

          <div className="mt-6 border-t border-[#E8F5E9] pt-4 text-center">
            <a
              href="/"
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 text-xs font-bold text-[#2E7D32] hover:text-[#1B5E20] hover:underline"
            >
              <span>Go to Public Website (/)</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 12 Photo slot descriptions with mobile category tags
  const PHOTO_SLOTS: Array<{
    key: string;
    number: string;
    label: string;
    category: PhotoCategory;
    description: string;
    defaultUrl: string;
  }> = [
    {
      key: 'heroSanctuary',
      number: '01',
      label: 'Hero Banner Photo',
      category: 'hero-about',
      description: 'Main outdoor group photo in front of Snehatheeram Centre',
      defaultUrl: DEFAULT_IMAGES.heroSanctuary.url,
    },
    {
      key: 'everyMotherLove',
      number: '02',
      label: 'About Us & History Photo',
      category: 'hero-about',
      description: 'Group photo beneath the inauguration plaque and centre board',
      defaultUrl: DEFAULT_IMAGES.everyMotherLove.url,
    },
    {
      key: 'kuttanadCampus',
      number: '03',
      label: 'Facilities & Accommodation',
      category: 'hero-about',
      description: 'Sister assisting an elderly mother in a wheelchair in the corridor',
      defaultUrl: DEFAULT_IMAGES.kuttanadCampus.url,
    },
    {
      key: 'psychosocialRehab',
      number: '04',
      label: 'Psychosocial Rehabilitation',
      category: 'rehab-medical',
      description: 'Group psychosocial therapy and interaction session in the hall',
      defaultUrl: DEFAULT_IMAGES.psychosocialRehab.url,
    },
    {
      key: 'mentalHealthCounselling',
      number: '05',
      label: 'Mental Health Counselling',
      category: 'rehab-medical',
      description: 'One-on-one psychological assessment and counselling session',
      defaultUrl: DEFAULT_IMAGES.mentalHealthCounselling.url,
    },
    {
      key: 'vocationalTraining',
      number: '06',
      label: 'Vocational & Craft Training',
      category: 'rehab-medical',
      description: 'Residents making beaded rosaries and handicrafts by hand',
      defaultUrl: DEFAULT_IMAGES.vocationalTraining.url,
    },
    {
      key: 'medicalNursing',
      number: '07',
      label: 'Medical & Psychiatric Care',
      category: 'rehab-medical',
      description: 'Clinical blood pressure check-up and nursing care',
      defaultUrl: DEFAULT_IMAGES.medicalNursing.url,
    },
    {
      key: 'clinicalCheckup',
      number: '08',
      label: 'Health & Safety Monitoring',
      category: 'rehab-medical',
      description: 'Routine vital-signs check-up with stethoscope',
      defaultUrl: DEFAULT_IMAGES.clinicalCheckup.url,
    },
    {
      key: 'recreationalActivities',
      number: '09',
      label: 'Recreational & Cultural Life',
      category: 'daily-life',
      description: 'Residents clapping, singing, and dancing together',
      defaultUrl: DEFAULT_IMAGES.recreationalActivities.url,
    },
    {
      key: 'sustainabilityKitchen',
      number: '10',
      label: 'Organic Farming & Kitchen',
      category: 'daily-life',
      description: 'Sister and residents preparing fresh local vegetables together',
      defaultUrl: DEFAULT_IMAGES.sustainabilityKitchen.url,
    },
    {
      key: 'nutritiousMeals',
      number: '11',
      label: 'Nutritious Diet & Annadanam',
      category: 'daily-life',
      description: 'Residents enjoying freshly prepared meals in the dining hall',
      defaultUrl: DEFAULT_IMAGES.nutritiousMeals.url,
    },
    {
      key: 'spiritualSupport',
      number: '12',
      label: 'Daily Routine & Prayer Life',
      category: 'daily-life',
      description: 'Priest, Sister, and residents gathered in prayer before meals',
      defaultUrl: DEFAULT_IMAGES.spiritualSupport.url,
    },
  ];

  const visiblePhotoSlots =
    photoCategory === 'all'
      ? PHOTO_SLOTS
      : PHOTO_SLOTS.filter((slot) => slot.category === photoCategory);

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

  const newInquiriesCount = submissions.filter((s) => s.status === 'new').length;

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
      {/* ==================================================================== */}
      {/* PATTERN 2: COMPACT MOBILE TOP APP BAR (56px height, 3-Zone Contract) */}
      {/* ==================================================================== */}
      <header className="sticky top-0 z-30 border-b border-[#2E7D32]/20 bg-[#1B5E20] text-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Brand Avatar + Single-line Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={currentImages.logoUrl || '/assets/aistudio/logo_extracted_f3521143.png'}
              alt="Snehatheeram Logo"
              referrerPolicy="no-referrer"
              className="h-9 w-9 shrink-0 rounded-full bg-white p-0.5 object-contain"
            />
            <span className="font-display text-sm font-bold tracking-tight text-white truncate sm:text-base">
              Snehatheeram Admin
            </span>
          </div>

          {/* Zone 2: Desktop Navigation Tabs (Hidden on mobile where Bottom Tab Bar is used) */}
          <nav
            aria-label="Admin Sections"
            className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#E8F5E9]/85"
          >
            <button
              type="button"
              onClick={() => setActiveTab('photos')}
              className={`py-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'photos'
                  ? 'text-white underline underline-offset-8'
                  : 'hover:text-white'
              }`}
            >
              Photos (12)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('content')}
              className={`py-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'content'
                  ? 'text-white underline underline-offset-8'
                  : 'hover:text-white'
              }`}
            >
              Website Text
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('submissions')}
              className={`py-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'submissions'
                  ? 'text-white underline underline-offset-8'
                  : 'hover:text-white'
              }`}
            >
              Inquiries ({submissions.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cloud-info')}
              className={`py-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'cloud-info'
                  ? 'text-white underline underline-offset-8'
                  : 'hover:text-white'
              }`}
            >
              Links &amp; Cloud
            </button>
          </nav>

          {/* Zone 3: Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-[#1B5E20] transition-colors hover:bg-[#E8F5E9] whitespace-nowrap shrink-0"
            >
              <span>Live Site</span>
              <ExternalLink className="h-3.5 w-3.5 text-[#2E7D32]" />
            </a>

            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center gap-1.5 rounded-xl border border-white/25 bg-[#2E7D32] px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-700 cursor-pointer whitespace-nowrap shrink-0"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* SCROLLABLE MAIN WORKSPACE (Leaves 85%+ viewport open on mobile)      */}
      {/* ==================================================================== */}
      <main className="flex-1 px-4 pt-4 pb-28 sm:px-6 lg:px-8 md:pb-12">
        <div className="mx-auto max-w-7xl space-y-5">
          {/* MOBILE-FIRST 2x2 / 4-COLUMN SUMMARY METRIC STRIP */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <button
              type="button"
              onClick={() => setActiveTab('photos')}
              className={`flex flex-col justify-between rounded-2xl border p-3.5 text-left transition-colors cursor-pointer ${
                activeTab === 'photos'
                  ? 'border-[#2E7D32] bg-white shadow-xs'
                  : 'border-[#2E7D32]/15 bg-white/80 hover:bg-white'
              }`}
            >
              <span className="text-xs font-medium text-[#607D66]">Website Photos</span>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="font-display text-xl font-bold tabular-nums text-[#1B5E20] sm:text-2xl">
                  12
                </span>
                <span className="text-[11px] font-medium text-[#2E7D32]">Cloudinary</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('content')}
              className={`flex flex-col justify-between rounded-2xl border p-3.5 text-left transition-colors cursor-pointer ${
                activeTab === 'content'
                  ? 'border-[#2E7D32] bg-white shadow-xs'
                  : 'border-[#2E7D32]/15 bg-white/80 hover:bg-white'
              }`}
            >
              <span className="text-xs font-medium text-[#607D66]">Live Text Sections</span>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="font-display text-xl font-bold tabular-nums text-[#1B5E20] sm:text-2xl">
                  5
                </span>
                <span className="text-[11px] font-medium text-[#2E7D32]">Editable</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('submissions')}
              className={`flex flex-col justify-between rounded-2xl border p-3.5 text-left transition-colors cursor-pointer ${
                activeTab === 'submissions'
                  ? 'border-[#2E7D32] bg-white shadow-xs'
                  : 'border-[#2E7D32]/15 bg-white/80 hover:bg-white'
              }`}
            >
              <span className="text-xs font-medium text-[#607D66]">Donor Inquiries</span>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="font-display text-xl font-bold tabular-nums text-[#1B5E20] sm:text-2xl">
                  {submissions.length}
                </span>
                <span className="text-[11px] font-medium text-[#2E7D32] tabular-nums">
                  {newInquiriesCount} new
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('cloud-info')}
              className={`flex flex-col justify-between rounded-2xl border p-3.5 text-left transition-colors cursor-pointer ${
                activeTab === 'cloud-info'
                  ? 'border-[#2E7D32] bg-white shadow-xs'
                  : 'border-[#2E7D32]/15 bg-white/80 hover:bg-white'
              }`}
            >
              <span className="text-xs font-medium text-[#607D66]">Separate Links</span>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="font-display text-base font-bold text-[#1B5E20] sm:text-lg truncate">
                  / &amp; /admin
                </span>
                <span className="text-[11px] font-medium text-[#2E7D32]">Copy URL</span>
              </div>
            </button>
          </div>

          {/* ============================================================== */}
          {/* TAB 1: MOBILE-OPTIMIZED CLOUDINARY PHOTO MANAGER               */}
          {/* ============================================================== */}
          {activeTab === 'photos' && (
            <div className="space-y-4">
              {/* Section Header + Mobile Horizontal Category Scroller */}
              <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-display text-base font-bold text-[#1B5E20] sm:text-xl">
                      Website Photo Manager
                    </h2>
                    <p className="mt-0.5 text-xs text-[#607D66]">
                      Tap any section card below to upload a photo directly from your mobile phone
                      gallery. It saves automatically to Cloudinary &amp; Firebase.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveAllPhotos}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-[#2E7D32] px-4 py-2.5 text-xs font-bold text-white transition-transform active:scale-[0.98] hover:bg-[#1B5E20] cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Check className="h-4 w-4" />
                    <span>Sync All Photos</span>
                  </button>
                </div>

                {/* Single-line Horizontal Filter Carousel for Mobile Thumb Ergonomics */}
                <div className="mt-4 flex items-center gap-1.5 overflow-x-auto rounded-2xl bg-[#E8F5E9] p-1.5">
                  <button
                    type="button"
                    onClick={() => setPhotoCategory('all')}
                    className={`min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      photoCategory === 'all'
                        ? 'bg-[#2E7D32] text-white shadow-2xs'
                        : 'text-[#1B5E20] hover:bg-white/60'
                    }`}
                  >
                    All 12 Photos
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoCategory('hero-about')}
                    className={`min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      photoCategory === 'hero-about'
                        ? 'bg-[#2E7D32] text-white shadow-2xs'
                        : 'text-[#1B5E20] hover:bg-white/60'
                    }`}
                  >
                    Hero &amp; About (3)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoCategory('rehab-medical')}
                    className={`min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      photoCategory === 'rehab-medical'
                        ? 'bg-[#2E7D32] text-white shadow-2xs'
                        : 'text-[#1B5E20] hover:bg-white/60'
                    }`}
                  >
                    Rehab &amp; Medical (5)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoCategory('daily-life')}
                    className={`min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      photoCategory === 'daily-life'
                        ? 'bg-[#2E7D32] text-white shadow-2xs'
                        : 'text-[#1B5E20] hover:bg-white/60'
                    }`}
                  >
                    Daily Life &amp; Meals (4)
                  </button>
                </div>
              </div>

              {photoSaveSuccess && (
                <div className="flex items-center gap-2.5 rounded-2xl border border-green-200 bg-green-50 p-4 text-xs font-semibold text-green-800">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <span>Photo uploaded and live website updated!</span>
                </div>
              )}

              {photoSaveError && (
                <div className="flex items-center gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-800">
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                  <span>{photoSaveError}</span>
                </div>
              )}

              {/* Photo Cards Grid (1 col on mobile, 2 on tablet, 3 on desktop) */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {visiblePhotoSlots.map((slot) => {
                  const currentUrl = photoDraft[slot.key] || slot.defaultUrl;
                  const isUploadingThis = uploadingSlot === slot.key;
                  const progress = uploadProgress[slot.key] || 0;
                  const isUrlExpanded = expandedUrlSlot === slot.key;

                  return (
                    <div
                      key={slot.key}
                      className="flex flex-col justify-between rounded-3xl border border-[#2E7D32]/20 bg-white p-4 shadow-2xs sm:p-5"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-[#607D66] tabular-nums">
                              {slot.number}. Website Section
                            </p>
                            <h3 className="font-display text-sm font-bold text-[#1B5E20] sm:text-base">
                              {slot.label}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleResetSlot(slot.key, slot.defaultUrl)}
                            title="Reset to default client photo"
                            className="inline-flex min-h-[40px] items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-medium text-[#607D66] hover:bg-[#E8F5E9] hover:text-[#1B5E20] cursor-pointer shrink-0"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                            <span>Reset</span>
                          </button>
                        </div>

                        <p className="mt-1 text-xs leading-relaxed text-[#607D66]">
                          {slot.description}
                        </p>

                        {/* 16:9 Image Preview with Upload Progress Overlay */}
                        <div className="relative mt-3 aspect-video w-full overflow-hidden rounded-2xl border border-[#2E7D32]/15 bg-[#1B5E20]">
                          <img
                            src={currentUrl}
                            alt={slot.label}
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = slot.defaultUrl;
                            }}
                          />
                          {isUploadingThis && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-4 text-white">
                              <Loader2 className="h-7 w-7 animate-spin text-[#43A047]" />
                              <span className="mt-2 text-xs font-bold tabular-nums">
                                Uploading {progress}%
                              </span>
                              <div className="mt-2 h-2 w-full max-w-[140px] overflow-hidden rounded-full bg-white/25">
                                <div
                                  className="h-full bg-[#43A047] transition-all duration-150"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Large Thumb-Friendly Upload Trigger (48px min height) */}
                      <div className="mt-4 space-y-2.5">
                        <label className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-[#2E7D32] px-4 py-3 text-xs font-bold text-white shadow-2xs transition-transform active:scale-[0.98] hover:bg-[#1B5E20] cursor-pointer whitespace-nowrap">
                          <UploadCloud className="h-4 w-4 shrink-0" />
                          <span>
                            {isUploadingThis
                              ? `Uploading ${progress}%...`
                              : 'Upload Photo from Phone / PC'}
                          </span>
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

                        {/* Collapsible Direct URL Option to Keep Mobile Cards Clean */}
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedUrlSlot(isUrlExpanded ? null : slot.key)
                          }
                          className="flex min-h-[40px] w-full items-center justify-between rounded-xl bg-[#E8F5E9]/70 px-3.5 py-2 text-xs font-medium text-[#1B5E20] hover:bg-[#E8F5E9] cursor-pointer"
                        >
                          <span>Or paste image URL</span>
                          {isUrlExpanded ? (
                            <ChevronUp className="h-4 w-4 text-[#2E7D32]" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-[#2E7D32]" />
                          )}
                        </button>

                        {isUrlExpanded && (
                          <div className="pt-1">
                            <input
                              type="text"
                              value={photoDraft[slot.key] || ''}
                              onChange={(e) =>
                                setPhotoDraft((prev) => ({
                                  ...prev,
                                  [slot.key]: e.target.value,
                                }))
                              }
                              placeholder="https://res.cloudinary.com/..."
                              className="block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/40 px-3 py-2 font-mono text-xs text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: MOBILE-FRIENDLY WEBSITE CONTENT & TEXT EDITOR           */}
          {/* ============================================================== */}
          {activeTab === 'content' && (
            <form onSubmit={handleSaveContent} className="space-y-4">
              <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-display text-base font-bold text-[#1B5E20] sm:text-xl">
                      Website Content &amp; Text Editor
                    </h2>
                    <p className="mt-0.5 text-xs text-[#607D66]">
                      Select any section tab below to edit website text on your phone, then tap Save.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingContent}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#2E7D32] px-5 py-3 text-xs font-bold text-white shadow-xs transition-transform active:scale-[0.98] hover:bg-[#1B5E20] disabled:opacity-60 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {isSavingContent ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Save Content to Firebase</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Horizontal Section Selector for Easy One-Handed Mobile Editing */}
                <div className="mt-4 flex items-center gap-1.5 overflow-x-auto rounded-2xl bg-[#E8F5E9] p-1.5">
                  <button
                    type="button"
                    onClick={() => setContentSection('identity')}
                    className={`min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      contentSection === 'identity'
                        ? 'bg-[#2E7D32] text-white shadow-2xs'
                        : 'text-[#1B5E20] hover:bg-white/60'
                    }`}
                  >
                    1. Identity &amp; Tagline
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentSection('mental-health')}
                    className={`min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      contentSection === 'mental-health'
                        ? 'bg-[#2E7D32] text-white shadow-2xs'
                        : 'text-[#1B5E20] hover:bg-white/60'
                    }`}
                  >
                    2. Mental Health
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentSection('mission')}
                    className={`min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      contentSection === 'mission'
                        ? 'bg-[#2E7D32] text-white shadow-2xs'
                        : 'text-[#1B5E20] hover:bg-white/60'
                    }`}
                  >
                    3. Mission &amp; Bible
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentSection('contact')}
                    className={`min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      contentSection === 'contact'
                        ? 'bg-[#2E7D32] text-white shadow-2xs'
                        : 'text-[#1B5E20] hover:bg-white/60'
                    }`}
                  >
                    4. Contact &amp; Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentSection('bank')}
                    className={`min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      contentSection === 'bank'
                        ? 'bg-[#2E7D32] text-white shadow-2xs'
                        : 'text-[#1B5E20] hover:bg-white/60'
                    }`}
                  >
                    5. Bank &amp; UPI
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentSection('all')}
                    className={`min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      contentSection === 'all'
                        ? 'bg-[#2E7D32] text-white shadow-2xs'
                        : 'text-[#1B5E20] hover:bg-white/60'
                    }`}
                  >
                    Show All
                  </button>
                </div>
              </div>

              {contentSaveSuccess && (
                <div className="flex items-center gap-2.5 rounded-2xl border border-green-200 bg-green-50 p-4 text-xs font-semibold text-green-800">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <span>Website content saved to Firebase and updated live!</span>
                </div>
              )}

              {contentSaveError && (
                <div className="flex items-center gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-800">
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                  <span>{contentSaveError}</span>
                </div>
              )}

              {/* Section 1: Organization Identification */}
              {(contentSection === 'identity' || contentSection === 'all') && (
                <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-4 sm:p-6">
                  <h3 className="font-display text-base font-bold text-[#1B5E20]">
                    01. Organization Identity &amp; Tagline
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
                        className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-2.5 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
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
                        className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-2.5 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
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
                        className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-2.5 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
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
                        className="mt-1.5 block w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-3 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Section 2: Mental Health Introduction */}
              {(contentSection === 'mental-health' || contentSection === 'all') && (
                <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-4 sm:p-6">
                  <h3 className="font-display text-base font-bold text-[#1B5E20]">
                    02. Introduction to Mental Health
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1B5E20]">
                        Section Heading
                      </label>
                      <input
                        type="text"
                        value={contentDraft.mentalHealthHeading || ''}
                        onChange={(e) =>
                          setContentDraft({
                            ...contentDraft,
                            mentalHealthHeading: e.target.value,
                          })
                        }
                        className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-2.5 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
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
                        className="mt-1.5 block w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-3 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
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
                        className="mt-1.5 block w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-3 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Section 3: Mission, Vision & Bible Verse */}
              {(contentSection === 'mission' || contentSection === 'all') && (
                <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-4 sm:p-6">
                  <h3 className="font-display text-base font-bold text-[#1B5E20]">
                    03. Mission, Vision &amp; Scripture Quotation
                  </h3>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-[#1B5E20]">
                        Mission Statement
                      </label>
                      <textarea
                        rows={3}
                        value={contentDraft.mission || ''}
                        onChange={(e) =>
                          setContentDraft({ ...contentDraft, mission: e.target.value })
                        }
                        className="mt-1.5 block w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-3 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1B5E20]">
                        Vision Statement
                      </label>
                      <textarea
                        rows={3}
                        value={contentDraft.vision || ''}
                        onChange={(e) =>
                          setContentDraft({ ...contentDraft, vision: e.target.value })
                        }
                        className="mt-1.5 block w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-3 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1B5E20]">
                        Bible Quotation Verse
                      </label>
                      <input
                        type="text"
                        value={contentDraft.bibleVerse || ''}
                        onChange={(e) =>
                          setContentDraft({ ...contentDraft, bibleVerse: e.target.value })
                        }
                        className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-2.5 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1B5E20]">
                        Scripture Reference
                      </label>
                      <input
                        type="text"
                        value={contentDraft.bibleReference || ''}
                        onChange={(e) =>
                          setContentDraft({ ...contentDraft, bibleReference: e.target.value })
                        }
                        className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-2.5 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Section 4: Contact Details & Location */}
              {(contentSection === 'contact' || contentSection === 'all') && (
                <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-4 sm:p-6">
                  <h3 className="font-display text-base font-bold text-[#1B5E20]">
                    04. Contact Details &amp; Address
                  </h3>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1B5E20]">
                        Primary &amp; WhatsApp Phone
                      </label>
                      <input
                        type="tel"
                        value={contentDraft.primaryPhone || ''}
                        onChange={(e) =>
                          setContentDraft({ ...contentDraft, primaryPhone: e.target.value })
                        }
                        className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-2.5 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1B5E20]">
                        Centre Phone Number
                      </label>
                      <input
                        type="tel"
                        value={contentDraft.secondaryPhone || ''}
                        onChange={(e) =>
                          setContentDraft({ ...contentDraft, secondaryPhone: e.target.value })
                        }
                        className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-2.5 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1B5E20]">
                        Landline Number
                      </label>
                      <input
                        type="tel"
                        value={contentDraft.landline || ''}
                        onChange={(e) =>
                          setContentDraft({ ...contentDraft, landline: e.target.value })
                        }
                        className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-2.5 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
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
                        className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-2.5 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1B5E20]">
                        Visiting Hours
                      </label>
                      <input
                        type="text"
                        value={contentDraft.visitingHoursSchedule || ''}
                        onChange={(e) =>
                          setContentDraft({
                            ...contentDraft,
                            visitingHoursSchedule: e.target.value,
                          })
                        }
                        className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-2.5 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs font-bold text-[#1B5E20]">
                        Landmark / Road
                      </label>
                      <input
                        type="text"
                        value={contentDraft.landmark || ''}
                        onChange={(e) =>
                          setContentDraft({ ...contentDraft, landmark: e.target.value })
                        }
                        className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-2.5 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
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
                        className="mt-1.5 block w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-3 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Section 5: Bank & UPI Information */}
              {(contentSection === 'bank' || contentSection === 'all') && (
                <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-4 sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-display text-base font-bold text-[#1B5E20]">
                      05. Verified Bank &amp; UPI Details
                    </h3>
                    <label className="inline-flex min-h-[44px] items-center gap-2.5 rounded-xl bg-[#E8F5E9] px-3.5 py-2 cursor-pointer">
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
                      <span className="text-xs font-bold text-[#1B5E20]">
                        Show Bank Details on Public Website
                      </span>
                    </label>
                  </div>

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
                        className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-2.5 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
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
                        placeholder="e.g. State Bank of India"
                        className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-2.5 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1B5E20]">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={contentDraft.bankAccountNumber || ''}
                        onChange={(e) =>
                          setContentDraft({ ...contentDraft, bankAccountNumber: e.target.value })
                        }
                        placeholder="Account Number"
                        className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-2.5 font-mono text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
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
                        className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-2.5 font-mono text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
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
                        className="mt-1.5 block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 px-4 py-2.5 font-mono text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Full-width Thumb-Zone Save CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSavingContent}
                  className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#2E7D32] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-transform active:scale-[0.98] hover:bg-[#1B5E20] disabled:opacity-60 cursor-pointer"
                >
                  <Check className="h-4 w-4" />
                  <span>
                    {isSavingContent ? 'Saving Changes to Firebase...' : 'Save All Text Changes'}
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* ============================================================== */}
          {/* TAB 3: MOBILE-FIRST DONATIONS & SPONSORSHIP INQUIRIES          */}
          {/* ============================================================== */}
          {activeTab === 'submissions' && (
            <div className="space-y-4">
              <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-display text-base font-bold text-[#1B5E20] sm:text-xl">
                      Annadanam &amp; Donation Inquiries
                    </h2>
                    <p className="mt-0.5 text-xs text-[#607D66]">
                      Real-time meal bookings and sponsorship forms submitted by visitors on the
                      public website.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleExportCSV}
                    disabled={submissions.length === 0}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-[#2E7D32] bg-white px-4 py-2.5 text-xs font-bold text-[#1B5E20] transition-colors hover:bg-[#E8F5E9] disabled:opacity-40 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Download className="h-4 w-4 text-[#2E7D32]" />
                    <span>Download CSV</span>
                  </button>
                </div>

                {/* Search Input */}
                <div className="relative mt-4">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#607D66]" />
                  <input
                    type="text"
                    placeholder="Search donor name, phone, occasion..."
                    value={submissionSearch}
                    onChange={(e) => setSubmissionSearch(e.target.value)}
                    className="block min-h-[48px] w-full rounded-2xl border border-[#2E7D32]/25 bg-[#E8F5E9]/50 pl-10 pr-4 text-sm text-[#263238] focus:bg-white focus:outline-2 focus:outline-[#2E7D32]"
                  />
                </div>

                {/* Mobile Horizontal Status Filter Tabs */}
                <div className="mt-3 flex items-center gap-1.5 overflow-x-auto rounded-2xl bg-[#E8F5E9] p-1.5">
                  {[
                    { id: 'all', label: `All (${submissions.length})` },
                    {
                      id: 'new',
                      label: `New (${submissions.filter((s) => s.status === 'new').length})`,
                    },
                    {
                      id: 'contacted',
                      label: `Contacted (${
                        submissions.filter((s) => s.status === 'contacted').length
                      })`,
                    },
                    {
                      id: 'confirmed',
                      label: `Confirmed (${
                        submissions.filter((s) => s.status === 'confirmed').length
                      })`,
                    },
                    {
                      id: 'archived',
                      label: `Archived (${
                        submissions.filter((s) => s.status === 'archived').length
                      })`,
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSubmissionFilter(tab.id)}
                      className={`min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        submissionFilter === tab.id
                          ? 'bg-[#2E7D32] text-white shadow-2xs'
                          : 'text-[#1B5E20] hover:bg-white/60'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submissions Cards */}
              {loadingSubmissions ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-[#2E7D32]" />
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-10 text-center">
                  <HeartHandshake className="mx-auto h-10 w-10 text-[#2E7D32]/50" />
                  <h3 className="font-display mt-3 text-base font-bold text-[#1B5E20]">
                    No inquiries found
                  </h3>
                  <p className="mt-1 text-xs text-[#607D66]">
                    When visitors fill the Annadanam or Donation form on the public website, their
                    details will appear here immediately.
                  </p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {filteredSubmissions.map((sub) => {
                    const cleanPhone = sub.phone.replace(/[\s\-+]/g, '');
                    const donorWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                      `Namaskaram ${sub.fullName}, thank you for contacting ${SITE_CONFIG.name} regarding your inquiry for ${sub.sponsorshipType} on ${sub.preferredDate}.`
                    )}`;

                    return (
                      <div
                        key={sub.id}
                        className="rounded-3xl border border-[#2E7D32]/20 bg-white p-4 shadow-2xs sm:p-6"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-display text-base font-bold text-[#1B5E20]">
                              {sub.fullName}
                            </h3>
                            <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-[#607D66]">
                              <span className="font-semibold text-[#2E7D32] capitalize">
                                {sub.status}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="tabular-nums">
                                {new Date(sub.createdAt).toLocaleDateString()}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums text-[#1B5E20]">
                                {sub.phone}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => deleteSubmission(sub.id)}
                            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl text-red-600 hover:bg-red-50 cursor-pointer shrink-0"
                            title="Delete submission"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-3 grid grid-cols-1 gap-2 rounded-2xl bg-[#E8F5E9]/50 p-3.5 text-xs sm:grid-cols-3">
                          <div>
                            <span className="text-[#607D66]">Sponsorship: </span>
                            <span className="font-bold text-[#1B5E20]">{sub.sponsorshipType}</span>
                          </div>
                          <div>
                            <span className="text-[#607D66]">Occasion: </span>
                            <span className="font-semibold text-[#1B5E20]">{sub.occasion}</span>
                          </div>
                          <div>
                            <span className="text-[#607D66]">Preferred Date: </span>
                            <span className="font-mono font-semibold tabular-nums text-[#1B5E20]">
                              {sub.preferredDate}
                            </span>
                          </div>
                        </div>

                        {sub.prayerNote && (
                          <p className="mt-2.5 text-xs leading-relaxed text-[#263238]">
                            <strong className="text-[#1B5E20]">Prayer Intention:</strong>{' '}
                            {sub.prayerNote}
                          </p>
                        )}

                        {sub.additionalMessage && (
                          <p className="mt-1.5 text-xs leading-relaxed text-[#263238]">
                            <strong className="text-[#1B5E20]">Note:</strong>{' '}
                            {sub.additionalMessage}
                          </p>
                        )}

                        {/* Mobile Thumb-Friendly Action Row */}
                        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#E8F5E9] pt-3 sm:flex sm:items-center sm:justify-between">
                          <select
                            value={sub.status}
                            onChange={(e) =>
                              updateSubmissionStatus(
                                sub.id,
                                e.target.value as StoredSubmission['status']
                              )
                            }
                            className="col-span-2 min-h-[44px] rounded-xl border border-[#2E7D32]/30 bg-[#E8F5E9] px-3 py-2 text-xs font-bold text-[#1B5E20] sm:w-auto"
                          >
                            <option value="new">Status: New</option>
                            <option value="contacted">Status: Contacted</option>
                            <option value="confirmed">Status: Confirmed</option>
                            <option value="archived">Status: Archived</option>
                          </select>

                          <div className="col-span-2 grid grid-cols-2 gap-2 sm:flex sm:items-center">
                            <a
                              href={`tel:${sub.phone}`}
                              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-[#2E7D32]/30 bg-white px-3.5 py-2 text-xs font-bold text-[#1B5E20] hover:bg-[#E8F5E9] whitespace-nowrap"
                            >
                              <PhoneCall className="h-3.5 w-3.5 text-[#2E7D32]" />
                              <span>Call Donor</span>
                            </a>

                            <a
                              href={donorWhatsAppUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-[#2E7D32] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#1B5E20] whitespace-nowrap"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: SEPARATE LINKS (/ & /admin) + CLOUDINARY STATUS         */}
          {/* ============================================================== */}
          {activeTab === 'cloud-info' && (
            <div className="space-y-4">
              {/* Separate Links Card */}
              <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-4 sm:p-6">
                <h2 className="font-display text-base font-bold text-[#1B5E20] sm:text-xl">
                  Separate Website &amp; Admin Links
                </h2>
                <p className="mt-1 text-xs text-[#607D66]">
                  Share the Public Website link with visitors and donors. Keep the Admin Panel link
                  bookmarked on your phone.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Link 1: Public Website */}
                  <div className="flex flex-col justify-between rounded-2xl border border-[#2E7D32]/20 bg-[#E8F5E9]/50 p-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#1B5E20]">
                        <Link2 className="h-4 w-4 text-[#2E7D32]" />
                        <span>01. Public Website Link (For Visitors)</span>
                      </div>
                      <code className="mt-2 block break-all rounded-xl border border-[#2E7D32]/15 bg-white p-3 font-mono text-xs text-[#1B5E20]">
                        {publicWebsiteUrl}
                      </code>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyUrl('website', publicWebsiteUrl)}
                        className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-[#2E7D32]/30 bg-white px-3 py-2 text-xs font-bold text-[#1B5E20] hover:bg-[#E8F5E9] cursor-pointer whitespace-nowrap"
                      >
                        {copiedLinkType === 'website' ? (
                          <>
                            <Check className="h-4 w-4 text-[#2E7D32]" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 text-[#2E7D32]" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>

                      <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-[#2E7D32] px-3 py-2 text-xs font-bold text-white hover:bg-[#1B5E20] whitespace-nowrap"
                      >
                        <span>Open Site</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Link 2: Admin Panel */}
                  <div className="flex flex-col justify-between rounded-2xl border border-[#2E7D32]/20 bg-[#E8F5E9]/50 p-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#1B5E20]">
                        <Lock className="h-4 w-4 text-[#2E7D32]" />
                        <span>02. Admin Panel Link (Only For You)</span>
                      </div>
                      <code className="mt-2 block break-all rounded-xl border border-[#2E7D32]/15 bg-white p-3 font-mono text-xs font-bold text-[#1B5E20]">
                        {adminPanelUrl}
                      </code>
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyUrl('admin', adminPanelUrl)}
                        className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-[#2E7D32] px-3 py-2 text-xs font-bold text-white hover:bg-[#1B5E20] cursor-pointer whitespace-nowrap"
                      >
                        {copiedLinkType === 'admin' ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>Admin Link Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>Copy Admin Link (/admin)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cloudinary & Firebase Info + Quick Upload Tester */}
              <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-4 sm:p-6">
                <h3 className="font-display text-base font-bold text-[#1B5E20]">
                  Cloudinary &amp; Firebase Storage Status
                </h3>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#2E7D32]/15 bg-[#E8F5E9]/40 p-4 text-xs space-y-1.5">
                    <p className="font-bold text-[#1B5E20]">Cloudinary Image CDN</p>
                    <p className="text-[#607D66]">
                      Cloud Name:{' '}
                      <code className="font-mono font-bold text-[#1B5E20]">
                        {CLOUDINARY_CONFIG.cloudName}
                      </code>
                    </p>
                    <p className="text-[#607D66]">
                      Preset Name:{' '}
                      <code className="font-mono font-bold text-[#1B5E20]">
                        {CLOUDINARY_CONFIG.uploadPreset}
                      </code>
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#2E7D32]/15 bg-[#E8F5E9]/40 p-4 text-xs space-y-1.5">
                    <p className="font-bold text-[#1B5E20]">Firebase Real-Time Sync</p>
                    <p className="text-[#607D66]">
                      Status: <span className="font-semibold text-[#2E7D32]">Connected &amp; Live</span>
                    </p>
                    <p className="text-[#607D66]">
                      Collections: <code className="font-mono text-[#1B5E20]">/settings</code> ·{' '}
                      <code className="font-mono text-[#1B5E20]">/submissions</code>
                    </p>
                  </div>
                </div>

                {/* Quick Cloudinary Test Upload */}
                <div className="mt-4 rounded-2xl border border-dashed border-[#2E7D32] bg-[#E8F5E9]/40 p-5 text-center">
                  <ImageIcon className="mx-auto h-7 w-7 text-[#2E7D32]" />
                  <h4 className="font-display mt-2 text-sm font-bold text-[#1B5E20]">
                    Test Mobile Photo Upload to Cloudinary
                  </h4>
                  <p className="mt-1 text-xs text-[#607D66]">
                    Upload any test image from your phone to get a direct Cloudinary CDN link.
                  </p>

                  <label className="mt-3 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#2E7D32] px-5 py-3 text-xs font-bold text-white transition-transform active:scale-[0.98] hover:bg-[#1B5E20] cursor-pointer whitespace-nowrap">
                    <UploadCloud className="h-4 w-4" />
                    <span>
                      {testUploading ? `Uploading ${testProgress}%...` : 'Select Test Photo'}
                    </span>
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
                    <div className="mt-4 rounded-xl border border-green-200 bg-white p-3.5 text-left">
                      <p className="text-xs font-bold text-green-700">
                        Uploaded to Cloudinary Successfully:
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

      {/* ==================================================================== */}
      {/* PATTERN 1: FIXED BOTTOM TAB BAR FOR MOBILE THUMB NAVIGATION (md:hidden) */}
      {/* ==================================================================== */}
      <nav
        aria-label="Mobile Admin Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#2E7D32]/20 bg-white/95 backdrop-blur-md md:hidden"
      >
        <div className="grid h-16 grid-cols-4 items-center px-2">
          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`flex min-h-[48px] flex-col items-center justify-center rounded-xl transition-colors cursor-pointer ${
              activeTab === 'photos' ? 'text-[#2E7D32]' : 'text-[#607D66]'
            }`}
          >
            <UploadCloud className="h-5 w-5" />
            <span className="mt-1 text-[10px] font-bold tracking-tight">Photos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`flex min-h-[48px] flex-col items-center justify-center rounded-xl transition-colors cursor-pointer ${
              activeTab === 'content' ? 'text-[#2E7D32]' : 'text-[#607D66]'
            }`}
          >
            <FileText className="h-5 w-5" />
            <span className="mt-1 text-[10px] font-bold tracking-tight">Content</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('submissions')}
            className={`relative flex min-h-[48px] flex-col items-center justify-center rounded-xl transition-colors cursor-pointer ${
              activeTab === 'submissions' ? 'text-[#2E7D32]' : 'text-[#607D66]'
            }`}
          >
            <HeartHandshake className="h-5 w-5" />
            <span className="mt-1 text-[10px] font-bold tracking-tight">
              Inquiries {submissions.length > 0 ? `(${submissions.length})` : ''}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cloud-info')}
            className={`flex min-h-[48px] flex-col items-center justify-center rounded-xl transition-colors cursor-pointer ${
              activeTab === 'cloud-info' ? 'text-[#2E7D32]' : 'text-[#607D66]'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span className="mt-1 text-[10px] font-bold tracking-tight">Links</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
