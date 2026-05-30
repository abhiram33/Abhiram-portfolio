import { Project, Skill, JourneyItem } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "rag-chatbot",
    title: "AI RAG Chatbot Core",
    subtitle: "Context-Grounded Document QA Engine",
    description: "An advanced Retrieval-Augmented Generation retrieval chain designed to read files, calculate secure embeddings, create hierarchical vector indexes, and ground query answers in private document sets without factual hallucination.",
    detailedExplanation: "Built entirely with LangChain and Python, this software solves the limitation of LLMs hallucinating on private or context-specific data. It incorporates multi-level recursive character chunk dividers, sentence-level vector calculations, and local FAISS vector search index alignments.",
    tags: ["LangChain", "Python", "FAISS", "Vector DB", "Embeddings"],
    category: "RAG",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    simulationType: "rag",
    githubUrl: "https://github.com/abhiram33/rag-chatbot-core"
  },
  {
    id: "resume-ats",
    title: "Resume ATS Analyzer v2",
    subtitle: "AI-Powered Talent Profiler & Auditor",
    description: "An NLP pipeline designed to audit student and professional resumes against structured Job Descriptions, evaluating skill matching ratios, extracting entities, and highlighting key semantic improvements.",
    detailedExplanation: "Uses SpaCy tokenization and rule-based entity extractors coupled with Gemini prompt alignment models to perform fine-grained match auditing. It rates compliance out of 100%, highlights structural gaps, and automatically suggests bullet-point enhancements to surpass Applicant Tracking Systems.",
    tags: ["NLP", "SpaCy", "Python", "Gemini API", "Streamlit"],
    category: "NLP & ML",
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800",
    simulationType: "ats",
    githubUrl: "https://github.com/abhiram33/resume-analyzer-v2"
  },
  {
    id: "web-scraping-platform",
    title: "AI Web Scraping & Data Intel",
    subtitle: "Automated Extraction & Semantic Intelligence",
    description: "An AI-powered web scraping and data intelligence platform for extracting, processing, and analyzing raw website content using BeautifulSoup and Selenium, integrated with Generative AI insights.",
    detailedExplanation: "Fuses headless Selenium routines with selective HTML parsing trees via BeautifulSoup. Extracted plain-text payloads are parsed through local Gemini LLM mapping prompts to produce clean, structured, and filterable database schemas. Interactive visualizations are generated dynamically via Plotly and Streamlit dashboards.",
    tags: ["BeautifulSoup", "Selenium", "Python", "Gemini API", "Pandas", "Plotly", "Streamlit"],
    category: "SCRAPING",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
    simulationType: "scraping",
    githubUrl: "https://github.com/abhiram33/ai-scraping-dashboard"
  },
  {
    id: "ai-voice-assistant",
    title: "Vocalis AI Voice Sentry",
    subtitle: "Real-time Speech Synthesis & Intent Classifier",
    description: "An advanced speech processing pipeline bridging speech-to-text recognition, structural semantic parsing, and dynamic real-time wave synthesis response loops.",
    detailedExplanation: "Configures real-time vocal ingestion filters with lightweight phonetic matching and localized semantic intent classifiers. It renders interactive audio telemetry graphs that map user frequencies onto active intent branches in real-time.",
    tags: ["Web Speech API", "Speech-to-Text", "TTS Synth", "NLP Parsers", "React Audio"],
    category: "NLP & ML",
    imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&q=80&w=800",
    simulationType: "voice",
    githubUrl: "https://github.com/abhiram33/vocalis-ai-voice"
  }
];

export const SKILLS: Skill[] = [
  {
    name: "Python Neural Stack",
    percentage: 95,
    category: "Languages",
    description: "Expert scripting, standard ML/NLP loops, multi-processing, backend APIs, data pipelines."
  },
  {
    name: "SQL & Relational DBs",
    percentage: 85,
    category: "Languages",
    description: "Complex table relations, query speed tuning, aggregation pipelines, vector dimensions."
  },
  {
    name: "JavaScript / TypeScript",
    percentage: 80,
    category: "Languages",
    description: "Building responsive React layers, asynchronous triggers, SSE streams, state nodes."
  },
  {
    name: "LangChain Orchestration",
    percentage: 92,
    category: "Orchestration",
    description: "Prompt templates, conversational loops, memory managers, self-corrective router keys."
  },
  {
    name: "Prompt Programming (CoT)",
    percentage: 96,
    category: "Orchestration",
    description: "Few-shot modeling, Chain-of-Thought (CoT), ReAct mechanisms, structured outputs JSON."
  },
  {
    name: "Streamlit UI Architecture",
    percentage: 90,
    category: "Orchestration",
    description: "Rapid analytical dashboards, session state persistence, interactive asset streams."
  },
  {
    name: "FAISS Vector Search",
    percentage: 88,
    category: "Retrieval",
    description: "Flat indexes, IVFFlat partitioning, similarity distance algorithms, partition tuning."
  },
  {
    name: "Semantic Retrieval & Chunking",
    percentage: 90,
    category: "Retrieval",
    description: "Parent-retriever logic, semantic dividers, recursive overlap thresholds."
  },
  {
    name: "Scikit-Learn ML Engines",
    percentage: 85,
    category: "ML & Analytical",
    description: "Feature synthesis, XGBoost pipelines, classification metrics, confusion matrices."
  },
  {
    name: "SpaCy & NLP Pipelines",
    percentage: 82,
    category: "ML & Analytical",
    description: "Named Entity Recognition (NER), custom token splitters, text similarity modeling."
  },
  {
    name: "Pandas & NumPy",
    percentage: 90,
    category: "ML & Analytical",
    description: "High-performance data manipulation, telemetry arrays, outlier standard deviations."
  },
  {
    name: "Git & Version Systems",
    percentage: 88,
    category: "Systems",
    description: "Branch policies, merge resolutions, action workflows, package deployments."
  },
  {
    name: "System APIs (Express/Flask)",
    percentage: 84,
    category: "Systems",
    description: "Stateless REST endpoints, cors locks, payload checks, server side API proxies."
  }
];

export const JOURNEY: JourneyItem[] = [
  {
    year: "2024 — Present",
    title: "Diploma in Data Science & AI",
    subtitle: "Edure Learning · Trivandrum",
    description: "Deep-diving into neural network configurations, advanced natural language processing mechanics, vector databases, multi-agent LLM systems, and high-performance classical machine learning pipelines.",
    badge: "ADVANCED_AI",
    type: "academic"
  },
  {
    year: "2020 — 2023",
    title: "B.Com in Computer Applications",
    subtitle: "University Institute of Technology · Kerala",
    description: "Fused foundational business intelligence with computational modeling, studying sql databases, software concepts, logic architectures, and business data analytics.",
    badge: "GRADUATE",
    type: "academic"
  },
  {
    year: "2018 — 2020",
    title: "Mechanic Auto Electronics (ITI)",
    subtitle: "Government ITI Chackai · Kerala",
    description: "Learned strict practical diagnostics, circuit logics, signal measurements, and hardware wiring controls. This hands-on background built strong troubleshooting methodologies that I represent in binary circuits and code logs.",
    badge: "FOUNDATIONAL_SYSTEMS",
    type: "vocational"
  }
];
