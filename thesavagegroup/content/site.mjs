// =====================================================================
// THE SAVAGE GROUP — central content file
//
// Every page's copy, link and image reference lives here.
// Edit this file, then run `npm run build` (or keep `npm run dev`
// running, which rebuilds on save).
//
// Rules for this file:
// - Only add facts that have been confirmed. Leave a value empty ('' or [])
//   when it is not confirmed — empty values are hidden on the site.
// - Image keys refer to entries in `images` below.
// =====================================================================

export const site = {
  name: 'The Savage Group',
  wordmark: 'THE SAVAGE GROUP',
  tagline: 'Movement. Recovery. Connection.',
  domain: 'https://www.thesavagegroup.org',
  locale: 'en_AU',

  // While `preview` is true the site:
  // - shows review notes and photography placeholders,
  // - adds <meta name="robots" content="noindex"> to every page,
  // - writes a robots.txt that blocks all crawlers.
  // Set to false only when the site is ready to launch.
  preview: true,

  // Default social sharing image (an `images` key).
  shareImage: 'athlete-sweat',

  // Legal entity details. Leave empty until supplied and confirmed.
  // Example: [{ name: 'Example Pty Ltd', detail: 'ABN 00 000 000 000' }]
  legal: [],
};

export const nav = [
  { label: 'Corporate Wellness', href: '/corporate-wellness/' },
  { label: 'DISTRIK', href: '/distrik/' },
  { label: 'Our Story', href: '/our-story/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Contact', href: '/contact/' },
];

export const headerCta = { label: 'Let’s Talk', href: '/contact/' };

// ---------------------------------------------------------------------
// External links — DISTRIK
// ---------------------------------------------------------------------
export const distrik = {
  name: 'DISTRIK',
  descriptor: 'Performance Recovery Club',
  operator: 'PT The Savage Group',
  email: 'hello@distrikath.com',
  instagram: 'https://www.instagram.com/distrik.ath/',
  instagramHandle: '@distrik.ath',
  booking:
    'https://www.fresha.com/book-now/distrik-performance-recovery-leq0n6u2/all-offer?share=true&pId=3111290',
  address: [
    'Jl. Raya Babakan Canggu No.4',
    'Canggu, Kec. Kuta Utara',
    'Kabupaten Badung, Bali 80351',
    'Indonesia',
  ],
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=DISTRIK+Jl.+Raya+Babakan+Canggu+No.4+Canggu+Bali',

  // Add only after confirmation. Empty arrays are hidden on the site.
  // Example: [{ days: 'Tuesday – Thursday', time: '7:00am – 8:00pm' }]
  hours: [],
  // Session prices, as published on distrikath.com. Same price for Recover,
  // Perform or Move. Leave [] to hide.
  prices: [
    { name: '30 min', price: 'IDR 400.000' },
    { name: '45 min', price: 'IDR 550.000' },
    { name: '60 min', price: 'IDR 650.000' },
    { name: '90 min', price: 'IDR 900.000' },
  ],
  priceNotes: ['Compression boots from IDR 200.000', 'Free 15-minute consultation'],
  // Example: [{ title: 'Opening offer', body: '...' }]
  promotions: [],
};

// ---------------------------------------------------------------------
// The two businesses — shown side by side (light = Corporate Wellness,
// black = DISTRIK) on the homepage and Contact page.
// ---------------------------------------------------------------------
export const businesses = {
  corporate: {
    region: '(AU) Australia',
    name: 'Corporate Wellness',
    headline: 'Wellness programs for *workplaces.*',
    audience: 'For companies and their teams in Australia.',
    offers: ['Movement sessions', 'Recovery pop-ups', 'Education sessions', 'Team and social events', 'Fully managed programs'],
    ctas: [
      { label: 'Explore Corporate Wellness', href: '/corporate-wellness/' },
      { label: 'Build a workplace program', href: '/contact/#corporate' },
    ],
  },
  distrik: {
    region: '(ID) Canggu, Bali',
    name: 'DISTRIK',
    headline: 'A performance recovery *club.*',
    audience: 'For anyone who trains, in Canggu, Bali.',
    offers: ['Sports massage and bodywork', 'Recover · Perform · Move', 'DISTRIK Supply', 'Recovery Fuel', 'Run the Distrik, Fridays 6:00am'],
    ctas: [
      { label: 'Discover DISTRIK', href: '/distrik/' },
      { label: 'Book Recovery', href: 'https://www.fresha.com/book-now/distrik-performance-recovery-leq0n6u2/all-offer?share=true&pId=3111290' },
    ],
  },
};

