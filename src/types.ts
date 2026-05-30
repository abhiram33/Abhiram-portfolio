export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedExplanation: string;
  tags: string[];
  category: "RAG" | "NLP & ML" | "ANALYTICS" | "SCRAPING";
  imageUrl: string;
  githubUrl?: string;
  simulationType: "rag" | "ats" | "scraping" | "voice";
}

export interface Skill {
  name: string;
  percentage: number;
  category: "Languages" | "Orchestration" | "Retrieval" | "ML & Analytical" | "Systems";
  description: string;
}

export interface Message {
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface JourneyItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  type: "academic" | "vocational" | "foundational";
}
