# AI Study Assistant

A full-stack AI-powered study assistant built with React, Express, and Node.js.

This project allows users to paste study content and generate structured study notes including a summary, key points, quiz questions, and study advice.

The project currently uses a mock AI response because API quota is not yet available, but the backend is already structured to safely connect to the OpenAI API later.

## Features

- Paste study content
- Generate structured study notes
- Display a summary
- Display key points
- Display quiz questions
- Display study advice
- Loading state
- Error handling
- Full-stack architecture
- Backend API route
- Environment variable protection for API keys
- Mock AI response for development

## Technologies Used

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express
- CORS
- dotenv

### AI Integration

- OpenAI API-ready backend structure
- Mock AI response for development

### Tools

- Git
- GitHub
- REST API
- Environment variables

## Project Structure

```text
ai-study-assistant/
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── index.js
│   ├── package.json
│   └── .env
├── .gitignore
└── README.md

How It Works

The application follows this architecture:

React frontend → Express backend → AI/mock AI response

The React frontend sends study content to the Express backend.

The backend receives the content through this route:

POST /api/study-notes

The backend then returns structured study notes in JSON format.

API Response Format

Example response:

{
  "result": {
    "summary": "The study content discusses...",
    "keyPoints": [
      "Identify the main idea.",
      "Break the content into smaller sections."
    ],
    "quizQuestions": [
      "What is the main topic?",
      "Can you explain it in your own words?"
    ],
    "studyAdvice": "Review the content and test yourself."
  }
}
Environment Variables

The backend uses an .env file for secret keys.

Create this file inside the server folder:

OPENAI_API_KEY=your_api_key_here
PORT=5000

Do not commit .env to GitHub.

Installation and Setup

Clone the repository:

git clone https://github.com/Attakorah/ai-study-assistant.git

Go into the project folder:

cd ai-study-assistant
Backend Setup

Go into the server folder:

cd server

Install backend dependencies:

npm install

Create a .env file:

OPENAI_API_KEY=your_api_key_here
PORT=5000

Run the backend server:

npm run dev

The backend will run on:

http://localhost:5000
Frontend Setup

Open another terminal and go into the client folder:

cd ai-study-assistant/client

Install frontend dependencies:

npm install

Run the frontend:

npm run dev

The frontend will run on the local URL shown in the terminal, usually:

http://localhost:5173/
Current Status

The project currently uses a mock AI response for development because API quota is not yet active.

When API billing is available, the backend can be switched back to the real OpenAI API call.

Learning Goals

This project helped me practice:

Full-stack project structure
React frontend development
Express backend development
API routes
Sending data from frontend to backend
Handling loading and error states
Returning structured JSON responses
Protecting API keys with environment variables
Preparing for real AI API integration
Future Improvements
Connect to the real OpenAI API
Add PDF upload support
Add chat with notes
Save study sessions
Add user authentication
Add downloadable study notes
Add flashcard generation
Add quiz scoring
Author

Attakorah Emmanuel

Computer Science student at the University of Energy and Natural Resources.

Goal: To become a Full-Stack AI Developer building AI-powered web and mobile applications.

Status

In Progress 🚧
