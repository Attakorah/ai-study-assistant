import { useState } from "react";
import "./App.css";

const sampleContent = `Photosynthesis is the process by which green plants, algae, and some bacteria use sunlight to make food. During photosynthesis, plants take in carbon dioxide from the air and water from the soil. Using energy from sunlight, they convert these substances into glucose and oxygen. Glucose provides energy for the plant, while oxygen is released into the atmosphere. Photosynthesis mainly occurs in the chloroplasts of plant cells, which contain a green pigment called chlorophyll.`;

function App() {
    const [content, setContent] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copyMessage, setCopyMessage] = useState("");

    const wordCount = content
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

    function useSampleText() {
        setContent(sampleContent);
        setError("");
        setResult(null);
    }

    function clearContent() {
        setContent("");
        setResult(null);
        setError("");
        setCopyMessage("");
    }

    async function copyNotes() {
      if (!result) {
        return;
      }

      const notesText = `
AI Study Notes

Summary:
${result.summary}

Key Points:
${result.keyPoints.map((point, index) => `${index + 1}. ${point}`).join("\n")}

Quiz Questions:
${result.quizQuestions.map((question, index) => `${index + 1}. ${question}`).join("\n")}

Study Advice:
${result.studyAdvice}
    `.trim();

      try {
        await navigator.clipboard.writeText(notesText);
        setCopyMessage("Notes copied to clipboard.");

        setTimeout(() => {
            setCopyMessage("");
        }, 2500);
      } catch {
        setCopyMessage("Unable to copy notes.");
      }
    }

    async function generateStudyNotes(event) {
        event.preventDefault();

        if (content.trim() === "") {
            setError("Please enter some study content.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setResult(null);
            setCopyMessage("");

            const response = await fetch("http://localhost:5000/api/study-notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Something went wrong.");
                return;
            }

            setResult(data.result);
        } catch {
            setError("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="app">
            <section className="hero">
                <p className="eyebrow">Full-Stack AI Project</p>
                <h1>AI Study Assistant</h1>
                <p className="subtitle">
                    Paste your study content and generate summaries, key points,
                    quiz questions, and study advice.
                </p>
            </section>

            <section className="card">
                <form onSubmit={generateStudyNotes}>
                    <div className="form-header">
                        <label htmlFor="study-content">Study Content</label>
                        <span>{wordCount} words</span>
                    </div>

                    <textarea
                        id="study-content"
                        placeholder="Paste your notes, textbook section, or lecture content here..."
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />

                    <div className="actions">
                        <button type="submit" disabled={loading}>
                            {loading ? "Generating..." : "Generate Study Notes"}
                        </button>

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={useSampleText}
                            disabled={loading}
                        >
                            Use Sample Text
                        </button>

                        <button
                            type="button"
                            className="ghost-btn"
                            onClick={clearContent}
                            disabled={loading}
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </section>

            {error && <p className="error-message">{error}</p>}

            {result && (
                <section className="result-card">
                    <h2>Generated Study Notes</h2>
                    <div className="result-actions">
                      <button type="button" onClick={copyNotes}>
                        Copy Notes
                      </button>
                    </div>

                    {copyMessage && <p className="copy-message">{copyMessage}</p>}

                    <div className="result-section">
                        <h3>Summary</h3>
                        <p>{result.summary}</p>
                    </div>

                    <div className="result-section">
                        <h3>Key Points</h3>
                        <ul>
                            {result.keyPoints.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="result-section">
                        <h3>Quiz Questions</h3>
                        <ol>
                            {result.quizQuestions.map((question, index) => (
                                <li key={index}>{question}</li>
                            ))}
                        </ol>
                    </div>

                    <div className="result-section">
                        <h3>Study Advice</h3>
                        <p>{result.studyAdvice}</p>
                    </div>
                </section>
            )}
        </main>
    );
}

export default App;