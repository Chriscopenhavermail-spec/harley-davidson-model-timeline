export type MotorcycleType =
  | "Cruiser"
  | "Touring"
  | "Sport"
  | "Adventure Touring"
  | "Trike"
  | "Factory Custom"
  | "Standard"
  | "Military"
  | "Racing"
  | "Electric"
  | "Other";

export type EngineFamily =
  | "Atmospheric Inlet Single"
  | "F-Head"
  | "Flathead"
  | "Knucklehead"
  | "Panhead"
  | "Shovelhead"
  | "Ironhead"
  | "Evolution"
  | "Twin Cam"
  | "Revolution"
  | "Milwaukee-Eight"
  | "Revolution Max"
  | "Electric"
  | "Other";

export type ModelFamily =
  | "Early Models"
  | "Big Twin"
  | "Sportster"
  | "Dyna"
  | "Softail"
  | "Touring"
  | "CVO"
  | "V-Rod"
  | "Street"
  | "Adventure Touring"
  | "Trike"
  | "Electric"
  | "Racing"
  | "Military"
  | "Other";

export type ModelChangePeriod = {
  id: string;
  startYear: number;
  endYear?: number | "present";
  title: string;
  engine?: string;
  engineFamily?: EngineFamily;
  displacement?: string;
  frame?: string;
  transmission?: string;
  suspension?: string;
  brakes?: string;
  notableChanges: string[];
  characteristics: string[];
  imageUrl?: string;
  notes?: string;
};

export type Spin360Asset = {
  available: boolean;
  frameCount?: number;
  frames?: string[];
  thumbnailUrl?: string;
  credit?: string;
  license?: string;
  sourceUrl?: string;
  notes?: string;
};

export type HarleyModel = {
  id: string;
  name: string;
  alternateNames?: string[];
  productionStartYear: number;
  productionEndYear?: number | "present";
  modelFamily: ModelFamily;
  motorcycleType: MotorcycleType;
  engineFamilies: EngineFamily[];
  primaryEngines: string[];
  overview: string;
  whyItMatters: string;
  keyCharacteristics: string[];
  characteristicDetails?: Record<string, string>;
  imageUrl?: string;
  imageCredit?: string;
  imageLicense?: string;
  imageSourceUrl?: string;
  spin360?: Spin360Asset;
  changeTimeline: ModelChangePeriod[];
  relatedModels?: string[];
  tags: string[];
  sources?: string[];
  confidence?: "high" | "medium" | "low";
  notes?: string;
};
