# Gemini Flash 2.5 Chat Interface

A Next.js application that provides a sleek chat interface for interacting with Google's Gemini Flash 2.5 AI model.

## Features

- Real-time chat interface with Gemini Flash 2.5
- Conversation history and context preservation
- Markdown support for code blocks and formatting
- Clean, responsive UI built with Shadcn UI and Tailwind CSS

## Prerequisites

- Node.js (v18 or later)
- Google AI API key for Gemini

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with your Google API key:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/components/chat` - Chat interface components
- `/src/lib/gemini.ts` - Gemini API integration
- `/src/app/api/chat` - API route for chat functionality

## Customizing

- Modify the model parameters in `src/lib/gemini.ts` to adjust the AI's responses
- Customize the UI theme in Tailwind config
- Add additional chat features as needed

## License

MIT