// ---------------------------------------------------------------------
// Enquiry form
// ---------------------------------------------------------------------
export const forms = {
  corporate: {
    // Paste a form endpoint here to connect the form (see README,
    // "Connecting the enquiry form"). Example (Formspree):
    //   'https://formspree.io/f/xxxxxxxx'
    // While empty, the form is shown as a clearly-labelled preview and
    // nothing is sent.
    endpoint: '',
    lookingFor: [
      'Movement sessions',
      'Recovery pop-ups',
      'Education sessions',
      'Team and social events',
      'A fully managed program',
      'Not sure yet',
    ],
  },
};

// ---------------------------------------------------------------------
// Images
//
// `src` is a file stem in assets/source/ (run `npm run images` after
// adding or replacing a file). `pos` is the CSS object-position used for
// cropping; `posMobile` overrides it on small screens to keep the subject
// in frame.
//
// `placeholder: true` renders a clearly labelled stone panel instead of a
// photograph. Use it where approved photography does not exist yet, and
// describe the shot needed in `brief`.
//
// Every photograph is shown in black and white. Add `colour: true` to keep
// an image in colour.
//
// `source` documents where every photograph came from.
// ---------------------------------------------------------------------
const DISTRIK_CAMPAIGN = 'DISTRIK brand campaign photography (supplied, distrikath.com)';
const DISTRIK_PREMISES = 'DISTRIK premises, Canggu (supplied, distrikath.com)';

