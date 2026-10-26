/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MobileNavigation } from './components/MobileNavigation';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { MissionVision } from './components/sections/MissionVision';
import { ServicesGrid } from './components/sections/ServicesGrid';
import { DonationCards } from './components/sections/DonationCards';
import { SponsorshipForm } from './components/sections/SponsorshipForm';
import { PrayerOffering } from './components/sections/PrayerOffering';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/Footer';
import { BankDetailsModal } from './components/BankDetailsModal';
import { AdminPortal } from './components/admin/AdminPortal';
import { useLiveSiteData, LiveSiteContext } from './hooks/useLiveSiteData';

function checkIsAdminRoute(): boolean {
  if (typeof window === 'undefined') return false;
  const pathname = window.location.pathname.toLowerCase();
  const search = window.location.search.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return (
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    search.includes('admin=true') ||
    search === '?admin' ||
    hash === '#admin' ||
    hash === '#/admin'
  );
}

export default function App() {
  const { images, contentOverrides, liveConfig } = useLiveSiteData();
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(checkIsAdminRoute);

  const [activeSection, setActiveSection] = useState<string>('home');
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);

  const [preselectedOccasion, setPreselectedOccasion] = useState<string | null>(null);
  const [preselectedSponsorshipType, setPreselectedSponsorshipType] = useState<string | null>(
    null
  );

  // Listen for URL changes (popstate / hashchange) between / and /admin
  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(checkIsAdminRoute());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    if (isAdminRoute) return;
    const sectionIds = ['home', 'about', 'services', 'support', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminRoute]);

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSponsorMealNavigate = () => {
    setPreselectedSponsorshipType('Full Day Meal (Breakfast, Lunch, Tea & Dinner)');
    scrollToElement('annadanam-desk');
  };

  const handleSponsorMedicinesNavigate = () => {
    setPreselectedSponsorshipType('Medical & Psychiatric Care Sponsorship');
    scrollToElement('annadanam-desk');
  };

  const handlePrayerOfferingNavigate = () => {
    setPreselectedOccasion('Special Prayer Offering');
    scrollToElement('annadanam-desk');
  };

  // SEPARATE LINK 2: Standalone Admin Panel (/admin)
  if (isAdminRoute) {
    return (
      <LiveSiteContext.Provider value={liveConfig}>
        <AdminPortal
          currentImages={images}
          currentContentOverrides={contentOverrides}
        />
      </LiveSiteContext.Provider>
    );
  }

  // SEPARATE LINK 1: Public Website (/) — No Admin UI shown on public site
  return (
    <LiveSiteContext.Provider value={liveConfig}>
      <div className="min-h-screen flex flex-col bg-[#E8F5E9] text-[#263238]">
        {/* SECTION A — HEADER */}
        <Header logoUrl={images.logoUrl} onDonateClick={() => scrollToElement('support')} />

        {/* MAIN CONTENT */}
        <main className="flex-1">
          {/* SECTION B & C — HERO & INTRODUCTION TO MENTAL HEALTH */}
          <HeroSection
            images={images}
            onSponsorMealClick={handleSponsorMealNavigate}
            onContactClick={() => scrollToElement('contact')}
          />

          {/* SECTION D — ABOUT US, HISTORY & IMPACT SINCE 2012 */}
          <AboutSection images={images} />

          {/* SECTION E — MISSION, VISION, CORE VALUES & ORGANOGRAM */}
          <MissionVision />

          {/* SECTION F — SERVICES, REHABILITATION PRINCIPLES, HEALTH, SUSTAINABILITY & TRAINING */}
          <ServicesGrid images={images} onSponsorMealClick={handleSponsorMealNavigate} />

          {/* SECTION G — SUPPORT & GENEROSITY */}
          <DonationCards
            onBookMealClick={handleSponsorMealNavigate}
            onSponsorMedicinesClick={handleSponsorMedicinesNavigate}
            onViewBankDetailsClick={() => setIsBankModalOpen(true)}
          />

          {/* SECTION H — ANNADANAM & SUPPORT DESK */}
          <SponsorshipForm
            preselectedOccasion={preselectedOccasion}
            preselectedSponsorshipType={preselectedSponsorshipType}
            onViewBankDetailsClick={() => setIsBankModalOpen(true)}
          />

          {/* SECTION I — LIFE AT SNEHATHEERAM, DAILY ROUTINE & PRAYER OFFERING */}
          <PrayerOffering images={images} onPrayerInquiryClick={handlePrayerOfferingNavigate} />

          {/* SECTION J — CONTACT & LOCATION */}
          <ContactSection />
        </main>

        {/* SECTION K — FOOTER */}
        <Footer
          logoUrl={images.logoUrl}
          onOpenBankModal={() => setIsBankModalOpen(true)}
        />

        {/* PERSISTENT FLOATING WHATSAPP CONTACT & MOBILE BOTTOM BAR */}
        <WhatsAppFloatingButton />
        <MobileNavigation activeSection={activeSection} />

        {/* ACCESSIBLE DIALOGS */}
        <BankDetailsModal isOpen={isBankModalOpen} onClose={() => setIsBankModalOpen(false)} />
      </div>
    </LiveSiteContext.Provider>
  );
}
