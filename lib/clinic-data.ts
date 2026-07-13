export type Specialty = {
  slug: string
  fr: string
  wo: string
  practitioner: string
  reasons: string[]
}

// Specialties offered at CLINIQUE MAIMOUNA, with a Wolof label and typical
// consultation reasons (motifs de consultation) used in the booking flow.
export const specialties: Specialty[] = [
  {
    slug: "medecine-generale",
    fr: "Médecin généraliste",
    wo: "Fajkat bu mag",
    practitioner: "Dr Aminata Leye",
    reasons: [
      "Consultation générale",
      "Hospitalisation",
      "Mise en observation",
      "Petite chirurgie",
      "Soins",
      "Médicaments",
      "Bilan",
      "Électrocardiogramme"
    ],
  },
  {
    slug: "gynecologie",
    fr: "Gynécologue obstétricien",
    wo: "Fajkatu jigéen",
    practitioner: "Dr El Hadji Mansour DIOP",
    reasons: [
      "Échographie",
      "Consultation sage-femme",
      "Consultation + Échographie",
      "Mise en observation",
      "Hospitalisation",
      "Kystectomie, accouchement, césarienne, myomectomie",
      "Dispositif intra-utérin",
      "Contraceptif implantable",
      "Contrôle",
      "Colposcopie",
      "Réquisition",
      "Contraception",
      "Cardiotocographie DEVIS",
      "Aspiration",
      "Endoscopie",
      "Cerclage",
      "Laparotomie",
      "Hystérectomie",
      "Hystéroscopie",
      "Vaccination Carnet CPN"
    ],
  },
  {
    slug: "dentisterie",
    fr: "Chirurgien-dentiste",
    wo: "Fajkatu bëñ",
    practitioner: "Dr Ndeye Aminata DIOP",
    reasons: ["Consultation dentaire", "Détartrage", "Extraction", "Orthodontie"],
  },
  {
    slug: "cardiologie",
    fr: "Cardiologue",
    wo: "Fajkatu xol",
    practitioner: "Cardiologue de la CLINIQUE Khadija",
    reasons: [
      "Colposcopiste",
      "Chirurgie générale",
      "Contrôle",
      "Radiologue",
      "Ophtalmologie (vontalmologie)",
      "Neurochirurgie",
      "Amygdalectomie VPA DEVIS",
      "Pneumologie"
    ],
  },
]

export const services = [
  { fr: "Hospitalisation", wo: "Faju ci opitaal" },
  { fr: "Imagerie médicale", wo: "Nataalu yaram" },
  { fr: "Laboratoire d'analyses", wo: "Laboratuwaar" },
  { fr: "Urgences", wo: "Yëngu-yëngu" },
]

export const clinic = {
  name: "CLINIQUE KHADIJA",
  type: "Clinique médicale",
  address: "Cité Inter-Promo, ZAC Mbao, Dakar",
  city: "Dakar",
  accessInfo: "Au pied du pont, près du commissariat de police de la ZAC Mbao",
  languages: ["Français", "Wolof"],
  payments: ["Espèces", "Chèque", "Mobile Money"],
}

// A curated subset of accepted insurances plus the full IPM list.
export const mainInsurances = [
  "ASSURANCE HENNER",
  "AFIYAH",
  "AGEMAC",
  "ASCOMA",
  "BANQUE ISLAMIQUE",
  "CMS (CREDIT MUTUELLE DE SANTE)",
  "CSS (CAISSE DE SECURITE SOCIALE)",
  "EFS",
  "EIFFAGE",
  "GES",
  "GGA ASSURANCE",
  "LA ROCHETTE",
  "MSH INTERNATIONAL",
  "MUTAS",
  "MADGID",
  "NESTLE",
  "SANLAM",
  "SEN INTERIM",
  "SENELEC",
  "SENTENAC",
  "SONATEL",
  "SURA",
  "TARA",
]

export const ipmInsurances = []

export const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00",
]
