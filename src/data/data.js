// Lotus Children Hospital - Site Data
// Source: Hospital brochure, nameplates, and registration form photos

const lotusChildrenHospitalData = {
  hospitalName: "Lotus Children's Hospital",
  tagline: "Caring for your little ones.",

  contact: {
    address: "Tiwari Chaal, Rajendra Nagar Chowk, Raipur Road, Bilaspur (C.G.)",
    phones: ["8640013150", "8109913150", "07752-446602"],
    email: "lotuschildrenhospital2023@gmail.com",
    consultationTiming: "Daily, 9:00 AM to 9:00 PM (for children)",
    services: ["Daily vaccination for all", "24x7 admission facility"],
  },

  doctors: [
    {
      name: "Dr. Manoj Chandrakar",
      nameHindi: "डॉ. मनोज चंद्राकर",
      qualifications: [
        "MBBS, MD Neonatal and Child Specialist",
        "MD Paediatrics (Ahmedabad)",
        "Fellowship in Ped. ICU (Wadia Mumbai)",
        "Critical Care Specialist (Wadia Mumbai)",
        "PGPN (USA), 2D ECHO Trained",
        "Ex-Consultant, Apollo Hospital, Bilaspur",
      ],
      specialization:
        "Child & Critical Care Specialist (शिशु रोग एवं बाल्य रोग क्रिटिकल केयर विशेषज्ञ)",
      regNo: "CGMC-10979/2021",
    },
    {
      name: "Dr. Anis Akbani",
      nameHindi: "डॉ. अनीस आकबानी",
      qualifications: [
        "DCH, DNB (Paediatrics)",
        "Fellowship in Neonatology (Bangalore)",
        "PGPN (Boston)",
      ],
      specialization:
        "Newborn & Critical Care Specialist (नवजात शिशु रोग एवं क्रिटिकल केयर विशेषज्ञ)",
      regNo: "CGMC-8347/2018",
    },
    {
      name: "Dr. Alok Kashyap",
      nameHindi: "डॉ. आलोक कश्यप",
      qualifications: [
        "MBBS, MD Neonatal and Child Specialist",
        "MD Paediatrics (Jabalpur)",
        "Ex-Assistant Professor, CIMS",
        "Ex-Consultant, Apollo Hospital, Bilaspur",
        "PGPN (Boston)",
      ],
      specialization:
        "Newborn & Child Disease Specialist (नवजात शिशु रोग एवं बाल्य रोग विशेषज्ञ)",
      regNo: "CGMC-5397/2014",
    },
  ],

  facilitiesAvailable: [
    "24x7 medical consultation (for children from birth to 18 years)",
    "Vaccination (complete range of all modern vaccines, available daily)",
    "Admission facility (private room, general ward)",
    "Newborn Intensive Care Unit (NICU)",
    "Paediatric Intensive Care Unit (PICU)",
    "Well Baby Clinic (special care for newborns)",
    "Adolescent Clinic (checkup, counseling & vaccination for adolescents)",
    "Neurology Clinic (treatment for epilepsy/seizures, brain immaturity, brain fever, cerebral malaria etc. in children)",
    "Diabetic Clinic (checkup and treatment of sugar disease in children)",
    "Thalassemia & Sickle Cell care for children - blood transfusion, crisis treatment, and treatment/advice for all blood-related diseases",
    "Genetic guidance and counseling for parents",
    "Nephrology Clinic (treatment of kidney diseases in children - Nephrotic Syndrome, AGN, etc.)",
    "All types of surgical facilities available for children",
  ],

  equipment: [
    "Ventilator",
    "Bedside Monitor",
    "Bubble CPAP",
    "Double Surface Phototherapy",
    "Infant Warmer",
  ],

  governmentScheme: {
    name: "Ayushman Bharat Yojana (PM-JAY)",
    benefit: "Free treatment facility for children aged 0-18 years",
  },

  registrationFormFields: [
    "Baby's Name",
    "Age/Sex",
    "DOB",
    "Blood Group",
    "Mother",
    "Father",
    "Birth Wt.",
    "CHL",
    "HC",
    "Type of Delivery",
    "Address/Mob. No.",
    "Allergic To",
    "Remarks",
  ],

  immunizationSchedule: {
    title: "IAP Immunization Schedule",
    note: "Use this chart, keep a pencil vertically on the age of the child. All milestones falling to the left of the pencil should have been achieved by the child.",
    schedule: [
      {
        age: "Birth (जन्म)",
        vaccines: [
          "B.C.G. + O.P.V. - 0 (बी.सी.जी. + पोलियो की वैक्सीन)",
          "HepB (हिपेटाइटिस की वैक्सीन) - I",
        ],
      },
      {
        age: "6 Weeks (6 सप्ताह / 1½ माह)",
        vaccines: [
          "DTwP/DTaP (डी.टी.पी.) - I",
          "Hib (हिमोफिलस इन्फ्लुएन्जा टाइप बी) - I",
          "HepB (हिपेटाइटिस की वैक्सीन) - II",
          "IPV (इंजेक्टेबल पोलियो वैक्सीन) - I/OPV",
          "ROTA VIRUS (रोटा वाइरस) - I",
          "PCV (न्यूमोकोकल) - I",
        ],
      },
      {
        age: "10 Weeks (10 सप्ताह / 2½ माह)",
        vaccines: [
          "DTwP/DTaP (डी.टी.पी.) - II, HepB - III",
          "Hib (हिमोफिलस इन्फ्लुएन्जा टाइप बी) - II",
          "IPV (इंजेक्टेबल पोलियो वैक्सीन) - II/OPV",
          "ROTA VIRUS (रोटा वाइरस) - II",
          "PCV (न्यूमोकोकल) - II",
        ],
      },
      {
        age: "14 Weeks (14 सप्ताह / 3½ माह)",
        vaccines: [
          "DTwP/DTaP (डी.टी.पी.) - III, HepB - IV",
          "Hib (हिमोफिलस इन्फ्लुएन्जा टाइप बी) - III",
          "IPV (इंजेक्टेबल पोलियो वैक्सीन) - III/OPV",
          "ROTA VIRUS (रोटा वाइरस) - III",
          "PCV (न्यूमोकोकल) - III",
        ],
      },
      { age: "6 Month (6 माह)", vaccines: ["इन्फ्लुएन्जा वैक्सीन - I"] },
      { age: "7 Month (7 माह)", vaccines: ["इन्फ्लुएन्जा वैक्सीन - II"] },
      { age: "6-9 Month (6-9 माह)", vaccines: ["Typhoid Conjugate Vaccine"] },
      {
        age: "9 Month (9 माह)",
        vaccines: [
          "MMR (मीजल्स, मम्प्स, रूबेला) - I + OPV",
          "Meningococcal - I",
        ],
      },
      {
        age: "12 Month (12 माह)",
        vaccines: ["Hepatitis - A (For Live Vaccine Single dose)"],
      },
      {
        age: "13 Month (13 माह)",
        vaccines: ["Meningococcal - II", "JE - I"],
      },
      {
        age: "15 Month (15 माह)",
        vaccines: [
          "JE - II",
          "MMR (मीजल्स, मम्प्स, रूबेला) - II",
          "Varicella वेक्सिनेशन - I",
        ],
      },
      {
        age: "18 Month (18 माह)",
        vaccines: [
          "DTwP/DTaP (डी.टी.पी.) बूस्टर - I",
          "HiB (हिमोफिलस इन्फ्लुएन्जा) बूस्टर",
          "PCV (न्यूमोकोकल) बूस्टर",
          "IPV/OPV - B-1",
          "Hepatitis - A II (If Killed Vaccine Given)",
        ],
      },
      { age: "2 Years", vaccines: ["Varicella वैक्सिनेशन - II"] },
      { age: "3 Years", vaccines: ["इन्फ्लुएन्जा वैक्सीन"] },
      { age: "4 Years", vaccines: ["इन्फ्लुएन्जा वैक्सीन"] },
      {
        age: "4 to 6 Years",
        vaccines: [
          "OPV + DTwP/DTaP (ओपीवी + डीपीटी) बूस्टर",
          "MMR - III",
        ],
      },
      {
        age: "10 साल से ऊपर (10+ Years)",
        vaccines: [
          "Td डी टी बूस्टर / Tdap टीडीएपी",
          "HPV (Girls) (9 to 14 Years) 0, 6 Month",
        ],
      },
      { age: "15 to 45 Years", vaccines: ["HPV 0, 1, 6 Month"] },
      { age: "16 Years", vaccines: ["Td डी टी बूस्टर / Tdap टीडीएपी"] },
    ],
    generalNotes: [
      "टीका लगवाने के बाद 30 मिनट तक अस्पताल परिसर में ही रहें / किसी भी प्रकार की रिएक्शन के लिए",
      "फ्लू टीका 6 माह में / हर वर्ष",
      "विटामिन ए-9 माह पर / हर 6 महीने में",
      "Rabies",
    ],
  },
};

export default lotusChildrenHospitalData;