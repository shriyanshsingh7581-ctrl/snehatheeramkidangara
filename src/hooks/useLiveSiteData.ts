import React, { createContext, useContext, useState, useEffect } from 'react';
import { SITE_CONFIG, DEFAULT_IMAGES, SiteImagesConfig } from '../config/siteConfig';
import {
  subscribeToSiteContent,
  subscribeToSitePhotos,
  saveSiteContent,
  StoredSiteContent,
} from '../lib/firebase';

export const CURRENT_BROCHURE_VERSION = 'brochure-pdf-v2';

export interface LiveSiteConfig {
  name: string;
  shortReferenceName: string;
  fullName: string;
  tagline: string;
  description: string;
  mentalHealthHeading: string;
  mentalHealthLead: string;
  mentalHealthBody: string;
  mission: string;
  vision: string;
  primaryPhone: string;
  primaryPhoneTel: string;
  whatsappNumberClean: string;
  secondaryPhone: string;
  secondaryPhoneTel: string;
  landline: string;
  landlineTel: string;
  provincePhone: string;
  email: string;
  addressLines: string[];
  landmark: string;
  bankDetails: {
    isConfigured: boolean;
    accountName?: string;
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
    upiId?: string;
  };
  bibleVerse: string;
  bibleReference: string;
  visitingHoursSchedule: string;
}

const DEFAULT_LIVE_CONFIG: LiveSiteConfig = {
  name: SITE_CONFIG.name,
  shortReferenceName: SITE_CONFIG.shortReferenceName,
  fullName: SITE_CONFIG.fullName,
  tagline: SITE_CONFIG.tagline,
  description: SITE_CONFIG.description,
  mentalHealthHeading: SITE_CONFIG.mentalHealthIntro.heading,
  mentalHealthLead: SITE_CONFIG.mentalHealthIntro.lead,
  mentalHealthBody: SITE_CONFIG.mentalHealthIntro.body,
  mission: SITE_CONFIG.mission,
  vision: SITE_CONFIG.vision,
  primaryPhone: SITE_CONFIG.contact.whatsappDisplay,
  primaryPhoneTel: SITE_CONFIG.contact.primaryPhoneTel,
  whatsappNumberClean: SITE_CONFIG.contact.whatsappNumberClean,
  secondaryPhone: SITE_CONFIG.contact.secondaryPhoneDisplay,
  secondaryPhoneTel: SITE_CONFIG.contact.secondaryPhoneTel,
  landline: SITE_CONFIG.contact.landlineDisplay,
  landlineTel: SITE_CONFIG.contact.landlineTel,
  provincePhone: SITE_CONFIG.contact.provinceDisplay,
  email: SITE_CONFIG.contact.email,
  addressLines: SITE_CONFIG.location.addressLines,
  landmark: SITE_CONFIG.location.landmark,
  bankDetails: {
    isConfigured: SITE_CONFIG.bankDetails.isConfigured,
    accountName: SITE_CONFIG.bankDetails.accountName,
    bankName: SITE_CONFIG.bankDetails.bankName,
    accountNumber: SITE_CONFIG.bankDetails.accountNumber,
    ifscCode: SITE_CONFIG.bankDetails.ifscCode,
    upiId: SITE_CONFIG.bankDetails.upiId,
  },
  bibleVerse: SITE_CONFIG.bibleQuotation.verse,
  bibleReference: SITE_CONFIG.bibleQuotation.reference,
  visitingHoursSchedule: SITE_CONFIG.visitingHours.schedule,
};

export const LiveSiteContext = createContext<LiveSiteConfig>(DEFAULT_LIVE_CONFIG);

export function useLiveConfig(): LiveSiteConfig {
  return useContext(LiveSiteContext);
}

function cleanTel(phoneStr: string, fallback: string): string {
  const digits = phoneStr.replace(/[^\d+]/g, '');
  return digits.length >= 8 ? digits : fallback;
}

