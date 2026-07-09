import { useState } from "react";
import "./App.css";

function App() {
    const [content, setContent] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
                    <label htmlFor="study-content">Study Content</label>

                    <textarea
                        id="study-content"
                        placeholder="Paste your notes, textbook section, or lecture content here..."
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Generating..." : "Generate Study Notes"}
                    </button>
                </form>
            </section>

            {error && <p className="error-message">{error}</p>}

            {result && (
              <section className="result-card">
                <h2>Generated Study Notes</h2>

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