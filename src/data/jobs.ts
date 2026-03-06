export const jobsData = [
  {
    id: "1",
    title: "Residential Electrician",
    company: "Al Futtaim Group",
    location: "Dubai, UAE",
    country: "UAE",
    salary: "2,500 AED / month",
    salaryBreakdown: { basic: "1,500 AED", overtime: "500 AED", food: "500 AED" },
    experience: "2-5 Years",
    isFree: true,
    benefits: ["Free Food", "Accommodation", "Medical"],
    whatsappNumber: "971501234567",
    isEcrAccepted: true,
    housingProvided: true,
    postedDaysAgo: 1,
    tradeTestRequired: true,
    isEmployerVerified: true,
  },
  {
    id: "2",
    title: "Heavy Vehicle Driver",
    company: "Saudi Binladin Group",
    location: "Riyadh, KSA",
    country: "KSA",
    salary: "3,000 SAR / month",
    salaryBreakdown: { basic: "2,000 SAR", overtime: "600 SAR", food: "400 SAR" },
    experience: "3+ Years",
    isFree: true,
    benefits: ["Accommodation", "Transportation", "Medical"],
    whatsappNumber: "966501234567",
    isEcrAccepted: false,
    housingProvided: true,
    postedDaysAgo: 0,
    tradeTestRequired: false,
    isEmployerVerified: true,
  },
  {
    id: "3",
    title: "HVAC Technician",
    company: "Qatar Airways Facilities",
    location: "Doha, Qatar",
    country: "Qatar",
    salary: "2,800 QAR / month",
    salaryBreakdown: { basic: "1,800 QAR", overtime: "600 QAR", food: "400 QAR" },
    experience: "1-3 Years",
    isFree: true,
    benefits: ["Free Food", "Accommodation", "Transportation"],
    whatsappNumber: "97450123456",
    isEcrAccepted: true,
    housingProvided: true,
    postedDaysAgo: 3,
    tradeTestRequired: true,
    isEmployerVerified: true,
  },
  {
    id: "4",
    title: "Scaffolder",
    company: "Larsen & Toubro ME",
    location: "Muscat, Oman",
    country: "Oman",
    salary: "180 OMR / month",
    salaryBreakdown: { basic: "120 OMR", overtime: "40 OMR", food: "20 OMR" },
    experience: "1-2 Years",
    isFree: true,
    benefits: ["Accommodation", "Medical"],
    whatsappNumber: "96850123456",
    isEcrAccepted: true,
    housingProvided: true,
    postedDaysAgo: 35, // Ghost job
    tradeTestRequired: false,
    isEmployerVerified: false,
  },
  {
    id: "5",
    title: "Mason",
    company: "Arabtec Construction",
    location: "Abu Dhabi, UAE",
    country: "UAE",
    salary: "1,800 AED / month",
    salaryBreakdown: { basic: "1,200 AED", overtime: "300 AED", food: "300 AED" },
    experience: "2-4 Years",
    isFree: true,
    benefits: ["Free Food", "Accommodation", "Transportation"],
    whatsappNumber: "971501234568",
    isEcrAccepted: true,
    housingProvided: true,
    postedDaysAgo: 2,
    tradeTestRequired: true,
    isEmployerVerified: true,
  },
  ...Array.from({ length: 55 }).map((_, i) => {
    const trades = ["Plumber", "Electrician", "Mason", "Driver", "Welder", "Carpenter", "Painter", "Steel Fixer", "Cleaner", "Security Guard"];
    const countries = ["UAE", "KSA", "Qatar", "Oman", "Bahrain", "Kuwait"];
    const cities = {
      "UAE": ["Dubai", "Abu Dhabi", "Sharjah"],
      "KSA": ["Riyadh", "Jeddah", "Dammam"],
      "Qatar": ["Doha", "Al Rayyan"],
      "Oman": ["Muscat", "Salalah"],
      "Bahrain": ["Manama"],
      "Kuwait": ["Kuwait City"]
    };
    const companies = ["Almarai", "Nesma & Partners", "Emirates Group", "Galfar Engineering", "Drake & Scull", "Al Naboodah", "Khansaheb", "Amana Contracting"];
    
    const trade = trades[Math.floor(Math.random() * trades.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const cityList = cities[country as keyof typeof cities];
    const city = cityList[Math.floor(Math.random() * cityList.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    
    let currency = "AED";
    if (country === "KSA") currency = "SAR";
    if (country === "Qatar") currency = "QAR";
    if (country === "Oman") currency = "OMR";
    if (country === "Bahrain") currency = "BHD";
    if (country === "Kuwait") currency = "KWD";

    const basic = Math.floor(Math.random() * 1000) + 1000;
    const overtime = Math.floor(Math.random() * 300) + 200;
    const food = Math.floor(Math.random() * 200) + 100;
    const total = basic + overtime + food;

    return {
      id: `${i + 6}`,
      title: `${trade}`,
      company: company,
      location: `${city}, ${country}`,
      country: country,
      salary: `${total} ${currency} / month`,
      salaryBreakdown: { basic: `${basic} ${currency}`, overtime: `${overtime} ${currency}`, food: `${food} ${currency}` },
      experience: `${Math.floor(Math.random() * 5) + 1}-${Math.floor(Math.random() * 5) + 6} Years`,
      isFree: Math.random() > 0.2,
      benefits: ["Accommodation", "Medical", Math.random() > 0.5 ? "Free Food" : "Transportation"].filter(Boolean),
      whatsappNumber: Math.random() > 0.3 ? `9${Math.floor(Math.random() * 1000000000)}` : undefined,
      isEcrAccepted: Math.random() > 0.4,
      housingProvided: Math.random() > 0.1,
      postedDaysAgo: Math.floor(Math.random() * 40),
      tradeTestRequired: Math.random() > 0.5,
      isEmployerVerified: Math.random() > 0.2,
    };
  })
];