export const images = {
  'athlete-profile': {
    src: 'athlete-profile',
    alt: 'Athlete in profile, skin glistening after training, against a white wall',
    pos: '78% 30%',
    posMobile: '72% 20%',
    source: DISTRIK_CAMPAIGN,
  },
  'athlete-seated': {
    src: 'athlete-seated',
    alt: 'Athlete resting on a bench beside DISTRIK boxes and a kit bag',
    pos: '50% 50%',
    posMobile: '40% 50%',
    source: DISTRIK_CAMPAIGN,
  },
  'athlete-sweat': {
    src: 'athlete-sweat',
    alt: 'Athlete catching his breath after training, lit against a black background',
    pos: '72% 30%',
    posMobile: '74% 30%',
    source: DISTRIK_CAMPAIGN,
  },
  'runner-architecture': {
    src: 'runner-architecture',
    alt: 'Runner in motion between concrete columns',
    pos: '52% 60%',
    source: DISTRIK_CAMPAIGN,
  },
  'runners-motion': {
    src: 'runners-motion',
    alt: 'Two runners moving at pace, blurred with motion',
    pos: '50% 40%',
    posMobile: '80% 40%',
    source: DISTRIK_CAMPAIGN,
  },
  'city-night': {
    src: 'city-night',
    alt: 'Athlete walking along a street at night carrying a DISTRIK bag',
    pos: '50% 45%',
    posMobile: '44% 50%',
    source: DISTRIK_CAMPAIGN,
  },
  'distrik-assisted-stretch': {
    src: 'distrik-assisted-stretch',
    alt: 'A DISTRIK therapist guiding a client through an assisted shoulder stretch',
    pos: '60% 45%',
    posMobile: '64% 50%',
    caption: 'Assisted stretching at DISTRIK, Canggu.',
    source: DISTRIK_PREMISES,
  },
  'distrik-cupping': {
    src: 'distrik-cupping',
    alt: 'Dry cupping on a client’s back during a recovery session',
    pos: '50% 45%',
    caption: 'Dry cupping at DISTRIK, Canggu.',
    source: DISTRIK_PREMISES,
  },
  'distrik-massage': {
    src: 'distrik-massage',
    alt: 'A therapist’s hands working along a client’s back during a sports massage',
    pos: '45% 50%',
    caption: 'Sports massage at DISTRIK, Canggu.',
    source: DISTRIK_PREMISES,
  },
  'distrik-bodywork-detail': {
    src: 'distrik-bodywork-detail',
    alt: 'Close detail of hands-on bodywork on a client’s shoulder',
    pos: '40% 40%',
    source: DISTRIK_PREMISES,
  },
  'distrik-lounge': {
    src: 'distrik-lounge',
    alt: 'The DISTRIK lounge: concrete floor, steel-framed windows and leather lounge chairs',
    pos: '50% 60%',
    caption: 'The lounge at DISTRIK, Canggu.',
    source: DISTRIK_PREMISES,
  },
  'distrik-treatment-room': {
    src: 'distrik-treatment-room',
    alt: 'A DISTRIK treatment room with a steel-framed glass ceiling and a treatment table',
    pos: '50% 55%',
    caption: 'A treatment room at DISTRIK, Canggu.',
    source: DISTRIK_PREMISES,
  },
  'athlete-stretch': {
    src: 'athlete-stretch',
    alt: 'Athlete stretching with arms extended against a white background',
    pos: '62% 35%',
    source: DISTRIK_CAMPAIGN,
  },
  // Supplied by The Savage Group (October 2026). Location not specified, so
  // these are never captioned as DISTRIK premises.
  'shoulder-release': {
    src: 'shoulder-release',
    alt: 'A therapist’s hands working on an athlete’s shoulders after training',
    pos: '50% 35%',
    posMobile: '50% 30%',
    source: 'Supplied by The Savage Group',
  },
  'athlete-rest': {
    src: 'athlete-rest',
    alt: 'An athlete resting on a concrete step in a shaft of light',
    pos: '72% 45%',
    source: 'Supplied by The Savage Group',
  },
  'runner-stride': {
    src: 'runner-stride',
    alt: 'A runner mid-stride against a concrete wall',
    pos: '35% 50%',
    posMobile: '40% 50%',
    source: 'Supplied by The Savage Group',
  },
  'shoulder-sweat': {
    src: 'shoulder-sweat',
    alt: 'Close detail of an athlete’s shoulder beaded with sweat after training',
    pos: '55% 40%',
    source: 'Supplied by The Savage Group',
  },
  'distrik-berry-soda': {
    src: 'distrik-berry-soda',
    alt: 'A sparkling berry, lime and mint drink in a DISTRIK cup',
    pos: '50% 50%',
    source: 'Supplied by The Savage Group (DISTRIK Recovery Fuel)',
  },
  // Training studio interiors — location not specified, so never captioned.
  'studio-rack': {
    src: 'studio-rack',
    alt: 'A dark training studio with a squat rack, bench and plyo boxes under linear lights',
    pos: '50% 55%',
    source: 'Supplied by The Savage Group',
  },
  'studio-equipment': {
    src: 'studio-equipment',
    alt: 'Kettlebells, dumbbells and medicine balls racked along a dark studio wall',
    pos: '50% 60%',
    source: 'Supplied by The Savage Group',
  },
  'studio-floor': {
    src: 'studio-floor',
    alt: 'An open training floor with cable machines and mats ready for a session',
    pos: '45% 55%',
    source: 'Supplied by The Savage Group',
  },
  'distrik-furniture-detail': {
    src: 'distrik-furniture-detail',
    alt: 'Black leather seating and a wire side table on a polished concrete floor',
    pos: '50% 50%',
    source: DISTRIK_PREMISES,
  },

  // ---- Temporary stand-ins and placeholders ----------------------------
  // Entries marked `temporary: true` still use existing DISTRIK photography
  // (founder portrait) until the right image is supplied. Swap `src`/`alt` here when they arrive;
  // every page using the key updates. In preview they carry a "Temporary image" tag.
  'ph-corporate-hero': {
    src: 'floor-stretch',
    alt: 'An athlete in sunglasses holding a deep floor stretch under low blue light',
    pos: '78% 40%',
    posMobile: '96% 30%',
    source: 'Supplied by The Savage Group',
  },
  'ph-workplace-session': {
    src: 'group-walk',
    alt: 'Three people walking together in white trainers across sunlit concrete',
    pos: '30% 60%',
    posMobile: '25% 60%',
    source: 'Supplied by The Savage Group',
  },
  'ph-workplace-movement': {
    src: 'hand-wraps',
    alt: 'A boxer in hand wraps resting his head down between rounds',
    pos: '55% 45%',
    source: 'Supplied by The Savage Group',
  },
  'ph-workplace-recovery': {
    placeholder: true,
    alt: '',
    brief: 'Recovery pop-up in an office — seated massage or compression with colleagues nearby.',
  },
  'ph-workplace-connection': {
    src: 'post-run-coffee',
    alt: 'Runners sharing coffee around a small table after a run',
    pos: '55% 50%',
    source: 'Supplied by The Savage Group',
  },
  'ph-linkedin': {
    src: 'studio-rack',
    alt: 'A dark training studio with a squat rack, bench and plyo boxes under linear lights',
    pos: '50% 55%',
    posMobile: '50% 55%',
    source: 'Supplied by The Savage Group (gym photography for the LinkedIn program)',
  },
  'ph-founder': {
    // TEMPORARY. Wanted: portrait of Justin Savage. Uses an interior, not a
    // person, so no one is mistaken for the founder.
    temporary: true,
    src: 'distrik-treatment-room',
    alt: 'A DISTRIK treatment room with a steel-framed glass ceiling and a treatment table',
    pos: '50% 55%',
    source: DISTRIK_PREMISES + ' — temporary',
  },
  'ph-recovery-fuel': {
    src: 'distrik-mint-tray',
    alt: 'A mint-infused drink on a brushed-steel DISTRIK tray beside a pair of sunglasses',
    pos: '50% 100%',
    source: 'Supplied by The Savage Group (DISTRIK Recovery Fuel)',
  },
  'ph-supply': {
    placeholder: true,
    alt: '',
    brief: 'DISTRIK Supply shelves — Indonesian running and performance brands in store.',
  },
  'ph-community-run': {
    placeholder: true,
    alt: '',
    brief: 'Run the Distrik — the Friday 6:00am community run (real participants, with consent).',
  },
};

