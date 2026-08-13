import photoHero from "@/assets/photo-hero.jpg";
import photoYouth from "@/assets/photo-youth.jpg";
import photoWomen from "@/assets/photo-women.jpg";
import photoEducation from "@/assets/photo-education.jpg";
import photoHealth from "@/assets/photo-health.jpg";
import photoCommunity from "@/assets/photo-community.jpg";
import photoOutreach from "@/assets/photo-outreach.jpg";
import photoGirlRise from "@/assets/photo-girlrise.jpg";

export const fallbackPrograms = [
  {
    title: "Youth Empowerment",
    description:
      "Equipping young people aged 15–35 with digital skills, leadership training, and mentorship to unlock their full potential.",
    activities: ["Digital skills training", "Leadership workshops", "Mentorship circles", "Entrepreneurship bootcamps"],
    impact: "2,000+ youths trained",
    image_url: photoYouth,
  },
  {
    title: "Women Empowerment",
    description:
      "Building economic independence for women through vocational training, financial literacy, and strong support networks.",
    activities: ["Vocational training", "Financial literacy", "Cooperative savings groups", "Business grants support"],
    impact: "1,500+ women empowered",
    image_url: photoWomen,
  },
  {
    title: "Education Support",
    description:
      "Scholarships, tutoring, and learning materials for children and young adults in underserved communities.",
    activities: ["Scholarship awards", "After-school tutoring", "School kits distribution", "Back-to-school drives"],
    impact: "800+ learners supported",
    image_url: photoEducation,
  },
  {
    title: "Health Awareness",
    description:
      "Community health campaigns, screenings, and wellness workshops that improve public health outcomes.",
    activities: ["Health screenings", "SRHR sensitization", "Menstrual hygiene outreach", "Wellness workshops"],
    impact: "5,000+ people reached",
    image_url: photoHealth,
  },
  {
    title: "Community Outreach",
    description:
      "Grassroots engagement, advocacy walks, and environmental action that mobilise communities around shared change.",
    activities: ["Awareness walks", "Tree planting", "Stakeholder engagement", "Policy advocacy"],
    impact: "30+ communities engaged",
    image_url: photoOutreach,
  },
];

export const fallbackGallery = [
  { image_url: photoCommunity, title: "Capacity building workshop", category: "Workshops" },
  { image_url: photoEducation, title: "Education support outreach", category: "Programs" },
  { image_url: photoOutreach, title: "World Environment Day walk", category: "Events" },
  { image_url: photoYouth, title: "Youth digital skills training", category: "Programs" },
  { image_url: photoWomen, title: "Women vocational training", category: "Workshops" },
  { image_url: photoHealth, title: "Project Girl Rise session", category: "Programs" },
  { image_url: photoGirlRise, title: "Project Girl Rise outreach", category: "Events" },
  { image_url: photoHero, title: "Stakeholder engagement meeting", category: "Events" },
];

export const fallbackNews = [
  {
    title: "Capacity Building Workshop by CSO-B",
    created_at: "2026-07-10T12:00:00Z",
    category: "Workshops",
    image_url: photoCommunity,
    excerpt:
      "PYWEI participated in a transformative 2-day Capacity Building Workshop to strengthen organizational capacity.",
  },
  {
    title: "World Environment Day 2026",
    created_at: "2026-06-05T12:00:00Z",
    category: "Environment",
    image_url: photoOutreach,
    excerpt:
      "PYWEI commemorated World Environment Day with a peaceful awareness walk and tree-planting exercise in Makurdi.",
  },
  {
    title: "Gender Equality Sensitization at NYSC Camp",
    created_at: "2026-06-18T12:00:00Z",
    category: "Youth",
    image_url: photoYouth,
    excerpt:
      "PYWEI engaged Corps Members at the NYSC Orientation Camp, Wannune, in a sensitization session on gender inequality.",
  },
  {
    title: "Validation of the WEE Policy Framework",
    created_at: "2026-07-22T12:00:00Z",
    category: "Policy",
    image_url: photoWomen,
    excerpt:
      "PYWEI joined the 5-Day Stakeholder Engagement and Validation Meeting for the domestication of the WEE Policy Framework.",
  },
];
