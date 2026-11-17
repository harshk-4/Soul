export interface OfferingItem {
  id: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  href: string;
  badgeText: string;
  badgeVariant: 'sage' | 'sand' | 'terracotta' | 'forest';
  imageSrc: string;
  imageAlt: string;
  audience: string;
  outcomes: string[];
}

export const offeringsData: OfferingItem[] = [
  {
    id: 'schools-colleges',
    title: 'Nurturing Emotionally Intelligent Minds',
    tagline: 'Experiential Workshops for Schools & Colleges',
    shortDescription:
      'Human-development curriculum and experiential workshops designed for students and educators navigating modern pressure and emotional overwhelm.',
    fullDescription:
      'Modern education trains analytical aptitude while leaving emotional resilience and self-awareness untended. Soulfuli partners with schools and colleges to offer foundational emotional intelligence and dialogue practices.',
    href: '/schools-colleges',
    badgeText: 'Schools & Colleges',
    badgeVariant: 'sand',
    imageSrc: '/image/grp.jpeg',
    imageAlt: 'Young Indian peers engaged in warm, thoughtful conversation outdoors in a meadow',
    audience: 'Students, Faculty & Educational Leaders',
    outcomes: [
      'Emotional literacy and regulation tools',
      'Non-defensive dialogue and conflict care',
      'Stress and performance anxiety mitigation',
      'Cultivation of intrinsic purpose and agency',
    ],
  },
  {
    id: 'organisations',
    title: 'Corporate Training',
    tagline: 'Leading with the heart, not just the numbers.',
    shortDescription:
      'Soulfuli brings emotional intelligence, self-awareness, and human-centred communication into the way people work and lead.',
    fullDescription:
      'Organisations invest heavily in skills and strategy, yet leaders and teams often carry pressure, friction, and disconnection quietly. Soulfuli brings emotional intelligence, self-awareness, and human-centred communication into the way people work and lead.',
    href: '/organisations',
    badgeText: 'Corporate Training',
    badgeVariant: 'forest',
    imageSrc: '/images/corporate-training.jpeg',
    imageAlt:
      'Team members participating in a guided corporate wellness and mindfulness training session in a bright office space',
    audience: 'Executive Teams & Corporate Leaders',
    outcomes: [
      'Emotional intelligence to recognize reactive states',
      'Reflective space for self-aware leadership',
      'Intentional, non-defensive communication',
      'Strengthened trust and empathetic team dynamics',
    ],
  },
  {
    id: 'eq-audit',
    title: 'Take the EQ Audit',
    tagline: 'A mirror, not a verdict.',
    shortDescription:
      'A 48-question reflective self-discovery experience mapping six core dimensions of emotional awareness, regulation, and intentional communication.',
    fullDescription:
      'The EQ Audit is a quiet diagnostic mirror designed to help you perceive your habitual emotional dynamics with clarity and compassion. In twenty unhurried minutes, you map your inner landscape and uncover where intentional growth begins.',
    href: '/eq-audit',
    badgeText: 'Self-Discovery Mirror',
    badgeVariant: 'sage',
    imageSrc: '/image/aaron.webp',
    imageAlt: 'Person standing in calm shallow reflective water beneath a soft twilight sky',
    audience: 'Individuals & Emerging Leaders',
    outcomes: [
      'Visual 6-dimension Inner Map profile',
      'Identification of core emotional strengths',
      'Insight into unconscious reactive patterns',
      'Personalized reflective growth recommendations',
    ],
  },
  {
    id: 'quiet-bloom',
    title: 'Quiet Bloom Retreats',
    tagline: '12–17 February 2027 · Slow down without falling behind.',
    shortDescription:
      'An intimate, contemplative gathering in the Himalayan valley of Dharamshala, rooted in mountain silence and mindful immersion.',
    fullDescription:
      'Quiet Bloom Retreat is a sanctuary for conscious stillness. Set in Dharamshala, Himachal Pradesh, with our upcoming gathering scheduled for 12 February – 17 February, 2027, this unhurried experience brings together mindful movement, guided reflection, and mountain solitude.',
    href: '/quiet-bloom',
    badgeText: '12–17 Feb 2027 · Retreat',
    badgeVariant: 'terracotta',
    imageSrc: '/image/mount.jpeg',
    imageAlt: 'Misty green Himalayan hillside village overlooking terraced mountain slopes',
    audience: 'Leaders & Seekers of Deep Rest',
    outcomes: [
      'Deep nervous system restoration in nature',
      'Guided meditation and walking contemplation',
      'Intimate dialogue circles with fellow seekers',
      'Unstructured time for journaling and mountain air',
    ],
  },
];