// ---------------------------------------------------------------------
// Projects
//
// Only entries with `verified: true` AND `public: true` appear on the
// site. Keep unconfirmed work here with `public: false` until it is
// approved — it will not be published.
// ---------------------------------------------------------------------
export const projectCategories = {
  workplace: 'Workplace wellness',
  recovery: 'Recovery experiences',
  community: 'Community events',
};

export const projects = [
  {
    id: 'linkedin-australia',
    verified: true,
    public: true,
    category: 'workplace',
    title: 'LinkedIn',
    location: 'Sydney and Melbourne, Australia',
    summary: 'Corporate wellness programming delivered for LinkedIn teams in Sydney and Melbourne.',
    image: 'ph-linkedin',
    href: '/corporate-wellness/#linkedin',
    linkLabel: 'Corporate Wellness',
    note: 'Client reference only. Program detail and any outcomes to be added once approved by LinkedIn.',
  },
  {
    id: 'distrik',
    verified: true,
    public: true,
    category: 'recovery',
    title: 'DISTRIK Performance Recovery Club',
    location: 'Canggu, Bali',
    summary: 'A dedicated performance recovery club combining bodywork, recovery technology, Indonesian performance brands and recovery fuel.',
    image: 'distrik-assisted-stretch',
    href: '/distrik/',
    linkLabel: 'Discover DISTRIK',
  },
  {
    id: 'run-the-distrik',
    verified: true,
    public: true,
    category: 'community',
    title: 'Run the Distrik',
    location: 'Canggu, Bali',
    summary: 'A free 5 km community run through the rice fields, every Friday at 6:00am from DISTRIK. Every pace welcome.',
    image: 'runner-stride',
    href: '/distrik/#community',
    linkLabel: 'Community',
  },
  // Example of a hidden entry — not published until verified and public.
  {
    id: 'example-draft',
    verified: false,
    public: false,
    category: 'workplace',
    title: 'Draft project',
    location: '',
    summary: '',
    image: 'ph-workplace-session',
    href: '',
  },
];