export function useLiveSiteData() {
  const [images, setImages] = useState<SiteImagesConfig>(DEFAULT_IMAGES);
  const [contentOverrides, setContentOverrides] = useState<StoredSiteContent | null>(null);
  const [isFirebaseLoaded, setIsFirebaseLoaded] = useState(false);

  // Subscribe to real-time photos
  useEffect(() => {
    let unsubscribePhotos: (() => void) | undefined;
    try {
      unsubscribePhotos = subscribeToSitePhotos(
        (storedPhotos) => {
          if (storedPhotos) {
            setImages((prev) => ({
              ...prev,
              heroSanctuary: storedPhotos.heroSanctuary
                ? { ...prev.heroSanctuary, url: storedPhotos.heroSanctuary }
                : prev.heroSanctuary,
              everyMotherLove: storedPhotos.everyMotherLove
                ? { ...prev.everyMotherLove, url: storedPhotos.everyMotherLove }
                : prev.everyMotherLove,
              kuttanadCampus: storedPhotos.kuttanadCampus
                ? { ...prev.kuttanadCampus, url: storedPhotos.kuttanadCampus }
                : prev.kuttanadCampus,
              psychosocialRehab: storedPhotos.psychosocialRehab
                ? { ...prev.psychosocialRehab, url: storedPhotos.psychosocialRehab }
                : prev.psychosocialRehab,
              mentalHealthCounselling: storedPhotos.mentalHealthCounselling
                ? { ...prev.mentalHealthCounselling, url: storedPhotos.mentalHealthCounselling }
                : prev.mentalHealthCounselling,
              vocationalTraining: storedPhotos.vocationalTraining
                ? { ...prev.vocationalTraining, url: storedPhotos.vocationalTraining }
                : prev.vocationalTraining,
              medicalNursing: storedPhotos.medicalNursing
                ? { ...prev.medicalNursing, url: storedPhotos.medicalNursing }
                : prev.medicalNursing,
              clinicalCheckup: storedPhotos.clinicalCheckup
                ? { ...prev.clinicalCheckup, url: storedPhotos.clinicalCheckup }
                : prev.clinicalCheckup,
              recreationalActivities: storedPhotos.recreationalActivities
                ? { ...prev.recreationalActivities, url: storedPhotos.recreationalActivities }
                : prev.recreationalActivities,
              sustainabilityKitchen: storedPhotos.sustainabilityKitchen
                ? { ...prev.sustainabilityKitchen, url: storedPhotos.sustainabilityKitchen }
                : prev.sustainabilityKitchen,
              nutritiousMeals: storedPhotos.nutritiousMeals
                ? { ...prev.nutritiousMeals, url: storedPhotos.nutritiousMeals }
                : prev.nutritiousMeals,
              spiritualSupport: storedPhotos.spiritualSupport
                ? { ...prev.spiritualSupport, url: storedPhotos.spiritualSupport }
                : prev.spiritualSupport,
            }));
          }
          setIsFirebaseLoaded(true);
        },
        () => {
          setIsFirebaseLoaded(true);
        }
      );
    } catch {
      setIsFirebaseLoaded(true);
    }

    return () => {
      if (unsubscribePhotos) unsubscribePhotos();
    };
  }, []);

  // Subscribe to real-time text content & migrate old Firestore content to current brochure content
  useEffect(() => {
    let unsubscribeContent: (() => void) | undefined;
    try {
      unsubscribeContent = subscribeToSiteContent(
        (storedContent) => {
          if (storedContent && storedContent.brochureVersion === CURRENT_BROCHURE_VERSION) {
            setContentOverrides(storedContent);
          } else {
            // Sync official brochure content into Firestore so stale overrides are replaced
            const freshBrochureContent: StoredSiteContent = {
              name: SITE_CONFIG.name,
              shortReferenceName: SITE_CONFIG.shortReferenceName,
              fullName: SITE_CONFIG.fullName,
              memorialTitle: SITE_CONFIG.memorialTitle,
              tagline: SITE_CONFIG.tagline,
              description: SITE_CONFIG.description,
              mentalHealthHeading: SITE_CONFIG.mentalHealthIntro.heading,
              mentalHealthLead: SITE_CONFIG.mentalHealthIntro.lead,
              mentalHealthBody: SITE_CONFIG.mentalHealthIntro.body,
              mission: SITE_CONFIG.mission,
              vision: SITE_CONFIG.vision,
              primaryPhone: SITE_CONFIG.contact.whatsappDisplay,
              secondaryPhone: SITE_CONFIG.contact.secondaryPhoneDisplay,
              landline: SITE_CONFIG.contact.landlineDisplay,
              provincePhone: SITE_CONFIG.contact.provinceDisplay,
              email: SITE_CONFIG.contact.email,
              addressLines: SITE_CONFIG.location.addressLines.join('\n'),
              landmark: SITE_CONFIG.location.landmark,
              bibleVerse: SITE_CONFIG.bibleQuotation.verse,
              bibleReference: SITE_CONFIG.bibleQuotation.reference,
              visitingHoursSchedule: SITE_CONFIG.visitingHours.schedule,
              bankAccountName: storedContent?.bankAccountName || SITE_CONFIG.bankDetails.accountName || '',
              bankName: storedContent?.bankName || SITE_CONFIG.bankDetails.bankName || '',
              bankAccountNumber: storedContent?.bankAccountNumber || SITE_CONFIG.bankDetails.accountNumber || '',
              bankIfsc: storedContent?.bankIfsc || SITE_CONFIG.bankDetails.ifscCode || '',
              bankUpiId: storedContent?.bankUpiId || SITE_CONFIG.bankDetails.upiId || '',
              bankIsConfigured:
                storedContent?.bankIsConfigured !== undefined
                  ? storedContent.bankIsConfigured
                  : SITE_CONFIG.bankDetails.isConfigured,
              brochureVersion: CURRENT_BROCHURE_VERSION,
            };
            setContentOverrides(freshBrochureContent);
            saveSiteContent(freshBrochureContent).catch(() => {});
          }
        },
        () => {
          // Fallback to default siteConfig
        }
      );
    } catch {
      // Fallback
    }

    return () => {
      if (unsubscribeContent) unsubscribeContent();
    };
  }, []);

  const validOverrides =
    contentOverrides?.brochureVersion === CURRENT_BROCHURE_VERSION ? contentOverrides : null;

  const primaryPhone = validOverrides?.primaryPhone || SITE_CONFIG.contact.whatsappDisplay;
  const secondaryPhone =
    validOverrides?.secondaryPhone || SITE_CONFIG.contact.secondaryPhoneDisplay;
  const landline = validOverrides?.landline || SITE_CONFIG.contact.landlineDisplay;

  const liveConfig: LiveSiteConfig = {
    name: validOverrides?.name || SITE_CONFIG.name,
    shortReferenceName: validOverrides?.shortReferenceName || SITE_CONFIG.shortReferenceName,
    fullName: validOverrides?.fullName || SITE_CONFIG.fullName,
    tagline: validOverrides?.tagline || SITE_CONFIG.tagline,
    description: validOverrides?.description || SITE_CONFIG.description,
    mentalHealthHeading:
      validOverrides?.mentalHealthHeading || SITE_CONFIG.mentalHealthIntro.heading,
    mentalHealthLead: validOverrides?.mentalHealthLead || SITE_CONFIG.mentalHealthIntro.lead,
    mentalHealthBody: validOverrides?.mentalHealthBody || SITE_CONFIG.mentalHealthIntro.body,
    mission: validOverrides?.mission || SITE_CONFIG.mission,
    vision: validOverrides?.vision || SITE_CONFIG.vision,
    primaryPhone,
    primaryPhoneTel: cleanTel(primaryPhone, SITE_CONFIG.contact.primaryPhoneTel),
    whatsappNumberClean:
      primaryPhone.replace(/[^\d]/g, '') || SITE_CONFIG.contact.whatsappNumberClean,
    secondaryPhone,
    secondaryPhoneTel: cleanTel(secondaryPhone, SITE_CONFIG.contact.secondaryPhoneTel),
    landline,
    landlineTel: cleanTel(landline, SITE_CONFIG.contact.landlineTel),
    provincePhone: validOverrides?.provincePhone || SITE_CONFIG.contact.provinceDisplay,
    email: validOverrides?.email || SITE_CONFIG.contact.email,
    addressLines: validOverrides?.addressLines
      ? validOverrides.addressLines.split('\n').filter((line) => line.trim().length > 0)
      : SITE_CONFIG.location.addressLines,
    landmark: validOverrides?.landmark || SITE_CONFIG.location.landmark,
    bankDetails: {
      isConfigured:
        validOverrides?.bankIsConfigured !== undefined
          ? validOverrides.bankIsConfigured
          : SITE_CONFIG.bankDetails.isConfigured,
      accountName: validOverrides?.bankAccountName || SITE_CONFIG.bankDetails.accountName,
      bankName: validOverrides?.bankName || SITE_CONFIG.bankDetails.bankName,
      accountNumber: validOverrides?.bankAccountNumber || SITE_CONFIG.bankDetails.accountNumber,
      ifscCode: validOverrides?.bankIfsc || SITE_CONFIG.bankDetails.ifscCode,
      upiId: validOverrides?.bankUpiId || SITE_CONFIG.bankDetails.upiId,
    },
    bibleVerse: validOverrides?.bibleVerse || SITE_CONFIG.bibleQuotation.verse,
    bibleReference: validOverrides?.bibleReference || SITE_CONFIG.bibleQuotation.reference,
    visitingHoursSchedule:
      validOverrides?.visitingHoursSchedule || SITE_CONFIG.visitingHours.schedule,
  };

  return {
    images,
    contentOverrides: validOverrides,
    liveConfig,
    isFirebaseLoaded,
  };
}
