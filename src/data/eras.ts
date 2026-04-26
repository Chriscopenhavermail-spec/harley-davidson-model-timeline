export const eras = [
  {
    id: "early",
    name: "Early Harley-Davidson Models",
    startYear: 1903,
    endYear: 1929,
    description:
      "The company's earliest singles and V-twins established the foundation of Harley-Davidson motorcycle design.",
  },
  {
    id: "flathead",
    name: "Flathead and Utility Era",
    startYear: 1930,
    endYear: 1947,
    description:
      "Flathead engines powered many street, utility, military, and workhorse motorcycles.",
  },
  {
    id: "knucklehead",
    name: "Knucklehead Era",
    startYear: 1936,
    endYear: 1947,
    description:
      "The overhead-valve Knucklehead helped define the big twin Harley-Davidson identity.",
  },
  {
    id: "panhead",
    name: "Panhead Era",
    startYear: 1948,
    endYear: 1965,
    description:
      "The Panhead era brought hydraulic lifters, changing frames, and classic touring style.",
  },
  {
    id: "shovelhead",
    name: "Shovelhead Era",
    startYear: 1966,
    endYear: 1984,
    description:
      "The Shovelhead period included major styling changes, the FX line, and the rise of factory customs.",
  },
  {
    id: "evolution",
    name: "Evolution Era",
    startYear: 1984,
    endYear: 1999,
    description:
      "The Evolution engine restored Harley-Davidson's reputation for reliability and powered a major brand revival.",
  },
  {
    id: "twin-cam",
    name: "Twin Cam Era",
    startYear: 1999,
    endYear: 2017,
    description:
      "The Twin Cam era expanded Harley's cruiser, touring, Softail, and Dyna identities.",
  },
  {
    id: "milwaukee-eight",
    name: "Milwaukee-Eight Era",
    startYear: 2017,
    endYear: "present",
    description:
      "The Milwaukee-Eight brought four-valve heads, more power, smoother operation, and a modernized big twin lineup.",
  },
  {
    id: "revolution-max",
    name: "Revolution Max Era",
    startYear: 2021,
    endYear: "present",
    description:
      "The Revolution Max platform expanded Harley-Davidson into modern adventure touring and performance-focused models.",
  },
  {
    id: "electric",
    name: "Electric Era",
    startYear: 2019,
    endYear: "present",
    description:
      "Harley-Davidson entered electric motorcycles with LiveWire and later spun the electric line into its own brand identity.",
  },
] as const;

export type Era = (typeof eras)[number];
