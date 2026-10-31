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
  isConfigured: boolean;
  accountName?: string;
  bankName?: string;
  branchName?: string;
  accountNumber?: string;
  ifscCode?: string;
  upiId?: string;
}

export const DEFAULT_IMAGES: SiteImagesConfig = {
  logoUrl: '/assets/aistudio/logo_extracted_f3521143.png',
  heroSanctuary: {
    url: '/assets/aistudio/hero_rehab_support.jpg',
    alt: 'Compassionate rehabilitation professional gently holding a woman’s hand and helping her stand up with dignity and care',
    caption:
      'Snehatheeram Psychosocial Rehabilitation Center for Women — Empowering Women – Restoring Hope – Rebuilding Lives',
  },
  everyMotherLove: {
    url: '/assets/aistudio/IMG-20261026-WA0029_d413bd8c.jpg',
    alt: 'Sisters, Priest, and residents beneath the Psycho Social Rehabilitation Centre For Women board and inauguration plaque',
    caption:
      'Inaugurated on 8 September 2012 · Rev. Fr. Francis Vaniapurakal Memorial Home for the Homeless',
  },
  kuttanadCampus: {
    url: '/assets/aistudio/7Q2A2590_858511fe.JPG',
    alt: 'Sister assisting an elderly resident in a wheelchair inside the accessible residential block',
    caption: 'Facilities · Accommodation for 34 residents with attached bathrooms and sanitation',
  },
  psychosocialRehab: {
    url: '/assets/aistudio/7Q2A2637_39d0a060.JPG',
    alt: 'Group psychosocial rehabilitation and interactive therapy session with residents in the community hall',
    caption: 'Psychosocial rehabilitation · Group therapy and psychoeducation',
  },
  mentalHealthCounselling: {
    url: '/assets/aistudio/7Q2A2569_33e33c8b.JPG',
    alt: 'Individual mental health support, counselling, and psychological assessment session with a resident',
    caption: 'Mental health support & counselling · Psycho Therapies (CBT, REBT, DBT, etc..)',
  },
  vocationalTraining: {
    url: '/assets/aistudio/7Q2A2610_8555403e.JPG',
    alt: 'Residents engaged in vocational training and life-skills development making beaded rosaries by hand',
    caption: 'Vocational training (tailoring, handicrafts, cooking, gardening) & Life skills training',
  },
  medicalNursing: {
    url: '/assets/aistudio/7Q2A2563_d68c28ba.JPG',
    alt: 'Medical professional and clinical nurse checking blood pressure of a resident',
    caption: 'Medical care and medication management · Regular medical check-ups',
  },
  clinicalCheckup: {
    url: '/assets/aistudio/7Q2A2564_6163c16e.JPG',
    alt: 'Healthcare nurse conducting a vital signs and stethoscope check-up for a resident mother',
    caption: 'Health & Safety Measures · Psychological first aid and crisis intervention',
  },
  recreationalActivities: {
    url: '/assets/aistudio/7Q2A2645_d172c330.JPG',
    alt: 'Residents clapping, singing, and dancing together during recreational and cultural activities',
    caption: 'Recreational and cultural programs · International Observance Day Celebrations',
  },
  sustainabilityKitchen: {
    url: '/assets/aistudio/7Q2A2711_3b8d0ebf.JPG',
    alt: 'Sister and residents preparing fresh local vegetables together in the kitchen',
    caption: 'Location & Sustainability Efforts · 5 acres of paddy cultivation & organic vegetable gardens',
  },
  nutritiousMeals: {
    url: '/assets/aistudio/7Q2A2768_f2a7b43e.JPG',
    alt: 'Residents enjoying freshly prepared nutritious meals together in the dining hall',
    caption: 'Nutritious meals from organic farm produce · Balanced diet for immunity support',
  },
  spiritualSupport: {
    url: '/assets/aistudio/7Q2A2759_f2f58fae.JPG',
    alt: 'Priest, Sister, and residents gathered in prayer before meals in the community dining hall',
    caption: 'Life at Snehatheeram · Morning prayer & meditation and evening reflection',
  },
};

