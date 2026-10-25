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
import { MediaConfigModal } from './components/MediaConfigModal';
import { useMediaConfig } from './hooks/useMediaConfig';

export default function App() {
  const { images, updateImages, resetImages } = useMediaConfig();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  const [preselectedOccasion, setPreselectedOccasion] = useState<string | null>(null);
  const [preselectedSponsorshipType, setPreselectedSponsorshipType] = useState<string | null>(
    null
  );

  useEffect(() => {
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
  }, []);

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
    setPreselectedSponsorshipType('Medical Sponsorship');
    scrollToElement('annadanam-desk');
  };

  const handlePrayerOfferingNavigate = () => {
    setPreselectedOccasion('Special Prayer Offering');
    scrollToElement('annadanam-desk');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E8F5E9] text-[#1B5E20]">
      {/* SECTION A — HEADER */}
      <Header onDonateClick={() => scrollToElement('support')} />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {/* SECTION B & C — HERO & EVERY MOTHER DESERVES LOVE */}
        <HeroSection
          images={images}
          onSponsorMealClick={handleSponsorMealNavigate}
          onContactClick={() => scrollToElement('contact')}
        />

        {/* SECTION D — ABOUT OUR SANCTUARY */}
        <AboutSection images={images} />

        {/* SECTION E — MISSION AND VISION */}
        <MissionVision />

        {/* SECTION F — OUR SERVICES & FACILITIES */}
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

        {/* SECTION I — SPECIAL PRAYER OFFERING */}
        <PrayerOffering images={images} onPrayerInquiryClick={handlePrayerOfferingNavigate} />

        {/* SECTION J — CONTACT & LOCATION */}
        <ContactSection />
      </main>

      {/* SECTION K — FOOTER */}
      <Footer
        logoUrl={images.logoUrl}
        onOpenBankModal={() => setIsBankModalOpen(true)}
        onOpenMediaModal={() => setIsMediaModalOpen(true)}
      />

      {/* PERSISTENT FLOATING WHATSAPP CONTACT & MOBILE BOTTOM BAR */}
      <WhatsAppFloatingButton />
      <MobileNavigation activeSection={activeSection} />

      {/* ACCESSIBLE DIALOGS */}
      <BankDetailsModal isOpen={isBankModalOpen} onClose={() => setIsBankModalOpen(false)} />
      <MediaConfigModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        images={images}
        onSave={updateImages}
        onReset={resetImages}
      />
    </div>
  );
}
