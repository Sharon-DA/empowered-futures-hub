// localStorage-based data store — will be replaced with backend later

export interface NewsPost {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  activities: string[];
  impact: string;
  image: string;
}

const defaultNews: NewsPost[] = [
  { id: "1", title: "2024 Annual Youth Summit Recap", date: "March 15, 2024", category: "Events", image: "", excerpt: "Over 500 young leaders gathered for our biggest summit yet, featuring workshops on digital skills, entrepreneurship, and leadership development." },
  { id: "2", title: "Women's Skill Workshop Graduation", date: "February 28, 2024", category: "Achievements", image: "", excerpt: "30 women graduated from our 6-month vocational training program. Graduates received starter kits and business mentorship." },
  { id: "3", title: "Community Health Drive Success", date: "January 20, 2024", category: "Events", image: "", excerpt: "Our latest health awareness campaign reached over 1,000 community members with free screenings and wellness education." },
];

const defaultGallery: GalleryItem[] = [
  { id: "1", src: "", alt: "Youth summit event", category: "Events" },
  { id: "2", src: "", alt: "Youth digital skills training", category: "Programs" },
  { id: "3", src: "", alt: "Women vocational training", category: "Workshops" },
];

const defaultPrograms: Program[] = [
  { id: "1", title: "Youth Empowerment", description: "Equipping young people with digital skills, leadership training, and mentorship.", activities: ["Digital skills training", "Leadership workshops", "Entrepreneurship mentorship", "Career guidance"], impact: "2,000+ youths trained", image: "" },
  { id: "2", title: "Women Empowerment", description: "Providing vocational training, financial literacy, and support networks for women.", activities: ["Tailoring & catering training", "Financial literacy", "Business plan development", "Mentorship"], impact: "1,500+ women empowered", image: "" },
  { id: "3", title: "Education Support", description: "Scholarships, tutoring, and learning materials for underserved communities.", activities: ["Scholarships", "Free tutoring", "School supplies", "After-school programs"], impact: "1,000+ students supported", image: "" },
  { id: "4", title: "Health Awareness", description: "Community health campaigns, screenings, and wellness workshops.", activities: ["Free health screenings", "Mental health workshops", "HIV/AIDS education", "Maternal health programs"], impact: "5,000+ people reached", image: "" },
  { id: "5", title: "Community Outreach", description: "Engaging directly with communities for targeted interventions.", activities: ["Town halls", "Clean-up campaigns", "Food & clothing drives", "Local partnerships"], impact: "20+ communities served", image: "" },
];

function getStore<T>(key: string, defaults: T[]): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaults;
  } catch {
    return defaults;
  }
}

function setStore<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

export const store = {
  getNews: () => getStore<NewsPost>("admin_news", defaultNews),
  setNews: (data: NewsPost[]) => setStore("admin_news", data),

  getGallery: () => getStore<GalleryItem>("admin_gallery", defaultGallery),
  setGallery: (data: GalleryItem[]) => setStore("admin_gallery", data),

  getPrograms: () => getStore<Program>("admin_programs", defaultPrograms),
  setPrograms: (data: Program[]) => setStore("admin_programs", data),
};
