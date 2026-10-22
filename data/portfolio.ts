/** Personal content lives here. Null project links are intentionally omitted from the UI. */
export interface Project {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly category: string;
  readonly kind: string;
  readonly summary: string;
  readonly description: string;
  readonly contribution: string;
  readonly features: readonly string[];
  readonly tech: readonly string[];
  readonly image: string;
  readonly imageAlt: string;
  readonly imageFit?: "cover" | "contain";
  readonly imageUnoptimized?: boolean;
  readonly imageInk?: string;
  readonly imageNote?: string;
  readonly stage?: string;
  readonly color: string;
  readonly live: string | null;
  readonly github: string | null;
}

export const portfolio = {
  name: "Tanvir Rahman Tushar",
  shortName: "Tanvir Tushar",
  brand: "tanvir",
  role: "Senior Web Developer & Team Lead",
  location: "Dhaka, Bangladesh",
  timezone: "Asia/Dhaka",
  address: { city: "Dhaka", country: "BD" },
  university: "American International University-Bangladesh",
  email: "tushartanvirrahman99@gmail.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://tanvir-portfolio-7mn7.vercel.app",
  resume: "/resume.pdf",
  portrait: "/images/tanvir.jpg",
  description: "Tanvir Rahman Tushar is a senior web developer and team lead in Dhaka, building thoughtful websites, WordPress products, and useful integrations.",
  socials: [
    { name: "GitHub", href: "https://github.com/tushar5479" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/tanvir-tushar-5479t/" }
  ],
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" }
  ],
  hero: {
    eyebrow: "Hello, I’m",
    line1: "Tanvir",
    line2: "Tushar.",
    intro: "I build custom WordPress products, connect systems, and lead teams from the first idea to a working release.",
    primaryCta: "View my work",
    secondaryCta: "About me",
    status: "WordPress · REST APIs · React",
    visual: {
      image: "/images/hero-profile-transparent.webp",
      imageAlt: "Tanvir Tushar wearing glasses and a blue shirt, with his arms folded",
      deskImage: "/images/hero-desk.webp",
      deskImageAlt: "Tanvir developing a website at his desk with code and a website preview across three monitors",
      deskCaption: "At work, Dhaka."
    },
    scroll: "SELECTED WORK"
  },
  work: {
    eyebrow: "01 / SELECTED WORK",
    heading: "Built with purpose.",
    subheading: "A few things I’ve helped bring to life. From the first idea to the details that make it work.",
    filters: ["All work", "Websites", "Plugins"],
    visibleCount: 6,
    seeMoreLabel: "See more projects",
    seeLessLabel: "Show fewer projects",
    projectsShownLabel: "projects shown",
    moreRegionLabel: "More selected projects",
    note: "Pflege mit Herz, Galenix Labs, Pepti.ca, and the TCB projects use actual screenshots; the other visuals are illustrative previews. Explore each project for details.",
    detailLabel: "Explore project",
    liveLabel: "Visit live project",
    githubLabel: "View source on GitHub",
    inquiryLabel: "Ask me about this project",
    contributionLabel: "My contribution",
    artNote: "Illustrative interface study; not a screenshot of the original project."
  },
  projects: [
    {
      id: "cba-estate", number: "01", title: "CBA Estate", category: "Websites",
      kind: "REAL ESTATE · CUSTOM WORDPRESS",
      summary: "A better place to find your next place.",
      description: "A custom WordPress theme for a real estate business, built around dynamic property content and flexible controls for the people maintaining the site.",
      contribution: "Custom theme development, responsive implementation, and content management for property listings and images.",
      features: ["Dynamic property content", "Flexible administration", "Responsive layouts"],
      tech: ["WordPress", "PHP", "JavaScript"],
      image: "/images/project-estate.svg", imageAlt: "Illustrative CBA Estate website with a modern house and property listings",
      color: "#d5e1cd", live: "https://cbaestate.com/", github: null
    },
    {
      id: "optimize-tax", number: "02", title: "Optimize Tax", category: "Websites",
      kind: "FINANCIAL SERVICES · WEB DEVELOPMENT",
      summary: "Making a complex service feel simple.",
      description: "A responsive WordPress website for tax and financial consultation, giving the business a clear way to present its services and connect with prospective clients.",
      contribution: "Website development, service content management, responsive pages, and lead generation flows.",
      features: ["Service management", "Lead generation", "Responsive experience"],
      tech: ["WordPress", "PHP", "CSS"],
      image: "/images/project-tax.svg", imageAlt: "Illustrative Optimize Tax interface with financial overview cards and a bar chart",
      color: "#d9d9f1", live: "https://optimizetax.io/", github: null
    },
    {
      id: "woocommerce-deposits", number: "03", title: "Deposits for WooCommerce", category: "Plugins",
      kind: "E-COMMERCE · PLUGIN DEVELOPMENT",
      summary: "Flexible payments. A smoother checkout.",
      description: "A deposit management plugin that extends WooCommerce with flexible payment rules, product-level configuration, reminders, and secure payment tracking.",
      contribution: "Plugin development covering deposit rules, order integration, administration, payment status, and reminders.",
      features: ["Product-level deposits", "Order integration", "Payment reminders"],
      tech: ["WooCommerce", "WordPress", "PHP"],
      image: "/images/project-deposits.svg", imageAlt: "Illustrative deposit plugin checkout showing full payment and deposit payment options",
      color: "#efe4d5", live: "https://tinyurl.com/2ssm89hv", github: null
    },
    {
      id: "pool-table-tracker", number: "04", title: "Pool Table Tracker", category: "Plugins",
      kind: "OPERATIONS · CUSTOM WORDPRESS PLUGIN",
      summary: "Less admin. More time at the table.",
      description: "A lightweight WordPress plugin for tracking pool table bookings, with simple administration designed around day-to-day operations.",
      contribution: "Custom plugin development and administrative tools for tracking and managing table bookings.",
      features: ["Booking management", "Simple administration", "Lightweight integration"],
      tech: ["WordPress", "PHP", "JavaScript"],
      image: "/images/project-pool.svg", imageAlt: "Illustrative pool table management interface with table availability and session cards",
      color: "#dce7c4", live: null, github: null
    },
    {
      id: "flowbridge-forms", number: "05", title: "FlowBridge Forms", category: "Plugins",
      kind: "WORDPRESS PLUGIN · MULTI-STEP FORMS",
      summary: "Multi-step forms, connected to your CRM.",
      description: "A custom WordPress form builder in initial development, with configurable steps and fields, embedding through shortcodes or Elementor’s shortcode widget, and CRM delivery through REST APIs. It also supports file uploads, email notifications, and local submission management.",
      contribution: "Custom plugin development spanning the form builder, frontend rendering, submission storage, CRM delivery, and email notifications, with configurable form design and validation controls.",
      features: ["Multi-step form builder", "CRM / REST API delivery", "File uploads & email notifications", "Local submissions & CSV export"],
      tech: ["WordPress", "PHP", "JavaScript", "REST API"],
      image: "/images/project-flowbridge.svg", imageAlt: "Illustrated FlowBridge Forms workflow connecting a multi-step form to local submissions, a CRM or REST API, and email notifications",
      imageNote: "Illustrative workflow based on the public repository’s documented features; not a screenshot of the plugin.",
      imageInk: "#cdd5d9",
      stage: "Initial development · v0.1.0",
      color: "#172b3a", live: null, github: "https://github.com/tushar5479/flowbridge-forms"
    },
    {
      id: "tcb-grading", number: "06", title: "TCB Grading", category: "Websites",
      kind: "CARD GRADING · WORDPRESS",
      summary: "From card submission to a clear order overview.",
      description: "A WordPress website for Theory Card Breeze, connecting a five-tier card-grading service with card submissions and a dedicated customer dashboard. Customers can review order history, confirmation status, selected tiers, turnaround information, and card details in one place.",
      contribution: "WordPress website development for grading-tier presentation, submission entry points, and the customer-facing order dashboard.",
      features: ["Five grading tiers", "Card submissions", "Customer dashboard", "Order history & card details"],
      tech: ["WordPress", "Elementor"],
      image: "/images/project-tcb.webp", imageAlt: "TCB Grading homepage screenshot with gold and purple graded basketball cards beside the headline Precision Grading. Elevated by Tier.",
      imageFit: "contain",
      imageNote: "Actual project screenshot, cropped and framed for this portfolio.",
      imageInk: "#e9c76b",
      color: "#110e10", live: "https://tcbgrading.com/", github: null
    },
    {
      id: "tcb-card-grading", number: "07", title: "TCB Card Grading", category: "Plugins",
      kind: "WORDPRESS PLUGIN · CARD SUBMISSIONS",
      summary: "A complete submission flow for collectible cards.",
      description: "A custom WordPress plugin for card-grading submissions. Customers select a service tier, upload their cards, review the order, add return-shipping details, and continue through a Stripe payment integration to confirmation. Orders can be managed from WordPress administration.",
      contribution: "Custom plugin development covering the shortcode-based submission flow, card uploads, shipping steps, Stripe integration, and order administration.",
      features: ["Multi-step card submissions", "Card uploads & tier selection", "Shipping details & order review", "Stripe payment integration", "WordPress order administration"],
      tech: ["WordPress", "PHP", "JavaScript", "Stripe"],
      image: "/images/project-tcb-plugin.webp", imageAlt: "Actual TCB grading-tier interface showing the Standard, Pristine, Elite or Rare, Vintage, and Ultra card-grading options",
      imageFit: "contain",
      imageNote: "Actual grading-tier screenshot, cropped and framed for this portfolio. Plugin features are documented in the linked source repository.",
      imageInk: "#e9c76b",
      color: "#110e10", live: null, github: "https://github.com/tushar5479/tcb-card-grading"
    },
    {
      id: "pepti-ca", number: "08", title: "Pepti.ca", category: "Websites",
      kind: "E-COMMERCE · WOOCOMMERCE",
      summary: "A warm, clear storefront for a specialist catalog.",
      description: "A Canadian e-commerce website with a categorized product catalog, product options, shopping-cart access, affiliate links, and a dedicated contact page. A warm palette and distinctive product imagery give the storefront a consistent visual identity.",
      contribution: "WordPress storefront implementation, product-catalog presentation, navigation, and branded page layouts.",
      features: ["Categorized product catalog", "Product options & shopping cart", "Affiliate sign-up & login links", "Dedicated contact page"],
      tech: ["WordPress", "WooCommerce", "Elementor"],
      image: "/images/project-pepti.webp", imageAlt: "Pepti.ca homepage screenshot with its white navigation bar, brown serif headline, and gold molecular structures on a warm peach background",
      imageFit: "contain",
      imageUnoptimized: true,
      imageNote: "Actual Pepti.ca homepage screenshot supplied for this portfolio.",
      imageInk: "#5f3021",
      color: "#f2dfcf", live: "https://www.pepti.ca/", github: null
    },
    {
      id: "galenix-labs", number: "09", title: "Galenix Labs", category: "Websites",
      kind: "RESEARCH PRODUCTS · E-COMMERCE",
      summary: "An organized storefront for research peptides.",
      description: "An e-commerce website for research products, bringing a product catalog, shopping-cart access, and a dedicated Certificate of Analysis archive together. A navy-and-cyan visual identity connects the storefront, product imagery, and supporting information.",
      contribution: "WordPress and WooCommerce website development, storefront presentation, product navigation, and COA archive layout.",
      features: ["Product catalog", "Shopping-cart access", "COA document archive", "FAQ & contact navigation"],
      tech: ["WordPress", "WooCommerce", "Elementor"],
      image: "/images/project-galenix.webp", imageAlt: "Galenix Labs homepage screenshot with navy navigation, blue DNA artwork, research-product vials, and Shop Products and Verify COA buttons",
      imageFit: "contain",
      imageUnoptimized: true,
      imageNote: "Actual Galenix Labs homepage screenshot supplied for this portfolio.",
      imageInk: "#8fd4ff",
      color: "#030d27", live: "https://galenixlabs.com/", github: null
    },
    {
      id: "pflege-mit-herz", number: "10", title: "Pflege mit Herz Dessau", category: "Websites",
      kind: "CARE SERVICES · WORDPRESS",
      summary: "Care information and callback requests, in German.",
      description: "A German-language website for an outpatient care provider in Dessau-Roßlau. It brings together service information, care inquiries, career pages, and a callback form with an explicit consent checkbox, using a clear red-and-white identity.",
      contribution: "WordPress website implementation, service and career page layouts, care-inquiry navigation, and the callback-form interface.",
      features: ["Care-service information", "Care inquiry & callback forms", "Careers & contact navigation", "Explicit consent checkbox"],
      tech: ["WordPress", "Elementor", "CSS"],
      image: "/images/project-pflege.webp", imageAlt: "Pflege mit Herz Dessau homepage screenshot with a red-and-white identity, a carer helping an older woman, and a callback request form",
      imageFit: "contain",
      imageUnoptimized: true,
      imageNote: "Actual Pflege mit Herz Dessau homepage screenshot supplied for this portfolio.",
      imageInk: "#394257",
      color: "#f3f4f6", live: "https://www.pflegemitherz-dessau.de/", github: null
    }
  ] satisfies readonly Project[],
  about: {
    eyebrow: "02 / THE PERSON BEHIND THE PIXELS",
    heading: "Thoughtful by design.",
    headingAccent: "Curious by default.",
    bio: "I’m Tanvir, a developer based in Dhaka who enjoys the space where thoughtful design meets solid engineering. I build websites, custom WordPress products, integrations, and automation that make complicated things feel easy.",
    secondaryBio: "I care about the whole journey: understanding the problem, working with people, writing maintainable code, and making sure the final experience feels right.",
    portraitCaption: "A human behind the code.",
    currentLabel: "CURRENTLY",
    currentTitle: "Building better, together.",
    currentDescription: "Leading web development at Softvence IT LTD, from client requirements to the final release.",
    approachLabel: "MY APPROACH",
    approach: ["Understand the why.", "Sweat the details.", "Make it feel effortless."],
    resumeLabel: "Download résumé",
    workspace: {
      image: "/images/workspace.webp",
      imageAlt: "A developer wearing headphones works at a dual-monitor desk, with a warm lamp and city lights beyond the windows"
    },
    education: {
      eyebrow: "EDUCATIONAL BACKGROUND",
      qualification: "Bachelor of Science in",
      degree: "Computer Science & Engineering",
      university: "American International University-Bangladesh",
      universityUrl: "https://www.aiub.edu/",
      majorLabel: "MAJOR",
      major: "Software Engineering & AI Systems",
      expertiseLabel: "QUALITY & TESTING EXPERTISE",
      expertise: "SQA & Software Testing"
    },
    stats: [
      { value: 4, suffix: "+", label: "Years building for the web" },
      { value: 10, suffix: "", label: "Selected projects to explore" },
      { value: 3, suffix: "", label: "Connected disciplines", detail: "Development · Integration · QA" }
    ]
  },
  skills: {
    eyebrow: "THE TOOLKIT",
    heading: "The right tools. The right reasons.",
    description: "A practical stack for building useful things, connecting systems, and keeping quality at the center.",
    items: ["WordPress", "React", "JavaScript", "PHP", "Laravel", "WooCommerce", "REST APIs", "n8n", "Cypress", "Selenium"],
    pauseLabel: "Pause tech ticker", resumeLabel: "Resume tech ticker",
    groups: [
      { name: "Build", detail: "Interfaces & products", items: ["React", "JavaScript", "HTML & CSS", "PHP", "Laravel", "WordPress", "WooCommerce"] },
      { name: "Connect", detail: "Systems & workflows", items: ["REST APIs", "CRM integrations", "n8n automation", "AJAX & JSON"] },
      { name: "Refine", detail: "SQA & Software Testing", items: ["Manual QA", "Selenium", "Cypress", "JMeter", "Jira", "SRS documentation"] }
    ]
  },
  experience: {
    eyebrow: "03 / THE JOURNEY",
    heading: "Always building.",
    headingAccent: "Always learning.",
    description: "Different teams, new challenges, and a shared focus on making things better.",
    entries: [
      { date: "OCT 2024 — PRESENT", role: "Senior Web Developer & Team Lead", company: "Softvence IT LTD", type: "EXPERIENCE", description: "Leading development teams and translating client needs into custom WordPress themes, plugins, CRM integrations, and automated workflows.", tags: ["Team leadership", "WordPress", "API integrations"] },
      { date: "JAN 2022 — JUL 2024", role: "WordPress Developer", company: "TECHIYAN.COM", type: "EXPERIENCE", description: "Built responsive frontends and PHP backends, brought design mockups to life, and supported ongoing website security and maintenance.", tags: ["Web development", "PHP", "Responsive design"] }
    ]
  },
  contact: {
    eyebrow: "04 / YOUR NEXT CHAPTER",
    heading: "Have something",
    headingAccent: "in mind?",
    description: "A new project, a tricky problem, or just a good conversation. I’d love to hear about it.",
    emailLabel: "DROP ME A LINE",
    socialsLabel: "ELSEWHERE ON THE INTERNET",
    formTitle: "Let’s start with a hello.",
    nameLabel: "Your name", namePlaceholder: "Alex Morgan",
    emailFieldLabel: "Your email", emailPlaceholder: "alex@company.com",
    subjectLabel: "What are you thinking?", subjectPlaceholder: "A website, a plugin, an interesting idea…",
    messageLabel: "A little more about it", messagePlaceholder: "Tell me what you’re working on and how I can help.",
    submit: "Send a message", sending: "Sending your message…",
    success: "Thanks for reaching out. Your message is on its way to my inbox.",
    error: "Your message couldn’t be sent. Please try again or email me directly.",
    unconfigured: "The form is awaiting its email connection. Please use the email link to reach me directly.",
    securityCheckLabel: "Spam protection",
    securityCheckRequired: "Please complete the security check before sending your message.",
    securityCheckError: "The security check could not be completed. Please try again or email me directly.",
    securityCheckLoading: "Loading security check…",
    securityCheckRetry: "Retry security check",
    notificationSubject: "[Tanvir Portfolio] New contact message",
    notificationNotice: "This message was submitted by a portfolio visitor. Their name, email address, and message are unverified. Treat any links or requests in the message as untrusted.",
    privacy: "Your details are only used to reply to your message."
  },
  footer: { note: "Thoughtfully designed. Carefully built.", top: "Back to top", rights: "All rights reserved.", location: "MADE WITH CARE IN DHAKA, BD" }
} as const;

