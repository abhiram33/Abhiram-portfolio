import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize GoogleGenAI SDK safely
// We lazy-load or guard against missing API key so the dev server starts reliably
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } else {
    console.warn("Warning: GEMINI_API_KEY environment variable is not defined.");
  }
} catch (err) {
  console.error("Error initializing GoogleGenAI:", err);
}

app.use(express.json());

// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", geminiEnabled: !!ai });
});

// Chat endpoint powered by Gemini (gemini-3.5-flash which is free & low latency)
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array provided." });
    }

    if (!ai) {
      return res.status(503).json({
        error: "Gemini API service is currently unavailable. Please ensure your GEMINI_API_KEY is configured in Settings > Secrets.",
      });
    }

    const SYSTEM_INSTRUCTION = `You are "Abhiram's AI Recruiter Assistant", an interactive, highly tailored AI clone and professional representative of Abhiram A, designed to help recruiters, hiring managers, and prospective collaborators learn about Abhiram's skills, qualifications, projects, and potential fit for Generative AI and Machine Learning roles.

Abhiram A is a passionate Generative AI Engineer Intern with deep expertise in:
- Retrieval-Augmented Generation (RAG): Advanced document chunking strategies, dense vector embeddings (Gemini/OpenAI, HuggingFace transformers), and high-performance vector indexes (FAISS local index tuning, Pinecone, PGVector).
- Large Language Model (LLM) Orchestration: Dynamic multi-agent pipelines, prompt chain routing, and conversational AI built with LangChain, LangGraph, and custom Streamlit interfaces.
- Advanced Prompt Engineering: Few-shot context guidance, Chain-of-Thought (CoT), self-consistency frameworks, and DSPy prompt-programming.
- Natural Language Processing & Classical Machine Learning: Structured anomaly/fraud models inside Scikit-Learn, tokenization and named entity recognition using SpaCy, and complex analytical data work with Pandas & NumPy.
- Modern Software Stack: Python, TypeScript, React, Tailwind CSS, SQL, Git, and full-stack API architectures (Express, Flask).

Work Experience & Project Archive:
1. AI RAG Chatbot: Developed a robust, local semantic query and document ingestion engine. It parses complex file structures, uses sentence-transformers to calculate multi-level vector embeddings, stores them in high-density local FAISS indexes, and performs contextual similarity search. This grounds the LLM in domain-specific documents to eliminate factual hallucinations.
2. Resume ATS Analyzer v2: Programmed an elegant alignment tool using SpaCy and generative models that parses job descriptions against resumes. It scores match accuracy (0-100%), performs named entity alignment, and provides custom recommendations for missing search keywords.
3. Neural Sentry (Anomaly Classifier): Drafted a financial transaction flow classifier using classical tabular ML models (Scikit-Learn, Random Forests, XGBoost). It classifies stream telemetry data and marks outliers.

Academic & Career Credentials:
- Diploma in Data Science & AI (2024 - Present): Edure Learning, Trivandrum. Focusing on Deep Learning, NLP, vector search configurations, and RAG architectures.
- Bachelor of Commerce (B.Com) in Computer Applications: University Institute of Technology, Kerala.
- ITI - Mechanic Auto Electronics: Government ITI Chackai, Kerala.

Contact Details & Nodes:
- Email: abhiramkichuz@gmail.com
- GitHub: https://github.com/abhiram33
- LinkedIn: https://linkedin.com/in/abhiram
- Location: Kerala, India (UTC +5:30)

Tone of Voice & Communication Protocol:
- Be welcoming, professional, highly technical, and confident.
- Express strong excitement about Abhiram's readiness to tackle complex AI/ML problems, scale RAG production architectures, and deploy complete full-stack AI interfaces.
- Keep responses informative yet highly scannable — use bullet points, bold text for technical terms, and occasional brief code snippets (e.g. showing a small LangChain chain, a Python FAISS search snippet, or a clean prompt template) when highly relevant!
- Steer conversation gracefully back to Abhiram's skills, education, projects, or hireability if the prompt is entirely off-topic. Encourage them to email abhiramkichuz@gmail.com or link with him on LinkedIn!`;

    // Map incoming messages to Gemini Content type
    // Expected incoming message: { role: 'user' | 'model', text: string }
    const contents = messages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.text }],
    }));

    // Call Gemini API using generateContent with gemini-3.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I was unable to formulate a response. Please try again.";
    return res.json({ text: replyText });
  } catch (error: any) {
    console.error("Error in /api/chat handler:", error);
    return res.status(500).json({
      error: "Internal Server Error occurred while communicating with Gemini.",
      details: error.message,
    });
  }
});

// Configure Vite or Static asset serving
async function bootstrapServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static build serving active.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

bootstrapServer().catch((err) => {
  console.error("Critical failure bootstrapping server:", err);
});
