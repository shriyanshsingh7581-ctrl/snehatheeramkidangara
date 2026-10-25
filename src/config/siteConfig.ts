export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: 'Home' | 'Stethoscope' | 'HeartHandshake' | 'Utensils' | 'Sparkles' | 'ChefHat' | 'Activity';
}

export interface SiteImagesConfig {
  logoUrl: string;
  heroSanctuary: {
    url: string;
    alt: string;
    caption: string;
  };
  everyMotherLove: {
    url: string;
    alt: string;
    caption: string;
  };
  kuttanadCampus: {
    url: string;
    alt: string;
    caption: string;
  };
  nutritiousMeals: {
    url: string;
    alt: string;
    caption: string;
  };
}

export interface VerifiedBankDetails {
  /**
   * Leave isConfigured as false until official bank/UPI details are verified
   * in writing by Snehatheeram Kidangara administration.
   * Never fabricate account numbers, IFSC codes, or UPI IDs.
   */
  isConfigured: boolean;
  accountName?: string;
  bankName?: string;
  branchName?: string;
  accountNumber?: string;
  ifscCode?: string;
  upiId?: string;
}

export const DEFAULT_IMAGES: SiteImagesConfig = {
  logoUrl: '/favicon.svg',
  heroSanctuary: {
    url: '/images/hero-sanctuary.svg',
    alt: 'Illustration of Snehatheeram Kidangara sanctuary courtyard in Kuttanad, Alappuzha where Sisters care for elderly mothers in a peaceful environment',
    caption: 'Illustrative representation · Peaceful sanctuary environment in Kidangara, Kuttanad',
  },
  everyMotherLove: {
    url: '/images/every-mother-love.svg',
    alt: 'Illustration representing compassionate care and family belonging provided by the Sisters of St. Charles Borromeo',
    caption: 'Illustrative representation · Dedicated service by St. Joseph Province, Changanassery',
  },
  kuttanadCampus: {
    url: '/images/kuttanad-campus.svg',
    alt: 'Illustration of the serene Kuttanad campus of Pope John XXIII Rehabilitation & Old Age Women Care Center',
    caption: 'Illustrative representation · Near Kidangara Bridge, Changanassery-Alappuzha Road',
  },
  nutritiousMeals: {
    url: '/images/nutritious-meals.svg',
    alt: 'Illustration of warm, freshly prepared Annadanam meals served with love and hygiene',
    caption: 'Illustrative representation · Freshly prepared daily meals for resident mothers',
  },
};

