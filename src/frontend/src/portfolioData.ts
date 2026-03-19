// ─── Portfolio Data ────────────────────────────────────────────────────────────
export interface PortfolioProject {
  id: number;
  title: string;
  category: string;
  year: string;
  client: string;
  slug: string;
  description: string;
  image: string;
  renders: string[];
  realImages: string[];
  aboutBrand: string;
  objective: string;
  approach: string;
  keyElements: string[];
  outcome: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "BOHECO",
    category: "Hemp Wellness Retail",
    year: "2024",
    client: "Bombay Hemp Company",
    slug: "boheco",
    description:
      "A retail environment communicating BOHECO's progressive and sustainable hemp wellness philosophy.",
    image: "/assets/generated/boheco-render-1.dim_800x500.jpg",
    renders: [
      "/assets/generated/boheco-render-1.dim_800x500.jpg",
      "/assets/generated/boheco-render-2.dim_800x500.jpg",
      "/assets/generated/boheco-render-3.dim_800x500.jpg",
    ],
    realImages: [
      "/assets/generated/boheco-real-1.dim_800x500.jpg",
      "/assets/generated/boheco-real-2.dim_800x500.jpg",
    ],
    aboutBrand:
      "Bombay Hemp Company (BOHECO) is one of India's pioneering enterprises in the industrial hemp and cannabis wellness sector. The brand focuses on developing sustainable hemp-based products across wellness, nutrition, personal care, and textiles while promoting awareness about hemp's environmental and medicinal potential.",
    objective:
      "The project aimed to design a retail environment that communicates BOHECO's progressive and sustainable philosophy while making hemp-based products approachable and easy to understand for consumers. The space needed to balance product discovery with education, helping customers explore the brand's offerings with clarity and confidence.",
    approach:
      "DesignO translated BOHECO's nature-driven ethos into a clean and contemporary retail experience. The layout was thoughtfully planned to create an intuitive flow that guides customers through different product categories while reinforcing the brand's identity through materiality, graphics, and spatial design.",
    keyElements: [
      "Custom retail fixtures designed for efficient product display",
      "Structured product zoning to simplify navigation",
      "Use of natural textures and materials reflecting sustainability",
      "Informational graphics highlighting hemp's benefits",
      "Balanced lighting and layout enhancing product visibility",
    ],
    outcome:
      "The resulting retail space reflects BOHECO's innovative vision while offering customers an engaging and informative shopping experience. The design strengthens brand storytelling, improves product accessibility, and reinforces BOHECO's identity as a forward-thinking hemp wellness brand.",
  },
  {
    id: 2,
    title: "SoulTree",
    category: "Ayurvedic Beauty Retail",
    year: "2024",
    client: "SoulTree Organic",
    slug: "soultree",
    description:
      "A warm, calming retail experience translating SoulTree's Ayurvedic beauty philosophy into immersive space design.",
    image: "/assets/generated/soultree-render-1.dim_800x500.jpg",
    renders: [
      "/assets/generated/soultree-render-1.dim_800x500.jpg",
      "/assets/generated/soultree-render-2.dim_800x500.jpg",
      "/assets/generated/soultree-render-3.dim_800x500.jpg",
    ],
    realImages: [
      "/assets/generated/soultree-real-1.dim_800x500.jpg",
      "/assets/generated/soultree-real-2.dim_800x500.jpg",
    ],
    aboutBrand:
      "SoulTree is a certified organic Ayurvedic beauty and wellness brand that combines ancient Indian skincare traditions with modern sustainable practices. The brand develops natural skincare, haircare, and cosmetic products using authentic Ayurvedic formulations and organically sourced botanical ingredients. Known for its 'Ayurvedic, Organic, and Ethical' philosophy, SoulTree promotes clean beauty while supporting sustainable sourcing and responsible manufacturing.",
    objective:
      "The project aimed to create a retail environment that reflects SoulTree's philosophy of rooted luxury, sustainability, and holistic wellness. The space needed to communicate the purity and authenticity of Ayurvedic beauty while offering customers an immersive environment to explore the brand's natural skincare and cosmetic products.",
    approach:
      "DesignO translated SoulTree's nature-inspired identity into a warm and calming retail experience. The design language focused on simplicity, natural materiality, and a balanced spatial layout that allows customers to interact comfortably with the products. The retail concept emphasized storytelling and product discovery while reinforcing the brand's commitment to organic beauty and sustainable living.",
    keyElements: [
      "Natural material palette reflecting Ayurvedic and botanical origins",
      "Custom display units designed to highlight skincare and cosmetic ranges",
      "Clean spatial layout for intuitive product exploration",
      "Soft lighting creating a calm and welcoming retail environment",
      "Brand graphics and visual storytelling reinforcing the philosophy of natural beauty",
    ],
    outcome:
      "The resulting retail environment reflects SoulTree's ethos of purity, wellness, and sustainability. The space offers customers a tranquil and engaging shopping experience while strengthening the brand's identity as a premium Ayurvedic beauty label rooted in nature and conscious living.",
  },
  {
    id: 3,
    title: "Tony & Guys",
    category: "Salon Retail Interior",
    year: "2023",
    client: "Tony & Guys",
    slug: "tony-guys",
    description:
      "An engaging, functional retail interior amplifying the Tony & Guys brand identity through thoughtful layout and premium finishes.",
    image: "/assets/generated/tonyguy-render-1.dim_800x500.jpg",
    renders: [
      "/assets/generated/tonyguy-render-1.dim_800x500.jpg",
      "/assets/generated/tonyguy-render-2.dim_800x500.jpg",
      "/assets/generated/tonyguy-render-3.dim_800x500.jpg",
    ],
    realImages: [
      "/assets/generated/tonyguy-real-1.dim_800x500.jpg",
      "/assets/generated/tonyguy-real-2.dim_800x500.jpg",
    ],
    aboutBrand:
      "Tony & Guys is a retail concept aligned with the globally recognized TONI&GUY salon brand — renowned for contemporary hair styling and fashion-forward services. The project reflects a retail environment focused on premium customer experience and brand identity through physical space design.",
    objective:
      "The goal was to create an engaging, functional retail interior that amplifies the Tony & Guys brand identity, enhances customer journey through thoughtful layout and finishes, and supports retail or service interactions with clarity and style.",
    approach:
      "DesignO approached this project by understanding the brand's core values and translating them into spatial elements that communicate quality and distinctiveness. The design focused on aligning brand messaging with interior experience, optimizing store layout for customer flow, and selecting finishes that speak to modern retail sensibilities.",
    keyElements: [
      "Brand-centric retail layout with clear circulation and zoned areas",
      "Thoughtful selection of materials and colors supporting brand positioning",
      "Integration of Tony & Guys branding across signage and spatial graphics",
      "Service and display zones designed for customer comfort and interaction",
      "Premium finishes reflecting contemporary salon aesthetics",
    ],
    outcome:
      "The final retail environment delivers a cohesive brand experience that resonates with customers and supports the brand's identity within a competitive retail context. The design reinforces brand recognition while enhancing user comfort and interaction.",
  },
  {
    id: 4,
    title: "Bot-Tale Bottle",
    category: "Packaging & Brand Experience",
    year: "2023",
    client: "Bot-Tale Bottle",
    slug: "bot-tale",
    description:
      "A story-driven packaging and brand experience elevating the product's appeal through strategic minimalism and narrative expression.",
    image: "/assets/generated/bottale-render-1.dim_800x500.jpg",
    renders: [
      "/assets/generated/bottale-render-1.dim_800x500.jpg",
      "/assets/generated/bottale-render-2.dim_800x500.jpg",
      "/assets/generated/bottale-render-3.dim_800x500.jpg",
    ],
    realImages: [
      "/assets/generated/bottale-real-1.dim_800x500.jpg",
      "/assets/generated/bottale-real-2.dim_800x500.jpg",
    ],
    aboutBrand:
      "Bot-Tale Bottle is a concept project featured in the DesignO Studio portfolio. The name suggests a product experience centered around a bottle — packaging or branded product identity — with a strong design narrative crafted by DesignO Studio for a visually compelling brand presentation.",
    objective:
      "The objective was to develop a distinctive and story-driven packaging or brand experience that elevates the product's appeal, communicates brand narrative, and enhances perception on shelf or in use. This involves translating brand values into a cohesive and memorable physical design.",
    approach:
      "DesignO's approach focused on blending strategic minimalism with narrative expression. This included defining a design strategy that underscores simplicity and storytelling — using visual elements, material choices, and brand cues to convey the Bot-Tale Bottle identity effectively.",
    keyElements: [
      "Narrative-led visual identity through bottle design and supporting graphics",
      "Carefully selected materials and finishes reflecting product quality",
      "Minimalist, refined aesthetic aligned with brand positioning",
      "Seamless application of brand principles across all design elements",
      "Cohesive packaging form from concept to final presentation",
    ],
    outcome:
      "The Bot-Tale Bottle project results in a cohesive brand touchpoint that conveys both simplicity and depth, creating a memorable product experience. The design enhances brand storytelling while elevating the product's visual presence.",
  },
  {
    id: 5,
    title: "Lookme Jewellery",
    category: "Brand & Retail Identity",
    year: "2022",
    client: "Lookme Jewellery",
    slug: "lookme",
    description:
      "A compelling jewellery brand presence through visual identity, packaging design, and in-store retail presentation.",
    image: "/assets/generated/lookme-render-1.dim_800x500.jpg",
    renders: [
      "/assets/generated/lookme-render-1.dim_800x500.jpg",
      "/assets/generated/lookme-render-2.dim_800x500.jpg",
      "/assets/generated/lookme-render-3.dim_800x500.jpg",
    ],
    realImages: [
      "/assets/generated/lookme-real-1.dim_800x500.jpg",
      "/assets/generated/lookme-real-2.dim_800x500.jpg",
    ],
    aboutBrand:
      "Lookme Jewellery is featured in DesignO's portfolio as a jewellery-focused design project. The work involved shaping the visual identity, packaging, or retail presentation for a jewellery brand — an area where DesignO applies creative strategy to elevate product experiences.",
    objective:
      "The goal was to develop a compelling brand presence that reflects the essence of the jewellery collection — through packaging design, product presentation, or in-store visual identity — with a focus on aesthetics, differentiation, and resonance with the brand's target audience.",
    approach:
      "DesignO approached this project by understanding the brand narrative and positioning of Lookme Jewellery, translating that narrative into visual design elements that connect emotionally with customers, and crafting a design system balancing sophistication with brand personality.",
    keyElements: [
      "Distinct logo and graphic language tailored to jewellery brand positioning",
      "Thoughtful packaging design enhancing the unboxing experience",
      "Display modules strengthening perceived value and luxury appeal",
      "Imagery, textures, and layout guidelines reflecting luxury craftsmanship",
      "Unified brand system from packaging to in-store presentation",
    ],
    outcome:
      "The Lookme Jewellery project resulted in a unified brand experience that elevates the jewellery product's story — from package to presentation — helping it stand out in a competitive market while appealing directly to the desired consumer segment.",
  },
  {
    id: 6,
    title: "Afghan Dry Fruits",
    category: "Kiosk & Retail Experience",
    year: "2022",
    client: "Afghan Dry Fruits",
    slug: "afghan-dry-fruits",
    description:
      "A kiosk design celebrating the authenticity, tradition, and richness of premium Afghan dry fruits with cultural heritage aesthetics.",
    image: "/assets/generated/afghan-render-1.dim_800x500.jpg",
    renders: [
      "/assets/generated/afghan-render-1.dim_800x500.jpg",
      "/assets/generated/afghan-render-2.dim_800x500.jpg",
      "/assets/generated/afghan-render-3.dim_800x500.jpg",
    ],
    realImages: [
      "/assets/generated/afghan-real-1.dim_800x500.jpg",
      "/assets/generated/afghan-real-2.dim_800x500.jpg",
    ],
    aboutBrand:
      "Afghan Dry Fruits is featured in the DesignO Studio portfolio as a kiosk design project. The brand celebrates premium dry fruits sourced from Afghanistan — a region globally recognized for high-quality dried nuts and fruits like raisins, apricots, pistachios, and almonds. Afghan dry fruits carry a long heritage of artisanal selection and natural flavor.",
    objective:
      "The aim was to create a kiosk design that physically expresses the authenticity, tradition, and richness of Afghan Dry Fruits. The design needed to attract retail foot traffic, highlight the premium nature of the products, and support small-scale brand positioning in a competitive retail environment.",
    approach:
      "DesignO's approach focused on infusing cultural authenticity with contemporary kiosk aesthetics, studying the heritage and product story of Afghan dry fruits to shape the visual narrative, and crafting a kiosk layout that is welcoming and functional for both display and service.",
    keyElements: [
      "Brand storytelling elements communicating origin and premium quality",
      "Organized product presentation highlighting variety and freshness",
      "Warm, earth-inspired tones and materials reflecting natural produce",
      "Cultural cues celebrating Afghan artisanal heritage",
      "Welcoming layout balancing display and service interactions",
    ],
    outcome:
      "The Afghan Dry Fruits kiosk delivers an engaging retail experience that resonates with customers by celebrating the brand's origins and premium value. The design enhances both visual appeal and product accessibility, ensuring a distinctive presence in busy retail spaces.",
  },
  {
    id: 7,
    title: "Tealogy",
    category: "Food & Beverage Retail",
    year: "2026",
    client: "Tealogy Café",
    slug: "tealogy",
    description:
      "A compact, visually engaging kiosk design for Tealogy — a fast-growing Indian café chain — blending traditional kulhad chai culture with modern retail aesthetics.",
    image: "/assets/generated/tealogy-render-1.dim_800x500.jpg",
    renders: [
      "/assets/generated/tealogy-render-1.dim_800x500.jpg",
      "/assets/generated/tealogy-render-2.dim_800x500.jpg",
      "/assets/generated/tealogy-render-3.dim_800x500.jpg",
    ],
    realImages: [
      "/assets/generated/tealogy-real-1.dim_800x500.jpg",
      "/assets/generated/tealogy-real-2.dim_800x500.jpg",
    ],
    aboutBrand:
      "Tealogy is a fast-growing Indian café chain known for its modern tea experience centered around traditional kulhad chai and specialty tea beverages. Founded in 2018 and headquartered in Indore, the brand has expanded rapidly across India, combining traditional tea culture with a contemporary café environment.",
    objective:
      "The objective of this project was to design a compact, visually engaging kiosk that reflects the brand's identity while maintaining high operational efficiency for a fast-moving beverage service environment. The design needed to balance aesthetics, accessibility, and workflow efficiency within a small footprint.",
    approach:
      "The design focuses on creating a strong brand presence within a small footprint. The concept blends modern café aesthetics with traditional tea culture, aligning with Tealogy's philosophy of bringing a contemporary twist to India's long-standing tea traditions. Design elements were structured around warm textures and earthy tones inspired by traditional kulhad tea culture, modern retail geometry, and open counter interaction to enhance customer engagement.",
    keyElements: [
      "Strong visual branding with illuminated panels to attract footfall in high-traffic environments",
      "Efficient customer flow layout optimized for quick service and order processing",
      "Compact preparation space with integrated storage zones for beverages and snacks",
      "Laminated panels and textured finishes for durability and visual warmth",
      "Metal framing elements providing structural integrity and premium café look",
      "Integrated lighting strategy highlighting products and branding from a distance",
    ],
    outcome:
      "The result is a visually striking yet highly practical kiosk that supports Tealogy's mission of delivering a modern tea café experience in accessible retail locations. The kiosk acts not just as a service counter but also as a brand display unit that communicates the identity of the tea café — attracting footfall, enabling quick service, and reinforcing Tealogy's identity as a contemporary kulhad chai destination.",
  },
];
