export type CropName =
  | "COFFEE"
  | "SESAME"
  | "SOYA"
  | "BEAN"
  | "COCOA"
  | "CHICK PEA"
  | "PIGEON PEA"
  | "CASHEW"
  | "COTTON"
  | "SUNFLOWER"
  | "GROUNDNUT"
  | "GEMSTONE"
  | "GREEN GRAM";

export const AVAILABLE_LOCATIONS: string[] = [
  "SINGIDA", "MBEYA", "MANYARA", "RUVUMA", "MTWARA", "DODOMA", "LINDI", "MOROGORO", "PWANI",
  "ARUSHA", "DAR ES SALAAM", "GEITA", "IRINGA", "KAGERA", "KATAVI", "KIGOMA", "KILIMANJARO", "MARA",
  "MWANZA", "NJOMBE", "PEMBA", "RUKWA", "SHINYANGA", "SIMIYU", "SONGWE", "TABORA", "TANGA", "ZANZIBAR",
];

export const CROPS: CropName[] = [
  "COFFEE", "SESAME", "SOYA", "BEAN", "COCOA", "CHICK PEA", "PIGEON PEA",
  "CASHEW", "COTTON", "SUNFLOWER", "GROUNDNUT", "GEMSTONE", "GREEN GRAM"
];

export const CROP_TRANSLATIONS_SW: Record<CropName, string> = {
  COFFEE: "KAHAWA", SESAME: "UFUTA", SOYA: "SOYA", BEAN: "MAHARAGE", COCOA: "KAKAO",
  "CHICK PEA": "DENGU", "PIGEON PEA": "MBAAZI", CASHEW: "KOROSHO", COTTON: "PAMBA",
  SUNFLOWER: "ALIZETI", GROUNDNUT: "KARANGA", GEMSTONE: "MADINI", "GREEN GRAM": "CHOROKO",
};

export const CROP_NAMES_EN: Record<CropName, string> = {
    COFFEE: "Coffee", SESAME: "Sesame", SOYA: "Soya", BEAN: "Beans", COCOA: "Cocoa",
    "CHICK PEA": "Chick Peas", "PIGEON PEA": "Pigeon Peas", CASHEW: "Cashews", COTTON: "Cotton",
    SUNFLOWER: "Sunflower", GROUNDNUT: "Groundnuts", GEMSTONE: "Gemstones", "GREEN GRAM": "Green Grams",
};


// Map crops to their respective organizations
export const ORGANIZATION_MAP: Record<CropName, string[]> = {
  COFFEE: ["TCB", "TCDC", "WRRB"],
  CASHEW: ["CBT", "TCDC", "WRRB"],
  GEMSTONE: ["MC"],
  SESAME: ["COPRA", "TCDC", "WRRB"],
  SOYA: ["COPRA", "TCDC", "WRRB"],
  BEAN: ["COPRA", "TCDC", "WRRB"],
  COCOA: ["COPRA", "TCDC", "WRRB"],
  "CHICK PEA": ["COPRA", "TCDC", "WRRB"],
  "PIGEON PEA": ["COPRA", "TCDC", "WRRB"],
  COTTON: ["COPRA", "TCDC", "WRRB"],
  SUNFLOWER: ["COPRA", "TCDC", "WRRB"],
  GROUNDNUT: ["COPRA", "TCDC", "WRRB"],
  "GREEN GRAM": ["COPRA", "TCDC", "WRRB"],
};

export const LOGO_URL_MAP: Record<string, string> = {
    "TMX": "./components/tmxlogo2.png", // TMX PLC
    "WRRB": "./components/WRRB.png", // WRRB
    "COPRA": "./components/copra.png", // COPRA
    "TCDC": "./components/tcdc.png", // TCDC
    "TCB": "./components/tcb.png", // Tanzania Coffee Board (placeholder)
    "CBT": "./components/cbt.png", // Cashew Board of Tanzania (placeholder)
    "MC": "./mc", // Mining commision (placeholder)
};