export const SITE_CONFIG = {
  name: 'Snehatheeram Kidangara',
  shortReferenceName: 'Snehatheeram (Pope John XXIII Rehabilitation Centre)',
  fullName: 'Pope John XXIII Rehabilitation & Old Age Women Care Center',
  tagline: 'A Home of Love, Dignity, and Care for Elderly and Destitute Women.',
  description:
    'Providing a safe sanctuary, compassionate medical care, and a loving family environment for abandoned and needy elderly mothers in Kuttanad, Alappuzha.',
  identity:
    'A charitable old-age home and rehabilitation centre serving elderly women who are destitute, abandoned, or facing physical and mental challenges.',
  management: {
    province: 'St. Joseph Province, Changanassery',
    congregation: 'Sisters of St. Charles Borromeo',
  },
  location: {
    shortLocation: 'Kidangara, Kuttanad, Alappuzha, Kerala, India',
    addressLines: [
      'Ward No. 9, Panchayat Road,',
      'Kidangara P.O., Kuttanad Taluk,',
      'Alappuzha District, Kerala - 686 102.',
    ],
    fullAddressSingleLine:
      'Ward No. 9, Panchayat Road, Kidangara P.O., Kuttanad Taluk, Alappuzha District, Kerala - 686 102.',
    landmark: 'Near Kidangara Bridge, Changanassery-Alappuzha Road.',
    coordinates: {
      lat: 9.42055,
      lng: 76.49025,
      display: '9.42055° N, 76.49025° E',
    },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=9.42055,76.49025',
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=9.42055,76.49025',
  },
  contact: {
    whatsappDisplay: '+91 9400272087',
    whatsappNumberClean: '919400272087',
    primaryPhoneTel: '+919400272087',
    landlineDisplay: '0477-2713871',
    landlineTel: '+914772713871',
    provinceDisplay: '0481-2721808',
    provinceTel: '+914812721808',
    email: 'sanjochry@gmail.com',
  },
  visitingHours: {
    title: 'Visiting Hours',
    description:
      'We welcome well-wishers, families, and student groups to spend time with our mothers.',
    schedule: '9:30 AM – 5:00 PM (Daily)',
    note: 'Visitors are requested to contact the centre in advance to confirm arrangements before travelling.',
  },
  heroHighlights: [
    {
      label: '24/7 Nursing & Care',
      detail: 'Dedicated round-the-clock supervision',
    },
    {
      label: '100% Compassionate Service',
      detail: 'Managed by Sisters of St. Charles Borromeo',
    },
    {
      label: 'Kuttanad, Kidangara, Alappuzha',
      detail: 'Peaceful sanctuary near Kidangara Bridge',
    },
  ],
  aboutHighlights: [
    {
      title: 'Compassionate Sisters',
      description:
        'Devoted daily care and personal attention from the Sisters of St. Joseph Province, Changanassery (Sisters of St. Charles Borromeo).',
    },
    {
      title: 'Peaceful Kuttanad Environment',
      description:
        'Set amidst the calm natural surroundings of Kidangara in Kuttanad Taluk, fostering serenity and emotional healing.',
    },
    {
      title: 'Holistic Rehabilitation',
      description:
        'Supporting destitute and abandoned elderly women facing physical frailty or mental challenges with dignity and family warmth.',
    },
  ],
  mission:
    'To provide shelter, nutritious food, clothing, ongoing medical attention, and spiritual and emotional support to destitute elderly women, caring for them as our own mothers in an atmosphere of peace and dignity.',
  vision:
    'A society where every elderly woman is valued, loved, and cared for, ensuring that no mother spends her twilight years in loneliness or neglect.',
  services: [
    {
      id: 'safe-shelter',
      number: '01',
      title: '24x7 Safe Shelter',
      description:
        'A peaceful, hygienic, and secure living environment surrounded by nature in Kidangara.',
      iconName: 'Home',
    },
    {
      id: 'medical-nursing',
      number: '02',
      title: 'Medical & Nursing Care',
      description:
        'Regular health check-ups, timely medication, doctor visits, and dedicated 24-hour nursing care for bedridden residents.',
      iconName: 'Stethoscope',
    },
    {
      id: 'attentive-support',
      number: '03',
      title: '24/7 Attentive Support',
      description:
        'Continuous attention and compassionate support for residents according to their care needs.',
      iconName: 'HeartHandshake',
    },
    {
      id: 'nutritious-diet',
      number: '04',
      title: 'Nutritious Diet',
      description:
        'Freshly prepared, balanced, and easily digestible meals tailored to the dietary needs of senior women.',
      iconName: 'Utensils',
    },
    {
      id: 'emotional-spiritual',
      number: '05',
      title: 'Emotional & Spiritual Support',
      description:
        'Daily prayers, counseling, recreational activities, and community visits to help overcome loneliness and depression.',
      iconName: 'Sparkles',
    },
    {
      id: 'hygienic-kitchen',
      number: '06',
      title: 'Hygienic Kitchen',
      description:
        "Maintain a clean food preparation environment that supports residents' health, hygiene, and comfort.",
      iconName: 'ChefHat',
    },
    {
      id: 'rehabilitation-services',
      number: '07',
      title: 'Rehabilitation Services',
      description:
        'Specialized care and therapy for women recovering from physical ailments or mental trauma.',
      iconName: 'Activity',
    },
  ] as ServiceItem[],
  occasions: [
    'Birthday Celebration',
    'Wedding Anniversary',
    'Memorial / Remembrance',
    'Special Prayer Offering',
    'Other',
  ],
  sponsorshipTypes: [
    'Full Day Meal (Breakfast, Lunch, Tea & Dinner)',
    'Breakfast',
    'Lunch',
    'Tea / Evening Refreshment',
    'Dinner',
    'Medical Sponsorship',
    'General Support',
  ],
  bankDetails: {
    isConfigured: false,
  } as VerifiedBankDetails,
};
