import React, { createContext, useContext, useState, useEffect } from 'react';
import { SITE_CONFIG, DEFAULT_IMAGES, SiteImagesConfig } from '../config/siteConfig';
import {
  subscribeToSiteContent,
  subscribeToSitePhotos,
  StoredSiteContent,
} from '../lib/firebase';

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

  // Subscribe to real-time text content
  useEffect(() => {
    let unsubscribeContent: (() => void) | undefined;
    try {
      unsubscribeContent = subscribeToSiteContent(
        (storedContent) => {
          if (storedContent) {
            setContentOverrides(storedContent);
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

  const primaryPhone = contentOverrides?.primaryPhone || SITE_CONFIG.contact.whatsappDisplay;
  const secondaryPhone =
    contentOverrides?.secondaryPhone || SITE_CONFIG.contact.secondaryPhoneDisplay;
  const landline = contentOverrides?.landline || SITE_CONFIG.contact.landlineDisplay;

  const liveConfig: LiveSiteConfig = {
    name: contentOverrides?.name || SITE_CONFIG.name,
    shortReferenceName: contentOverrides?.shortReferenceName || SITE_CONFIG.shortReferenceName,
    fullName: contentOverrides?.fullName || SITE_CONFIG.fullName,
    tagline: contentOverrides?.tagline || SITE_CONFIG.tagline,
    description: contentOverrides?.description || SITE_CONFIG.description,
    mentalHealthHeading:
      contentOverrides?.mentalHealthHeading || SITE_CONFIG.mentalHealthIntro.heading,
    mentalHealthLead: contentOverrides?.mentalHealthLead || SITE_CONFIG.mentalHealthIntro.lead,
    mentalHealthBody: contentOverrides?.mentalHealthBody || SITE_CONFIG.mentalHealthIntro.body,
    mission: contentOverrides?.mission || SITE_CONFIG.mission,
    vision: contentOverrides?.vision || SITE_CONFIG.vision,
    primaryPhone,
    primaryPhoneTel: cleanTel(primaryPhone, SITE_CONFIG.contact.primaryPhoneTel),
    whatsappNumberClean: primaryPhone.replace(/[^\d]/g, '') || SITE_CONFIG.contact.whatsappNumberClean,
    secondaryPhone,
    secondaryPhoneTel: cleanTel(secondaryPhone, SITE_CONFIG.contact.secondaryPhoneTel),
    landline,
    landlineTel: cleanTel(landline, SITE_CONFIG.contact.landlineTel),
    provincePhone: contentOverrides?.provincePhone || SITE_CONFIG.contact.provinceDisplay,
    email: contentOverrides?.email || SITE_CONFIG.contact.email,
    addressLines: contentOverrides?.addressLines
      ? contentOverrides.addressLines.split('\n').filter((line) => line.trim().length > 0)
      : SITE_CONFIG.location.addressLines,
    landmark: contentOverrides?.landmark || SITE_CONFIG.location.landmark,
    bankDetails: {
      isConfigured:
        contentOverrides?.bankIsConfigured !== undefined
          ? contentOverrides.bankIsConfigured
          : SITE_CONFIG.bankDetails.isConfigured,
      accountName: contentOverrides?.bankAccountName || SITE_CONFIG.bankDetails.accountName,
      bankName: contentOverrides?.bankName || SITE_CONFIG.bankDetails.bankName,
      accountNumber: contentOverrides?.bankAccountNumber || SITE_CONFIG.bankDetails.accountNumber,
      ifscCode: contentOverrides?.bankIfsc || SITE_CONFIG.bankDetails.ifscCode,
      upiId: contentOverrides?.bankUpiId || SITE_CONFIG.bankDetails.upiId,
    },
    bibleVerse: contentOverrides?.bibleVerse || SITE_CONFIG.bibleQuotation.verse,
    bibleReference: contentOverrides?.bibleReference || SITE_CONFIG.bibleQuotation.reference,
    visitingHoursSchedule:
      contentOverrides?.visitingHoursSchedule || SITE_CONFIG.visitingHours.schedule,
  };

  return {
    images,
    contentOverrides,
    liveConfig,
    isFirebaseLoaded,
  };
}
