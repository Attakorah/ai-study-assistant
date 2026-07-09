import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("AI Study Assistant API is running.");
});

app.post("/api/study-notes", async (req, res) => {
    const { content } = req.body;

    if (!content || content.trim() === "") {
        return res.status(400).json({
            error: "Study content is required."
        });
    }

    const preview = content.trim().slice(0, 180);

    const mockResult = {
        summary: `The study content discusses: "${preview}${content.length > 180 ? "..." : ""}"`,
        keyPoints: [
            "Identify the main idea from the study content.",
            "Break the content into smaller sections.",
            "Review important terms and definitions.",
            "Connect the topic to real-world examples.",
            "Test yourself after studying."
        ],
        quizQuestions: [
            "What is the main topic of the study content?",
            "What are the most important facts mentioned?",
            "Can you explain the topic in your own words?",
            "What example can help explain this concept?",
            "Why is this topic useful or important?"
        ],
        studyAdvice: "Read the content carefully, summarize it without looking, answer the quiz questions, and revise any part you cannot explain clearly."
    };

    res.json({
        result: mockResult
    });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});