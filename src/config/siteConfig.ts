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
  iconName:
    | 'Home'
    | 'Stethoscope'
    | 'HeartHandshake'
    | 'Utensils'
    | 'Sparkles'
    | 'ChefHat'
    | 'Activity';
}

export interface SiteImagesConfig {
  logoUrl: string;
  heroSanctuary: PhotoAsset;
  everyMotherLove: PhotoAsset;
  kuttanadCampus: PhotoAsset;
  psychosocialRehab: PhotoAsset;
  mentalHealthCounselling: PhotoAsset;
  vocationalTraining: PhotoAsset;
  medicalNursing: PhotoAsset;
  clinicalCheckup: PhotoAsset;
  recreationalActivities: PhotoAsset;
  sustainabilityKitchen: PhotoAsset;
  nutritiousMeals: PhotoAsset;
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

/**
 * All 12 client-provided photographs are mapped individually to their
 * dedicated sections with zero repetition across the website.
 */
export const DEFAULT_IMAGES: SiteImagesConfig = {
  logoUrl: '/assets/aistudio/logo_extracted_f3521143.png',
  heroSanctuary: {
    url: '/assets/aistudio/IMG-20261026-WA0030_6233e329.jpg',
    alt: 'Residents, Sisters, Priest, and staff standing together in front of Snehatheeram Kidangara Rehabilitation Centre',
    caption: 'Snehatheeram Kidangara — John Paul XXIII Psychosocial Rehabilitation Centre',
  },
  everyMotherLove: {
    url: '/assets/aistudio/IMG-20261026-WA0029_d413bd8c.jpg',
    alt: 'Sisters, Priest, and residents beneath the Snehatheeram Kidangara Psycho Social Rehabilitation Centre For Women board and inauguration plaque',
    caption: 'Established 2012 · Rev. Fr. Francis Vaniapurakal Memorial Home for the Homeless',
  },
  kuttanadCampus: {
    url: '/assets/aistudio/7Q2A2590_858511fe.JPG',
    alt: 'Sister assisting an elderly resident in a wheelchair inside the accessible residential block at Snehatheeram',
    caption: 'Facilities & Accommodation · Barrier-free, compassionate residential care',
  },
  psychosocialRehab: {
    url: '/assets/aistudio/7Q2A2637_39d0a060.JPG',
    alt: 'Group psychosocial rehabilitation and interactive therapy session with residents in the community hall',
    caption: 'Psychosocial Rehabilitation · Group therapy & social reintegration',
  },
  mentalHealthCounselling: {
    url: '/assets/aistudio/7Q2A2569_33e33c8b.JPG',
    alt: 'Individual mental health support, counselling, and psychological assessment session with a resident',
    caption: 'Mental Health Support & Counselling · Personalized assessment & care',
  },
  vocationalTraining: {
    url: '/assets/aistudio/7Q2A2610_8555403e.JPG',
    alt: 'Residents engaged in vocational training and life-skills development making beaded rosaries by hand',
    caption: 'Vocational Training & Life Skills · Craft making & occupational therapy',
  },
  medicalNursing: {
    url: '/assets/aistudio/7Q2A2563_d68c28ba.JPG',
    alt: 'Medical professional and clinical nurse checking blood pressure of a resident at Snehatheeram',
    caption: 'Medical Care · Regular clinical check-ups & psychiatric supervision',
  },
  clinicalCheckup: {
    url: '/assets/aistudio/7Q2A2564_6163c16e.JPG',
    alt: 'Healthcare nurse conducting a vital signs and stethoscope check-up for a resident mother',
    caption: 'Health & Safety Measures · Continuous health monitoring & nursing care',
  },
  recreationalActivities: {
    url: '/assets/aistudio/7Q2A2645_d172c330.JPG',
    alt: 'Residents clapping, singing, and dancing together during recreational and cultural activities',
    caption: 'Recreational & Cultural Activities · Music, dance & joyful fellowship',
  },
  sustainabilityKitchen: {
    url: '/assets/aistudio/7Q2A2711_3b8d0ebf.JPG',
    alt: 'Sister and residents preparing fresh local vegetables together in the kitchen',
    caption: 'Organic Farming, Kitchen & Life Skills · Sustainable daily living in Kuttanad',
  },
  nutritiousMeals: {
    url: '/assets/aistudio/7Q2A2768_f2a7b43e.JPG',
    alt: 'Residents enjoying freshly prepared nutritious meals together in the Snehatheeram dining hall',
    caption: 'Nutritious Diet & Annadanam · Wholesome daily meals served with love',
  },
  spiritualSupport: {
    url: '/assets/aistudio/7Q2A2759_f2f58fae.JPG',
    alt: 'Priest, Sister, and residents gathered in prayer before meals in the community dining hall',
    caption: 'Life at Snehatheeram · Daily prayer, spiritual renewal & community living',
  },
};

export const SITE_CONFIG = {
  name: 'Snehatheeram',
  shortReferenceName: 'John Paul XXIII Rehabilitation Centre',
  fullName: 'Snehatheeram – Rev. Fr. Francis Vaniapurakal Memorial Home for the Homeless',
  managingOrganization: 'John Paul XXIII Rehabilitation Centre Trust',
  organizationType: 'Psychosocial Rehabilitation Center for Women',
  contactOrganization: 'John Paul XXIII Rehabilitation Centre',
  supportingQuote: '"Serving humanity is serving God."',
  memorialTitle: 'Rev. Fr. Francis Vaniapurakal Memorial Home for the Homeless',
  tagline: 'Empowering Women – Restoring Hope – Rebuilding Lives',
  description:
    'Providing holistic psychosocial rehabilitation, compassionate medical and psychiatric care, vocational skill development, and a loving home for destitute, abandoned, and mentally challenged women in Kidangara, Kuttanad, Alappuzha.',
  mentalHealthIntro: {
    heading: 'Understanding Mental Health & Our Calling',
    lead: 'Mental health is an integral foundation of human dignity—shaping how individuals think, feel, connect with others, and rebuild their lives.',
    body: 'Women experiencing severe mental illness, emotional trauma, homelessness, and social abandonment often face stigma and neglect. At Snehatheeram, we bridge the gap between clinical treatment and social reintegration by offering a stigma-free, family-like environment where every woman is respected, heard, and empowered on her journey to recovery.',
  },
  ourFocus: [
    'Comprehensive psychosocial rehabilitation for destitute, abandoned, and mentally ill women.',
    'Restoring human dignity, self-reliance, and emotional stability through structured therapeutic care.',
    'Preventing homelessness and social exclusion by providing a safe, permanent or transitional sanctuary.',
    'Facilitating family tracing, counselling, and safe reintegration with loved ones whenever possible.',
  ],
  aboutHistory: {
    establishedYear: '2012',
    inauguratedBy: 'Mar Joseph Perumthottam (Metropolitan Archbishop of Changanacherry)',
    memorialName: 'Rev. Fr. Francis Vaniapurakal Memorial Home for the Homeless',
    story:
      'Founded in 2012 in the serene backwater village of Kidangara in Kuttanad Taluk, Alappuzha District, Snehatheeram (John Paul XXIII Rehabilitation Centre) was established as the Rev. Fr. Francis Vaniapurakal Memorial Home for the Homeless and inaugurated by Mar Joseph Perumthottam. Administered by the Sisters of St. Charles Borromeo (St. Joseph Province, Changanassery), the centre began with a mission to rescue and rehabilitate wandering, destitute, and mentally challenged women who had nowhere else to turn.',
    growth:
      'Over more than a decade of dedicated service since 2012, Snehatheeram has grown into a full-fledged Psychosocial Rehabilitation Centre for Women—combining psychiatric nursing, psychological counselling, occupational therapy, organic farming, and spiritual care.',
  },
  management: {
    province: 'John Paul XXIII Rehabilitation Centre Trust',
    congregation: 'Psychosocial Rehabilitation Center for Women',
  },
  location: {
    shortLocation: 'Kidangara P.O., Kuttanad Taluk, Alappuzha District, Kerala – 686107',
    addressLines: [
      'Kidangara P.O., Kuttanad Taluk,',
      'Alappuzha District, Kerala – 686107',
    ],
    fullAddressSingleLine:
      'John Paul XXIII Rehabilitation Centre, Kidangara P.O., Kuttanad Taluk, Alappuzha District, Kerala – 686107',
    landmark: 'John Paul XXIII Rehabilitation Centre Trust · Psychosocial Rehabilitation Center for Women',
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
    secondaryPhoneDisplay: '+91 7511133810',
    secondaryPhoneTel: '+917511133810',
    landlineDisplay: '+91 7511133810',
    landlineTel: '+917511133810',
    provinceDisplay: '+91 9400272087',
    provinceTel: '+919400272087',
    email: 'kidangarasnehatheeram@gmail.com',
  },
  bibleQuotation: {
    verse:
      '“Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me.”',
    reference: 'Matthew 25:40',
  },
  visitingHours: {
    title: 'Visiting Hours & Community Visits',
    description:
      'We welcome well-wishers, families, social work trainees, and student groups to spend meaningful time with our residents.',
    schedule: '9:30 AM – 5:00 PM (Daily)',
    note: 'Visitors and academic groups are requested to contact the centre in advance to coordinate sessions and visiting schedules.',
  },
  heroHighlights: [
    {
      label: 'Psychosocial Rehabilitation Center for Women',
      detail: 'Empowering Women – Restoring Hope – Rebuilding Lives',
    },
    {
      label: 'John Paul XXIII Rehabilitation Centre Trust',
      detail: 'Serving humanity is serving God.',
    },
    {
      label: 'Kidangara P.O., Kuttanad Taluk',
      detail: 'Alappuzha District, Kerala – 686107',
    },
  ],
  aboutHighlights: [
    {
      title: 'Our Focus & Mental Health Care',
      description:
        'Rescuing and rehabilitating destitute and mentally challenged women through individualized care plans, counselling, and psychiatric support.',
    },
    {
      title: 'Compassionate Sisters & Multidisciplinary Team',
      description:
        'Led by the Sisters of St. Charles Borromeo alongside social workers, psychologists, nurses, and occupational therapists.',
    },
    {
      title: 'Dignity, Recovery & Reintegration',
      description:
        'Empowering residents through life-skills training, craft making, organic farming, and family reunification programs.',
    },
  ],
  mission:
    'To provide safe shelter, nutritious food, comprehensive medical and psychiatric treatment, psychosocial counselling, and vocational rehabilitation to destitute, abandoned, and mentally challenged women—restoring their health, dignity, and rightful place in family and society.',
  vision:
    'A compassionate and inclusive society where every woman facing mental health challenges or destitution is embraced with love, treated with dignity, and empowered to live a purposeful, healed, and fulfilling life.',
  coreValues: [
    {
      title: 'Unconditional Love & Compassion',
      description: 'Caring for every resident as a cherished member of our own family.',
    },
    {
      title: 'Human Dignity & Respect',
      description: 'Upholding the rights, privacy, and intrinsic worth of every woman.',
    },
    {
      title: 'Holistic Healing',
      description: 'Addressing physical, psychological, social, and spiritual well-being together.',
    },
    {
      title: 'Empowerment & Self-Reliance',
      description: 'Nurturing practical life skills and creative capabilities for independent living.',
    },
    {
      title: 'Integrity & Stewardship',
      description: 'Serving transparently with accountability to the community and well-wishers.',
    },
    {
      title: 'Inclusiveness & Non-Discrimination',
      description: 'Welcoming women in need regardless of caste, creed, religion, or background.',
    },
  ],
  organogram: {
    title: 'Organogram',
    levels: [
      '1. Trustees / Board of Management – John Paul XXIII Rehabilitation Centre Trust',
      '2. Executive Management – President, Secretary, Members',
      '3. Management Team – Director, Manager, Sisters of Destitute',
    ],
    departmentsHeading: '4. Departments:',
    departments: [
      {
        name: 'Administration:',
        role: 'Coordinator, Accountant, Office Staff',
      },
      {
        name: 'Clinical & Care:',
        role: 'Nurses, Psychiatrist (visiting), Counsellor cum Social worker',
      },
      {
        name: 'Rehabilitation & Training:',
        role: 'Psychiatric Social Worker, Trainers, Trainee, Agricultural Staff',
      },
      {
        name: 'Support:',
        role: 'Kitchen, Housekeeping, Maintenance, Watch Man',
      },
    ],
  },
  rehabilitationPrinciples: [
    {
      step: '01',
      title: 'Person-Centered Individual Care Plans',
      description:
        'Every resident undergoes a thorough medical and psychosocial assessment to tailor therapy to her unique recovery pace.',
    },
    {
      step: '02',
      title: 'Therapeutic Community Living',
      description:
        'Structured group interactions, shared responsibilities, and peer fellowship rebuild social confidence and belonging.',
    },
    {
      step: '03',
      title: 'Occupational & Creative Engagement',
      description:
        'Hands-on craft making, gardening, and culinary participation enhance cognitive focus, motor skills, and self-worth.',
    },
    {
      step: '04',
      title: 'Family Reintegration & Follow-Up',
      description:
        'Continuous efforts to trace families, counsel relatives, and reunite recovered women with ongoing post-discharge follow-up.',
    },
  ],
  dailyRoutine: [
    { time: '5:30 AM – 7:00 AM', activity: 'Wake-up, personal hygiene, morning prayer & meditation' },
    { time: '7:00 AM – 8:00 AM', activity: 'Morning physical exercise, yoga & walk in the green campus' },
    { time: '8:00 AM – 9:00 AM', activity: 'Nutritious breakfast & scheduled morning medication' },
    { time: '9:30 AM – 12:30 PM', activity: 'Occupational therapy, vocational training, counselling & group sessions' },
    { time: '12:30 PM – 2:00 PM', activity: 'Community prayer before meals, wholesome lunch & afternoon rest' },
    { time: '2:30 PM – 4:30 PM', activity: 'Recreational & cultural activities, music, games & organic gardening' },
    { time: '4:30 PM – 6:30 PM', activity: 'Evening tea, outdoor relaxation & personal care' },
    { time: '6:30 PM – 8:30 PM', activity: 'Evening prayer service, dinner, night medication & peaceful rest' },
  ],
  healthAndSafety: [
    '24-hour supervision by qualified nurses and trained care attendants.',
    'Periodic psychiatric and general medical evaluations with individualized medication charts.',
    'Barrier-free corridors, wheelchair accessibility, anti-skid flooring, and safe dormitory layouts.',
    'Strict hygiene protocols in kitchen, dining, water purification, and sanitation facilities.',
    'Emergency medical tie-ups with nearby hospitals in Changanassery and Alappuzha.',
  ],
  sustainabilityEfforts: [
    {
      title: 'Organic Farming & Kitchen Garden',
      description:
        'Cultivating pesticide-free vegetables, bananas, tubers, and leafy greens on campus—providing fresh produce for the kitchen while offering therapeutic gardening for residents.',
    },
    {
      title: 'Eco-Friendly Kuttanad Campus',
      description:
        'Composting biodegradable kitchen waste, maintaining lush green shade trees, and practicing responsible water and resource conservation.',
    },
  ],
  impactSince2012: [
    {
      metric: '2012',
      label: 'Year Established',
      detail: 'Over a decade of uninterrupted service in Kidangara, Kuttanad',
    },
    {
      metric: '100+',
      label: 'Women Rehabilitated & Cared For',
      detail: 'Safe shelter, psychiatric recovery & dignified living provided since inception',
    },
    {
      metric: 'Family Reunions',
      label: 'Successful Reintegrations',
      detail: 'Recovered mothers safely reunited with their families across India',
    },
    {
      metric: '24×7',
      label: 'Holistic Care & Protection',
      detail: '365 days of nutritious food, medicine, counselling, and love',
    },
  ],
  communityAndTraining: {
    title: 'Community & Training Opportunities',
    description:
      'We collaborate with hospitals, NGOs, universities, and government bodies for comprehensive rehabilitation.',
    lead: 'We also offer:',
    programs: [
      'Volunteer opportunities',
      'Training & internships for BSW, MSW, and Psychology students',
    ],
  },
  services: [
    {
      id: 'safe-shelter',
      number: '01',
      title: '24x7 Safe Residential Shelter',
      description:
        'Well-ventilated dormitories, barrier-free pathways, and a calm, secure home environment in Kidangara.',
      iconName: 'Home',
    },
    {
      id: 'medical-nursing',
      number: '02',
      title: 'Medical & Psychiatric Care',
      description:
        'Regular doctor and psychiatrist visits, blood pressure and vital monitoring, timely medication, and 24-hour nursing supervision.',
      iconName: 'Stethoscope',
    },
    {
      id: 'psychosocial-counselling',
      number: '03',
      title: 'Mental Health Support & Counselling',
      description:
        'Individual psychological assessments, empathetic counselling, and group therapy to heal trauma and restore emotional balance.',
      iconName: 'HeartHandshake',
    },
    {
      id: 'vocational-rehab',
      number: '04',
      title: 'Vocational Training & Life Skills',
      description:
        'Occupational therapy through rosary and bead making, handicrafts, vegetable preparation, and daily self-care skills.',
      iconName: 'Activity',
    },
    {
      id: 'nutritious-diet',
      number: '05',
      title: 'Nutritious Diet & Annadanam',
      description:
        'Freshly cooked, balanced meals and seasonal organic produce served daily in our clean community dining hall.',
      iconName: 'Utensils',
    },
    {
      id: 'recreational-spiritual',
      number: '06',
      title: 'Recreational, Cultural & Spiritual Life',
      description:
        'Daily interfaith prayers, music, dance, festival celebrations, and group games that nurture joy and companionship.',
      iconName: 'Sparkles',
    },
    {
      id: 'organic-kitchen',
      number: '07',
      title: 'Hygienic Kitchen & Organic Farming',
      description:
        'Sustainable kitchen gardens, participatory food preparation, and strict sanitation supporting resident health.',
      iconName: 'ChefHat',
    },
  ] as ServiceItem[],
  occasions: [
    'Birthday Celebration',
    'Wedding Anniversary',
    'Memorial / Remembrance',
    'Special Prayer Offering',
    'Festival / Thanksgiving Sponsorship',
    'Other',
  ],
  sponsorshipTypes: [
    'Full Day Meal (Breakfast, Lunch, Tea & Dinner)',
    'Breakfast',
    'Lunch',
    'Tea / Evening Refreshment',
    'Dinner',
    'Medical & Psychiatric Care Sponsorship',
    'Rehabilitation & Vocational Materials Support',
    'General Support',
  ],
  bankDetails: {
    isConfigured: false,
  } as VerifiedBankDetails,
};
