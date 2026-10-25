export interface PhotoAsset {
  url: string;
  alt: string;
  caption?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: 'Home' | 'Stethoscope' | 'HeartHandshake' | 'Utensils' | 'Sparkles' | 'ChefHat' | 'Activity';
}

export interface SiteImagesConfig {
  logoUrl: string;
  heroSanctuary: PhotoAsset;
  everyMotherLove: PhotoAsset;
  kuttanadCampus: PhotoAsset;
  nutritiousMeals: PhotoAsset;
  elderlyCare: PhotoAsset;
  digitalLearning: PhotoAsset;
  medicalNursing: PhotoAsset;
  spiritualSupport: PhotoAsset;
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
    url: '/assets/aistudio/file_00000000cae08211bd5827b5c5a6ec00_d61da64e.png',
    alt: 'Sister walking arm-in-arm with smiling elderly mothers in front of Snehatheeram Kidangara Care Center',
    caption: 'Compassionate care & family warmth at Snehatheeram Kidangara',
  },
  everyMotherLove: {
    url: '/assets/aistudio/photo_about_us.png',
    alt: 'Sister walking with elderly mothers along the sunlit garden pathway at Snehatheeram',
    caption: 'Dedicated service by St. Joseph Province, Changanassery',
  },
  kuttanadCampus: {
    url: '/assets/aistudio/photo_care_home.png',
    alt: 'Snehatheeram Care Home building surrounded by lush coconut palms and flowering gardens in Kidangara, Kuttanad',
    caption: 'Care Home Sanctuary · Near Kidangara Bridge, Changanassery-Alappuzha Road',
  },
  elderlyCare: {
    url: '/assets/aistudio/photo_elderly_care.png',
    alt: 'Sister holding hands and comforting an elderly mother in the clean, bright care home dormitory',
    caption: 'Elderly Care · 24/7 Attentive Support',
  },
  medicalNursing: {
    url: '/assets/aistudio/photo_medical_nursing.png',
    alt: 'Nurse conducting a medical check-up with a stethoscope while a Sister comforts an elderly resident mother',
    caption: 'Medical & Nursing Care · 24-Hour Supervision',
  },
  digitalLearning: {
    url: '/assets/aistudio/photo_digital_learning.png',
    alt: 'Elderly mothers joyfully participating in Digital Learning and computer sessions',
    caption: 'Digital Learning & Holistic Rehabilitation',
  },
  nutritiousMeals: {
    url: '/assets/aistudio/file_00000000640c8211ab96447b2ff4d793_3c5490d2.png',
    alt: 'Sister serving freshly prepared, nutritious Annadanam meals to smiling resident mothers',
    caption: 'Annadanam · Freshly prepared daily meals',
  },
  spiritualSupport: {
    url: '/assets/aistudio/photo_spiritual_support.png',
    alt: 'Sister and elderly mothers praying together peacefully in the Snehatheeram chapel',
    caption: 'Spiritual Support · Daily Prayer Service',
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