export const SITE_CONFIG = {
  name: 'Pope John XXIII Rehabilitation centre Trust',
  shortReferenceName: 'Pope John XXIII Rehabilitation centre Trust',
  brochureTitle: 'Snehatheeram Psychosocial Rehabilitation Center for Women',
  fullName:
    'Snehatheeram – Rev. Fr. Francis Vaniapurakal Memorial Home for the Homeless',
  managingOrganization: 'Pope John XXIII Rehabilitation centre Trust',
  organizationType: 'Psychosocial Rehabilitation Center for Women',
  contactOrganization: 'Pope John XXIII Rehabilitation centre Trust',
  supportingQuote: '"Serving humanity is serving God."',
  heroSubtitle: 'A sanctuary of care, compassion, and dignity for women in need.',
  memorialTitle:
    'Pope John XXIII Rehabilitation centre Trust — Snehatheeram – Rev. Fr. Francis Vaniapurakal Memorial Home for the Homeless',
  tagline: 'Empowering Women – Restoring Hope – Rebuilding Lives',
  description:
    'A sanctuary of care, compassion, and dignity for women in need. Snehatheeram – Rev. Fr. Francis Vaniapurakal Memorial Home for the Homeless is a safe and nurturing home for women facing psychosocial challenges, abandonment, or homelessness under the Pope John XXIII Rehabilitation centre Trust at Kidangara P.O., Kuttanad Taluk, Alappuzha District, Kerala.',
  socialMedia: {
    instagram: 'Pope John XXIII Rehabilitation centre Trust, Kidangara',
    facebook: 'Snehatheeram',
  },
  mentalHealthIntro: {
    heading: 'Introduction to Mental Health',
    lead: 'Mental health is an essential component of overall well-being.',
    body: 'According to the World Health Organization (WHO), “Mental health is a state of well-being in which every individual realizes his or her own potential, can cope with the normal stresses of life, can work productively and fruitfully, and is able to make a contribution to her or his community.” At Snehatheeram, we recognize the importance of mental health as a foundation for a meaningful and dignified life.',
  },
  ourFocusSection: {
    heading: 'Our Focus',
    body: 'We are a dedicated psychosocial rehabilitation center that exclusively admits women with psychiatric conditions. Our primary goal is to provide rehabilitation, not acute medical treatment. We focus on recovery-oriented support, helping our residents regain functional abilities, improve quality of life, and reintegrate into their communities.',
  },
  ourFocus: [
    'Dedicated psychosocial rehabilitation center that exclusively admits women with psychiatric conditions.',
    'Primary goal is to provide rehabilitation, not acute medical treatment.',
    'Focus on recovery-oriented support, helping our residents regain functional abilities.',
    'Improve quality of life and reintegrate residents into their communities.',
  ],
  aboutHistory: {
    heading: 'About Us & History',
    establishedDate: '8 September 2012',
    establishedYear: '2012',
    registeredAct: 'Travancore-Cochin Literary and Charitable Societies Act, 1955',
    inauguratedBy:
      'Archbishop Mar Joseph Perumthottam, Metropolitan Archbishop of Changanacherry',
    memorialName: 'Rev. Fr. Francis Vaniapurakal Memorial Home for the Homeless',
    managedBy: 'Archdiocese of Changanacherry',
    story:
      'Snehatheeram – Rev. Fr. Francis Vaniapurakal Memorial Home for the Homeless is a safe and nurturing home for women facing psychosocial challenges, abandonment, or homelessness. It is a dedicated project under the Pope John XXIII Rehabilitation centre Trust, located at Kidangara P.O., Kuttanad Taluk, Alappuzha District, Kerala, and registered under the Travancore-Cochin Literary and Charitable Societies Act, 1955.',
    growth:
      'Founded in loving memory of Rev. Fr. Francis Vaniapurakal, the home was inaugurated on 8 September 2012 by Archbishop Mar Joseph Perumthottam, Metropolitan Archbishop of Changanacherry. The project is managed by the Archdiocese of Changanacherry, providing holistic rehabilitation, empowerment, and reintegration services for women in need.',
  },
  management: {
    province: 'Pope John XXIII Rehabilitation centre Trust',
    congregation:
      'Snehatheeram – Rev. Fr. Francis Vaniapurakal Memorial Home for the Homeless · Managed by the Archdiocese of Changanacherry',
  },
  location: {
    shortLocation:
      'Kidangara P.O., Kuttanad Taluk, Alappuzha District, Kerala – 686107',
    addressLines: [
      'Kidangara P.O., Kuttanad Taluk,',
      'Alappuzha District, Kerala – 686107',
    ],
    fullAddressSingleLine:
      'Pope John XXIII Rehabilitation centre Trust, Kidangara P.O., Kuttanad Taluk, Alappuzha District, Kerala – 686107',
    landmark:
      'Located in the peaceful village of Kidangara, Kuttanad Taluk, Alappuzha District, between the Pampa and Manimala rivers.',
    coordinates: {
      lat: 9.42055,
      lng: 76.49025,
      display: '9.42055° N, 76.49025° E',
    },
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=9.42055,76.49025',
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
      '"I was hungry and you gave me food… I was a stranger and you welcomed me."',
    reference: 'Bible',
  },
  visitingHours: {
    title: 'Visiting Hours & Community Visits',
    description:
      'We collaborate with hospitals, NGOs, universities, and government bodies for comprehensive rehabilitation, welcoming families, volunteers, and students.',
    schedule: '9:30 AM – 5:00 PM (Daily)',
    note: 'Visitors, volunteers, and academic groups (BSW, MSW, Psychology students, and Training for Nurses) are welcome to contact the centre to coordinate visits and internships.',
  },
  heroHighlights: [
    {
      label: 'Psychosocial Rehabilitation Center for Women',
      detail: 'Empowering Women – Restoring Hope – Rebuilding Lives',
    },
    {
      label: 'Pope John XXIII Rehabilitation centre Trust',
      detail: '"Serving humanity is serving God."',
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
        'A dedicated psychosocial rehabilitation center that exclusively admits women with psychiatric conditions—focusing on recovery-oriented support, functional abilities, and community reintegration.',
    },
    {
      title: 'Compassionate Sisters & Multidisciplinary Team',
      description:
        'Dedicated care by the Management Team (Director, Manager, Sisters of Destitute) alongside Nurses, Psychiatrist (visiting), Counsellor cum Social Worker, and Psychiatric Social Worker.',
    },
    {
      title: 'Training for Nurses, BSW, MSW & Psychology Students',
      description:
        'Collaborating with hospitals, NGOs, universities, and government bodies to provide Volunteer opportunities, Training & internships for BSW, MSW, and Psychology students, and Training for Nurses.',
    },
  ],
  mission:
    'To restore dignity, promote recovery, and empower homeless women through compassionate care, therapeutic support, and skill-building.',
  vision:
    'A society where every woman with mental health challenges is respected, supported, and empowered to live a fulfilling life.',
  coreValues: [
    {
      title: 'Compassion and empathy',
      description: 'Caring for every woman with warmth, kindness, and deep understanding.',
    },
    {
      title: 'Respect for human dignity',
      description: 'Honoring the inherent worth and rights of every resident.',
    },
    {
      title: 'Social justice and advocacy',
      description: 'Standing up for vulnerable women facing stigma, abandonment, or homelessness.',
    },
    {
      title: 'Empowerment and independence',
      description: 'Helping residents regain functional abilities and self-reliance.',
    },
    {
      title: 'Holistic well-being',
      description: 'Nurturing mental, physical, emotional, social, and spiritual recovery.',
    },
    {
      title: 'Integrity and transparency',
      description: 'Upholding ethical standards and accountability in all rehabilitation services.',
    },
    {
      title: 'Sustainability and eco-consciousness',
      description: 'Living in harmony with nature through organic farming and sustainable practices.',
    },
  ],
  organogram: {
    title: 'Organogram:',
    levels: [
      '1. Trustees / Board of Management – Pope John XXIII Rehabilitation centre Trust',
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
        role: 'Psychiatric Social Worker , Trainers, Trainee, Agricultural Staff',
      },
      {
        name: 'Support:',
        role: 'Kitchen, Housekeeping, Maintenance, Watch Man',
      },
    ],
  },
  facilities: [
    'Accommodation for 34 residents',
    'Nutritious meals from organic farm produce',
    'Attached bathrooms and sanitation',
    'Common activity hall and prayer room',
    'Kitchen and dining space',
    'Outdoor gardens and recreation areas',
    'Medical & Counselling Services',
  ],
  rehabilitationPrinciples: [
    {
      step: '01',
      title: 'Person-centered care',
      description:
        'Individualized recovery support tailored to each resident’s unique needs and strengths.',
    },
    {
      step: '02',
      title: 'Holistic recovery approach',
      description:
        'Addressing mental, physical, emotional, and social well-being for complete rehabilitation.',
    },
    {
      step: '03',
      title: 'Skill-based empowerment',
      description:
        'Equipping residents with practical life skills and vocational training for independence.',
    },
    {
      step: '04',
      title: 'Community integration',
      description:
        'Supporting residents to reconnect and participate meaningfully in society.',
    },
    {
      step: '05',
      title: 'Family engagement where possible',
      description:
        'Facilitating family liaison, counselling, and safe reintegration with loved ones.',
    },
    {
      step: '06',
      title: 'Non-discrimination and equal opportunity',
      description:
        'Welcoming and supporting women from diverse backgrounds with equal dignity and care.',
    },
  ],
  lifeAtSnehatheeram: {
    heading: 'Life at Snehatheeram',
    description:
      'We provide round-the-clock care for 40 women from diverse backgrounds, many living with psychiatric conditions or physical disabilities.',
  },
  dailyRoutine: [
    {
      time: '01 · Morning',
      activity: 'Morning prayer & meditation',
    },
    {
      time: '02 · Morning Care',
      activity: 'Personal hygiene & health checks',
    },
    {
      time: '03 · Forenoon Session',
      activity: 'Group therapy & skills training',
    },
    {
      time: '04 · Daily Nutrition',
      activity: 'Nutritious meals from organic produce',
    },
    {
      time: '05 · Afternoon Session',
      activity: 'Afternoon vocational/recreational activities',
    },
    {
      time: '06 · Evening',
      activity: 'Evening reflection and relaxation',
    },
  ],
  healthAndSafety: [
    'Regular medical check-ups',
    'Balanced diet for immunity support',
    'Psychological first aid and crisis intervention',
    'Emergency preparedness for floods and disasters',
  ],
  locationAndSustainability: {
    heading: 'Location & Sustainability Efforts',
    description:
      'Located in the peaceful village of Kidangara, Kuttanad Taluk, Alappuzha District, between the Pampa and Manimala rivers. Our sustainability projects include:',
    projects: [
      '5 acres of paddy cultivation',
      'Organic vegetable gardens',
      'Fish ponds',
      'Plans for solar power installation',
    ],
  },
  sustainabilityEfforts: [
    {
      title: '5 acres of paddy cultivation',
      description:
        'Located in the peaceful village of Kidangara, Kuttanad Taluk, Alappuzha District, between the Pampa and Manimala rivers.',
    },
    {
      title: 'Organic vegetable gardens & Fish ponds',
      description:
        'Providing fresh organic farm produce for nutritious daily meals, alongside plans for solar power installation.',
    },
  ],
  impactSince2012: [
    {
      metric: '100+ Women',
      label: 'Sheltered and rehabilitated over 100 women',
      detail: 'Safe shelter, psychosocial recovery, and compassionate care since 8 September 2012',
    },
    {
      metric: 'Family Reintegration',
      label: 'Successfully reintegrated residents with families',
      detail: 'Dedicated family liaison, counselling, and community reintegration support',
    },
    {
      metric: '40 Women',
      label: 'Round-the-clock care for 40 women',
      detail: 'Caring for women from diverse backgrounds living with psychiatric conditions or physical disabilities',
    },
    {
      metric: '34 Residents',
      label: 'Accommodation for 34 residents',
      detail: 'Dedicated residential facilities with attached bathrooms, prayer room, dining, and outdoor gardens',
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
      'Training for Nurses',
    ],
  },
  servicesListExact: [
    'Psychosocial rehabilitation',
    'Mental health support & counselling',
    'Group therapy and psychoeducation',
    'Social worker support – case management, advocacy, family liaison, and community linkage',
    'Life skills training',
    'Vocational training (tailoring, handicrafts, cooking, gardening)',
    'Medical care and medication management',
    'Recreational and cultural programs',
    'Family reintegration support',
    'Yoga Therapy',
    'Psycho Therapies (CBT, REBT, DBT, etc..)',
    'International Observance Day Celebrations.',
  ],
  services: [
    {
      id: 'psychosocial-rehab',
      number: '01',
      title: 'Psychosocial rehabilitation',
      description:
        'Recovery-oriented psychosocial rehabilitation helping residents regain functional abilities and improve quality of life.',
      iconName: 'HeartHandshake',
    },
    {
      id: 'mental-health-counselling',
      number: '02',
      title: 'Mental health support & counselling',
      description:
        'Compassionate individual mental health support and personal counselling for emotional healing and stability.',
      iconName: 'Sparkles',
    },
    {
      id: 'group-therapy-psychoeducation',
      number: '03',
      title: 'Group therapy and psychoeducation',
      description:
        'Structured group therapy sessions and psychoeducation to build awareness, coping skills, and mutual support.',
      iconName: 'HeartHandshake',
    },
    {
      id: 'social-worker-support',
      number: '04',
      title: 'Social worker support',
      description:
        'Case management, advocacy, family liaison, and community linkage by dedicated psychiatric social workers.',
      iconName: 'Home',
    },
    {
      id: 'life-skills-training',
      number: '05',
      title: 'Life skills training',
      description:
        'Daily functional skill-building, personal hygiene, communication, and independent living preparation.',
      iconName: 'Activity',
    },
    {
      id: 'vocational-training',
      number: '06',
      title: 'Vocational training (tailoring, handicrafts, cooking, gardening)',
      description:
        'Hands-on skill-based empowerment in tailoring, handicrafts, cooking, and organic gardening.',
      iconName: 'ChefHat',
    },
    {
      id: 'medical-medication-care',
      number: '07',
      title: 'Medical care and medication management',
      description:
        'Regular medical check-ups, psychiatric consultations, and supervised medication management.',
      iconName: 'Stethoscope',
    },
    {
      id: 'recreational-cultural',
      number: '08',
      title: 'Recreational and cultural programs',
      description:
        'Engaging cultural activities, games, music, and creative expression for holistic well-being.',
      iconName: 'Sparkles',
    },
    {
      id: 'family-reintegration',
      number: '09',
      title: 'Family reintegration support',
      description:
        'Reconnecting residents with their families and supporting smooth reintegration into their communities.',
      iconName: 'Home',
    },
    {
      id: 'yoga-therapy',
      number: '10',
      title: 'Yoga Therapy',
      description:
        'Mind-body relaxation, breathing exercises, and therapeutic yoga for physical and mental harmony.',
      iconName: 'Activity',
    },
    {
      id: 'psycho-therapies',
      number: '11',
      title: 'Psycho Therapies (CBT, REBT, DBT, etc..)',
      description:
        'Evidence-based psychotherapies including Cognitive Behavioral Therapy (CBT), REBT, and DBT.',
      iconName: 'Stethoscope',
    },
    {
      id: 'observance-day-celebrations',
      number: '12',
      title: 'International Observance Day Celebrations.',
      description:
        'Commemorating international mental health, women’s, and community observance days together.',
      iconName: 'Utensils',
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
    'Breakfast + Dinner — ₹7,500',
    'Lunch — ₹10,000',
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
