import imageManifest from "@/content/portfolio-images.json";

export type PortfolioImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type PortfolioRoom = {
  id: string;
  name: string;
  layout: string;
  images: PortfolioImage[];
};

export type PortfolioProject = {
  slug: string;
  name: string;
  category: "Residential" | "Commercial" | "Collection";
  descriptor: string;
  roomLabel: string;
  coverImage: string;
  coverAlt: string;
  coverWidth: number;
  coverHeight: number;
  gallery: PortfolioImage[];
  rooms: PortfolioRoom[];
};

const manifest = imageManifest as {
  portrait: PortfolioImage;
  projectCovers: Record<string, PortfolioImage>;
  projects: Record<string, PortfolioRoom[]>;
  otherRenders: PortfolioImage[];
  nailSalon: PortfolioImage[];
};

function makeProject(
  slug: string,
  name: string,
  descriptor: string,
  roomLabel: string,
  coverName: string,
  roomsKey: string,
): PortfolioProject {
  const cover = manifest.projectCovers[coverName];
  const rooms = manifest.projects[roomsKey];
  return {
    slug,
    name,
    descriptor,
    category: "Residential",
    roomLabel,
    coverImage: cover.src,
    coverAlt: `${name} — ${roomLabel}`,
    coverWidth: cover.width,
    coverHeight: cover.height,
    gallery: rooms.flatMap((room) => room.images),
    rooms,
  };
}

export const projects: PortfolioProject[] = [
  makeProject("sumadhura", "Sumadhura by Folium", "3BHK · 7 spaces · Bengaluru", "Living, Foyer & Dining", "Sumadhura by Folium", "sumadhura"),
  makeProject("oceanus", "Oceanus Freesia Enclave", "2BHK · 5 spaces · Bengaluru", "Living room", "Oceanus Freesia Enclave", "oceanus"),
  makeProject("dsjaks", "DS & Jaks Needs", "Residential project · 6 spaces · Bengaluru", "Foyer & Living", "DS & Jaks Needs", "dsjaks"),
  makeProject("dnr", "DNR Arista", "3BHK · 6 spaces · Bengaluru", "Living & Pooja", "DNR Arista", "dnr"),
];

export const featuredProjects = projects;
export const portrait = manifest.portrait;
export const otherRenders = manifest.otherRenders;
export const nailSalonGallery = manifest.nailSalon;
export const otherRendersCover = manifest.projectCovers["Other Renders"];
export const nailSalonCover = manifest.projectCovers["Nail Salon"];

export const areasOfExpertise = [
  {
    title: "Client Experience",
    description: "Converting briefs into signed projects, and handling escalations under pressure.",
  },
  {
    title: "Design Development",
    description: "Managing the full design lifecycle — plans, elevations, false-ceiling layouts and 3D renders.",
  },
  {
    title: "Execution Coordination",
    description: "Joinery and finish specifications with dimensions, materials and laminate details.",
  },
] as const;

export const studioProfile = {
  name: "Ambika G",
  role: "Residential Interior Designer",
  location: "Bengaluru",
  introduction:
    "Results-driven Interior Design professional with 2 years of end-to-end client experience — converting briefs into signed projects, managing full design lifecycles, and handling escalations under pressure. Proficient in AutoCAD, Cohoom, SketchUp, and Enscape.",
  software: ["AutoCAD", "SketchUp", "Enscape", "Cohoom"],
  focus: "Client experience · Design development · Execution coordination",
};

export const heroDisclaimer =
  "This illustrative image is for reference purposes only and may not be an accurate representation of products used. Please refer to drawings for specific sizes and dimensions, and samples for colours and finishes.";