// ---------------------------------------------------------------------
// Page content
// ---------------------------------------------------------------------
export const pages = {
  home: {
    path: '/',
    title: 'The Savage Group — Movement. Recovery. Connection.',
    description:
      'The Savage Group creates wellness experiences for workplaces and communities — corporate wellness programs in Australia and DISTRIK performance recovery in Canggu, Bali.',
    hero: {
      label: 'The Savage Group',
      headline: ['Movement.', 'Recovery.', '*Connection.*'],
      body: 'We create wellness experiences for workplaces and communities. From corporate programs in Australia to performance recovery in Bali.',
      image: 'athlete-sweat',
      tone: 'dark', // dark image → light text
      ctas: [
        { label: 'Explore Corporate Wellness', href: '/corporate-wellness/' },
        { label: 'Discover DISTRIK', href: '/distrik/' },
      ],
    },
    intro: {
      label: 'What we do',
      headline: 'Built around *people.*',
      // Three short chapters, side by side in columns 2–4.
      blocks: [
        {
          title: 'Wellness at *work.*',
          body: 'We build workplace wellness around the people who use it—what they enjoy, when they can join and what helps them feel better. Through movement, recovery, education and social experiences, we make wellbeing an accessible part of the working day, giving colleagues more ways to connect and build healthy habits together.',
        },
        {
          title: 'Recovery at *DISTRIK.*',
          body: 'At DISTRIK, we bring that same approach into a dedicated performance recovery club. Hands-on treatments, mobility and recovery technology support the way people train, move and live. Indonesian performance brands, recovery fuel and community sessions make it a place to spend time, meet others and come back to.',
        },
        {
          title: 'Different settings. *A shared purpose.*',
          body: 'From the workplace to the recovery club, The Savage Group creates spaces and experiences that help people move better, recover well and feel connected. Built around real needs—and the people who bring them to life.',
        },
      ],
    },
    corporate: {
      label: 'Corporate Wellness',
      headline: ['Wellness that fits', 'the *working day.*'],
      body: 'Movement, recovery, education and social experiences designed around your people. We manage the program, the instructors and the details that make participation easier.',
      image: 'ph-workplace-session',
      cta: { label: 'Explore Corporate Wellness', href: '/corporate-wellness/' },
    },
    distrik: {
      label: 'DISTRIK · Canggu, Bali',
      headline: 'Built for *recovery.*',
      body: 'Sports massage, bodywork, mobility and recovery technology. Alongside Indonesian performance brands, recovery fuel and a community that moves.',
      image: 'distrik-assisted-stretch',
      list: ['Sports massage', 'Bodywork', 'Mobility', 'Recovery technology', 'DISTRIK Supply', 'Recovery fuel', 'Community'],
    },
    work: {
      label: 'Selected work',
      headline: 'Work in *practice.*',
    },
    story: {
      label: 'Our Story',
      headline: ['Experience behind', 'every *experience.*'],
      body: 'Founded by Justin Savage, The Savage Group brings together experience across gym ownership, corporate wellness, design and retail. Today, that work connects workplace programs in Australia with a dedicated performance recovery club in Bali.',
      image: 'distrik-lounge',
      cta: { label: 'Our Story', href: '/our-story/' },
    },
    contact: {
      label: 'Contact',
      headline: ['Let’s build something', 'people want to be *part of.*'],
      ctas: [
        { label: 'Discuss a Workplace Program', href: '/contact/#corporate' },
        { label: 'Visit DISTRIK', href: '/distrik/#visit' },
      ],
    },
  },

  corporate: {
    path: '/corporate-wellness/',
    title: 'Corporate Wellness — The Savage Group',
    description:
      'Workplace wellness programs built around your people: movement, recovery, education and connection, managed as one program by The Savage Group.',
    hero: {
      label: 'Corporate Wellness',
      headline: ['Better days', '*at work.*'],
      body: 'Wellness programs built around your people, your workplace and the way your teams work.',
      image: 'ph-corporate-hero',
      tone: 'dark',
      ctas: [{ label: 'Build Your Workplace Program', href: '/contact/#corporate' }],
    },
    offerings: [
      {
        id: 'movement',
        label: 'Movement',
        headline: 'Sessions for every body and every calendar.',
        body: 'Strength, Pilates, yoga, mobility, walks and runs. Accessible sessions for different abilities and schedules.',
        image: 'ph-workplace-movement',
      },
      {
        id: 'recovery',
        label: 'Recovery',
        headline: 'Space to reset during the working day.',
        body: 'Massage, compression and recovery pop-ups that create space to reset during the working day.',
        image: 'shoulder-release',
      },
      {
        id: 'education',
        label: 'Education',
        headline: 'Practical, not preachy.',
        body: 'Practical sessions exploring movement, sleep, stress, recovery and everyday wellbeing.',
        image: 'studio-floor',
      },
      {
        id: 'connection',
        label: 'Connection',
        headline: 'Reasons to come together.',
        body: 'Team activities, social sessions, wellness events and collaborations that bring colleagues together.',
        image: 'ph-workplace-connection',
      },
      {
        id: 'management',
        label: 'Program Management',
        headline: 'One connected program.',
        body: 'Timetables, instructors, communications, bookings and reporting managed as one connected program.',
        items: ['Timetables', 'Instructors', 'Communications', 'Bookings', 'Reporting'],
        image: 'studio-equipment',
      },
    ],
    process: {
      label: 'How we work',
      headline: 'Listen. Design. Deliver. *Review.*',
      steps: [
        { title: 'Listen', body: 'We start with your people: how they work, where they are based and what they would actually use.' },
        { title: 'Design', body: 'We shape a program and timetable around your spaces, schedules and goals.' },
        { title: 'Deliver', body: 'We manage the instructors, communications and logistics so each session runs smoothly.' },
        { title: 'Review', body: 'We look at participation and feedback together, then refine what comes next.' },
      ],
    },
    client: {
      id: 'linkedin',
      label: 'Client work',
      headline: 'LinkedIn — Sydney and *Melbourne.*',
      body: 'The Savage Group has delivered workplace wellness programming for LinkedIn teams in Sydney and Melbourne.',
      disclaimer: 'LinkedIn is referenced as a client of The Savage Group. This does not imply endorsement by LinkedIn.',
      image: 'ph-linkedin',
      // Add approved program detail here, e.g. ['Weekly movement sessions', ...]
      details: [],
      reviewNote: 'Add approved program detail and any outcomes once LinkedIn has signed off. No logo, testimonial or statistics without approved assets.',
    },
    future: {
      label: 'Looking ahead',
      headline: 'Singapore.',
      body: 'We are exploring Singapore as a potential future expansion of our corporate wellness programs. If your teams are based there, we would welcome the conversation.',
    },
    cta: {
      headline: ['Let’s design a program', 'your people will *use.*'],
      button: { label: 'Build Your Workplace Program', href: '/contact/#corporate' },
    },
  },

  distrik: {
    path: '/distrik/',
    title: 'DISTRIK Performance Recovery Club, Canggu — The Savage Group',
    description:
      'DISTRIK is a performance recovery club in Canggu, Bali: sports massage, bodywork, mobility and recovery technology, with DISTRIK Supply, recovery fuel and a Friday community run.',
    hero: {
      label: 'Performance Recovery Club',
      headline: ['Recover well.', 'Move better.', '*Perform stronger.*'],
      image: 'city-night',
      tone: 'dark',
    },
    intro: {
      label: 'One club, three parts',
      headline: 'Recovery, supply and fuel under one roof in *Canggu.*',
      parts: [
        { label: 'Performance Recovery', href: '#treatments' },
        { label: 'DISTRIK Supply', href: '#supply' },
        { label: 'Recovery Fuel', href: '#fuel' },
      ],
    },
    recovery: {
      id: 'treatments',
      label: 'Performance Recovery',
      headline: 'Hands-on bodywork and recovery technology.',
      techniques: [
        'Sports massage',
        'Deep tissue massage',
        'Soft-tissue mobilisation',
        'Assisted stretching',
        'Dry cupping',
        'Electrical therapeutic stimulation',
        'Massage-gun work',
        'Compression boots',
      ],
      note: 'Your therapist selects techniques according to your needs and their suitability for you, and will check in before and during your session.',
      image: 'distrik-assisted-stretch',
      detailImage: 'distrik-cupping',
      focusImage: 'athlete-profile',
      focuses: [
        { name: 'Recover', body: 'For soreness, fatigue and tension after training or everyday life.' },
        { name: 'Perform', body: 'Focused bodywork to support training preparation and ongoing physical demands.' },
        { name: 'Move', body: 'Bodywork and assisted stretching focused on mobility and freedom of movement.' },
      ],
    },
    supply: {
      id: 'supply',
      label: 'DISTRIK Supply',
      headline: 'Indonesian running and performance brands.',
      body: 'A curated selection of Indonesian running and performance brands, chosen for people who train.',
      image: 'athlete-seated',
    },
    fuel: {
      id: 'fuel',
      label: 'Recovery Fuel',
      headline: 'Coffee, hydration and recovery drinks.',
      body: 'Something good before you go, or after you are done.',
      image: 'ph-recovery-fuel',
    },
    community: {
      id: 'community',
      label: 'Community',
      // Shown as a lockup: "RUN THE" + the DISTRIK logo (as on the event poster).
      headline: 'Run the',
      when: 'Fridays at 6:00am.',
      body: 'More than just running: a free weekly community run built around movement, connection and showing up. Every Friday at 6:00am we run 5 km together through the rice fields, welcoming every pace, every level and everyone.',
      details: ['Every Friday · 6:00am', 'Meeting point: DISTRIK', 'Distance: 5 km', 'Free for everyone'],
      image: 'runner-stride',
    },
    clinical: {
      id: 'clinical',
      label: 'IV Therapy & Blood Testing',
      headline: 'By appointment, through our clinical partner.',
      body: 'IV therapy and blood testing are available by appointment through our clinical partner. These services are provided and assessed by the partner’s clinical team and are separate from DISTRIK’s massage and bodywork.',
      reviewNote: 'Name the clinical partner here only once the wording is approved by them.',
    },
    visit: { id: 'visit', label: 'Visit', headline: 'Find us in *Canggu.*', image: 'distrik-treatment-room' },
  },

  story: {
    path: '/our-story/',
    title: 'Our Story — The Savage Group',
    description:
      'Founded by Justin Savage, The Savage Group brings together gym ownership, corporate wellness, design and retail — connecting workplace programs in Australia with DISTRIK in Bali.',
    hero: {
      label: 'Our Story',
      headline: ['Experience behind', 'every *experience.*'],
      body: 'Founded by Justin Savage, The Savage Group connects workplace programs in Australia with a dedicated performance recovery club in Bali.',
      image: 'ph-founder',
    },
    reviewNote: 'Founder to review. Add dates, names and specifics only once confirmed.',
    chapters: [
      {
        label: 'Gym ownership',
        headline: 'Where it started.',
        body: [
          'Owning and running a gym meant learning the fundamentals up close: coaching, programming and building a community that keeps showing up.',
          'It also made one thing clear. The experience around training matters as much as the training itself.',
        ],
      },
      {
        label: 'Corporate wellness',
        headline: 'Taking it to work.',
        body: [
          'Workplaces bring different constraints: busy calendars, mixed abilities and offices that were not built for movement.',
          'The answer was programs that are easy to join and properly managed, so taking part feels natural rather than like another obligation.',
        ],
        image: 'ph-workplace-movement',
      },
      {
        label: 'Design and retail',
        headline: 'The details people notice.',
        body: [
          'Work in design and retail sharpened an eye for the things people feel before they can name them: the space, the product, and how it is presented when you arrive.',
        ],
        image: 'distrik-furniture-detail',
      },
      {
        label: 'Today',
        headline: 'One group, two settings.',
        body: [
          'The Savage Group brings those threads together. In Australia, it delivers corporate wellness programs for workplaces. In Canggu, Bali, PT The Savage Group runs DISTRIK, a performance recovery club combining bodywork, Indonesian performance brands, recovery fuel and a weekly community run.',
          'Different settings, the same aim: experiences people want to be part of, and return to.',
        ],
        image: 'distrik-lounge',
      },
    ],
  },

  projects: {
    path: '/projects/',
    title: 'Projects — The Savage Group',
    description:
      'Selected work from The Savage Group across workplace wellness, recovery experiences and community events.',
    hero: {
      label: 'Projects',
      headline: ['Selected', '*work.*'],
      body: 'Workplace wellness, recovery experiences and community events. We only list work we can stand behind.',
    },
  },

  contact: {
    path: '/contact/',
    title: 'Contact — The Savage Group',
    description:
      'Talk to The Savage Group about a workplace wellness program, or get in touch with DISTRIK Performance Recovery Club in Canggu, Bali.',
    hero: {
      label: 'Contact',
      headline: ['Let’s *talk.*'],
      body: 'Two businesses, two ways in. Choose the one that fits.',
    },
    corporate: {
      id: 'corporate',
      label: 'Corporate Wellness',
      headline: 'Plan a workplace program.',
      body: 'Tell us about your people and your workplace. We will come back to you to talk it through.',
    },
    distrik: {
      id: 'distrik',
      label: 'DISTRIK',
      headline: 'Book, visit or ask a question.',
      body: 'For bookings, treatments and everything at the club in Canggu.',
    },
  },

  notFound: {
    path: '/404.html',
    title: 'Page not found — The Savage Group',
    description: 'This page could not be found.',
  },

  reserved: {
    title: 'Client hub — The Savage Group',
    description: 'This page is reserved for a future client hub.',
    headline: 'Reserved.',
    body: 'This page is reserved for a future client hub and is not yet available.',
  },
};

// Routes reserved for future client hubs. They build as simple
// "not yet available" pages, are noindex, and stay out of the sitemap.
export const reservedRoutes = ['/linkedin/sydney/', '/linkedin/melbourne/', '/linkedin/singapore/'];
